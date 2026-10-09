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
      strokeWidth="1"
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
    <svg className="rangoli" viewBox="-100 -100 200 200" aria-hidden="true">
      <g className="rg-a">{dots(36, 94, 3, '#ffffff')}{petals(18, -78, 7, 17, '#e91e63')}</g>
      <g className="rg-b">{petals(18, -60, 9, 15, '#ffd54f', 10)}{dots(18, 46, 2.6, '#ffffff')}</g>
      <g className="rg-c">{petals(12, -42, 10, 19, '#ffffff')}{petals(12, -28, 7, 13, '#ff8f00', 15)}</g>
      <g>
        {petals(8, -15, 6, 11, '#00bfa5')}
        <circle r="8" fill="#ffd54f" stroke="#e91e63" strokeWidth="2" />
      </g>
    </svg>
  )
}

export default function Festival() {
  const { pick } = useLang()
  if (!festival.enabled) return null

  return (
    <section className="festival" aria-label={pick(festival.title)}>
      <div className="sparkles" aria-hidden="true">
        <i /><i /><i /><i />
      </div>
      <div className="container festival-inner">
        <Rangoli />
        <div className="festival-text">
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
      </div>
    </section>
  )
}
