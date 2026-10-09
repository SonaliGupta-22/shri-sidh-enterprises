import { useEffect, useRef } from 'react'
import { business, festival } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

const COLORS = ['#ffd166', '#ff9f1c', '#ff4d6d', '#ffe8a3', '#8ee3a5', '#9bb7ff']

// Draws gold, orange and pink fireworks. Trails come from slowly erasing the previous frame.
function useFireworks(canvasRef) {
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return undefined
    const ctx = cv.getContext('2d')
    const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    let W = 0
    let H = 0
    let parts = []
    let timer = 0
    let running = false
    let raf = 0

    const size = () => {
      const r = cv.getBoundingClientRect()
      const d = window.devicePixelRatio || 1
      W = r.width
      H = r.height
      cv.width = W * d
      cv.height = H * d
      ctx.setTransform(d, 0, 0, d, 0, 0)
    }

    const burst = () => {
      const x = W * (0.1 + Math.random() * 0.8)
      const y = H * (0.15 + Math.random() * 0.45)
      const c = COLORS[Math.floor(Math.random() * COLORS.length)]
      const n = 46 + Math.floor(Math.random() * 24)
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2
        const s = 1 + Math.random() * 3.4
        parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 55 + Math.random() * 35, age: 0, c })
      }
    }

    const frame = () => {
      if (!running) return
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0,0,0,0.16)'
      ctx.fillRect(0, 0, W, H)
      ctx.globalCompositeOperation = 'lighter'
      if (--timer <= 0) {
        burst()
        timer = 38 + Math.floor(Math.random() * 40)
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.vx *= 0.985
        p.vy = p.vy * 0.985 + 0.035
        p.x += p.vx
        p.y += p.vy
        p.age++
        const k = 1 - p.age / p.life
        if (k <= 0) {
          parts.splice(i, 1)
          continue
        }
        ctx.globalAlpha = k
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.8 * k + 0.6, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(frame)
    }

    const setRun = (on) => {
      if (on && !running && !still) {
        running = true
        raf = requestAnimationFrame(frame)
      } else if (!on) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    size()
    window.addEventListener('resize', size)

    if (still) {
      // Reduced motion: one static burst, no animation.
      burst()
      ctx.globalCompositeOperation = 'lighter'
      parts.forEach((p) => {
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x + p.vx * 20, p.y + p.vy * 20, 1.6, 0, Math.PI * 2)
        ctx.fill()
      })
    }

    // Only animate while the banner is on screen.
    let io
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((e) => setRun(e[0].isIntersecting))
      io.observe(cv)
    } else {
      setRun(true)
    }

    return () => {
      setRun(false)
      window.removeEventListener('resize', size)
      io?.disconnect()
    }
  }, [canvasRef])
}

export default function Festival() {
  const { pick } = useLang()
  const canvasRef = useRef(null)
  useFireworks(canvasRef)
  if (!festival.enabled) return null

  return (
    <section className="festival" aria-label={pick(festival.title)}>
      <canvas ref={canvasRef} className="festival-canvas" aria-hidden="true" />
      <div className="container festival-inner">
        <h2>{pick(festival.title)}</h2>
        <p>{pick(festival.text)}</p>
        <div className="festival-actions">
          <a className="btn btn-gold" href="#products">{pick(festival.ctaShop)}</a>
          <a
            className="btn btn-ghost"
            target="_blank"
            rel="noreferrer"
            href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(festival.waMsg))}`}
          >
            {pick(festival.ctaChat)}
          </a>
        </div>
      </div>
    </section>
  )
}
