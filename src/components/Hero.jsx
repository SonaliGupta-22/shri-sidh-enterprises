import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Hero() {
  const { pick, ui } = useLang()
  const h = ui.hero
  return (
    <section className="hero" id="top">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="badge">{pick(h.badge)}</span>
          <h1>{pick(business.tagline)}</h1>
          <p>{pick(h.text)}</p>
          <div className="hero-actions">
            <a href="#products" className="btn">{pick(h.browse)}</a>
            <a href="#contact" className="btn btn-outline">{pick(h.quote)}</a>
          </div>
          <ul className="hero-stats">
            {h.highlights.map((s) => (
              <li key={s.title.en}><strong>{pick(s.title)}</strong><span>{pick(s.sub)}</span></li>
            ))}
          </ul>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="circle">
            <span className="float f1">🍲</span>
            <span className="float f2">🍽️</span>
            <span className="float f3">🥘</span>
            <span className="float f4">🪔</span>
          </div>
        </div>
      </div>
    </section>
  )
}
