import { business, festival } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Festival() {
  const { pick } = useLang()
  if (!festival.enabled) return null

  return (
    <section className="festival" aria-label={pick(festival.title)}>
      <div className="festival-lights" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => <span key={i}>🪔</span>)}
      </div>
      <div className="sparkles" aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => <i key={i} />)}
      </div>
      <div className="container festival-inner">
        <div className="festival-diya" aria-hidden="true">
          <span className="flame">🔥</span>
          <span className="lamp">🪔</span>
        </div>
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
