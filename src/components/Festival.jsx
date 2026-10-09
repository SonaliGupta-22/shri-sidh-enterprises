import { business, festival } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

// Rangoli mandala built from rings of petals around a centre.
const petals = (n, cy, rx, ry, fill, offset = 0) =>
  Array.from({ length: n }, (_, i) => (
    <ellipse
      key={i}
      cx="0"
      cy={cy}
      rx={rx}
      ry={ry}
      fill={fill}
      stroke="#fff"
      strokeWidth="1.2"
      transform={`rotate(${(i * 360) / n + offset})`}
    />
  ))

const dots = (n, r, size, fill) =>
  Array.from({ length: n }, (_, i) => {
    const a = (i * 2 * Math.PI) / n
    return <circle key={i} cx={(Math.sin(a) * r).toFixed(2)} cy={(-Math.cos(a) * r).toFixed(2)} r={size} fill={fill} />
  })

function Rangoli() {
  return (
    <svg className="strip-rangoli" viewBox="-100 -100 200 200" aria-hidden="true">
      {dots(36, 94, 3.5, '#ffffff')}
      {petals(18, -78, 7, 17, '#e91e63')}
      {petals(18, -60, 9, 15, '#ffd54f', 10)}
      {dots(18, 46, 2.8, '#ffffff')}
      {petals(12, -42, 10, 19, '#ffffff')}
      {petals(12, -28, 7, 13, '#ff8f00', 15)}
      {petals(8, -15, 6, 11, '#00bfa5')}
      <circle r="8" fill="#ffd54f" stroke="#e91e63" strokeWidth="2" />
    </svg>
  )
}

// Slim festival strip: the greeting first, then the scrolling messages, with a WhatsApp button.
export default function Festival() {
  const { pick } = useLang()
  if (!festival.enabled) return null

  const messages = festival.ticker.map((m) => <span key={m.en}>{pick(m)}</span>)

  return (
    <section className="strip" aria-label={pick(festival.title)}>
      <div className="strip-sparks" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <i key={i} style={{ '--x': `${6 + i * 8}%`, '--d': `${((i * 0.37) % 3.2).toFixed(2)}s` }} />
        ))}
      </div>
      <Rangoli />
      <strong className="strip-title">{pick(festival.title)}</strong>
      <div className="strip-ticker">
        <div className="strip-track">
          {messages}
          {/* second copy so the scroll loops without a gap */}
          {messages}
        </div>
      </div>
      <a
        className="strip-go"
        target="_blank"
        rel="noreferrer"
        href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(festival.waMsg))}`}
      >
        {pick(festival.ctaShort)}
      </a>
    </section>
  )
}
