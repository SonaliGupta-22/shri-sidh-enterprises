import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' }

const icons = {
  Peetal: (
    <svg viewBox="0 0 48 48" {...stroke}>
      <circle cx="24" cy="11" r="1.8" />
      <path d="M10 20C10 13 38 13 38 20Z" />
      <path d="M11 20H37L34 36C33.5 40 28 42 24 42S14.5 40 14 36Z" />
      <path d="M11 25H6V30H12M37 25H42V30H36" />
    </svg>
  ),
  Steel: (
    <svg viewBox="0 0 48 48" {...stroke}>
      <path d="M16 8V4H32V8" />
      <rect x="11" y="8" width="26" height="9" rx="3" />
      <rect x="11" y="19" width="26" height="9" rx="3" />
      <rect x="11" y="30" width="26" height="9" rx="3" />
    </svg>
  ),
  Gifts: (
    <svg viewBox="0 0 48 48" {...stroke}>
      <rect x="8" y="21" width="32" height="19" rx="2" />
      <rect x="6" y="14" width="36" height="8" rx="2" />
      <path d="M24 14V40" />
      <path d="M24 14C18 5 11 9 16 14M24 14C30 5 37 9 32 14" />
    </svg>
  ),
  Electronics: (
    <svg viewBox="0 0 48 48" {...stroke}>
      <path d="M16 28L18 8H30L32 28" />
      <path d="M16 8H32" />
      <rect x="12" y="28" width="24" height="14" rx="3" />
      <circle cx="24" cy="35" r="2.6" />
    </svg>
  ),
}

// Category badges that orbit the logo, spaced a quarter turn apart.
const orbitItems = [
  { id: 'Peetal', angle: 0 },
  { id: 'Steel', angle: 90 },
  { id: 'Gifts', angle: 180 },
  { id: 'Electronics', angle: 270 },
]

export default function Hero() {
  const { pick, ui } = useLang()
  const h = ui.hero
  // Tells the Products section which category to show, then the #products link scrolls to it.
  const choose = (id) => window.dispatchEvent(new CustomEvent('select-category', { detail: id }))

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

        <div className="hero-orbit">
          <div className="orbit">
            <div className="orbit-track" aria-hidden="true" />
            <div className="orbit-spin">
              {orbitItems.map(({ id, angle }) => (
                <div key={id} className="orbit-slot" style={{ '--a': `${angle}deg` }}>
                  <a
                    href="#products"
                    className="orbit-bubble"
                    style={{ '--a': `${angle}deg` }}
                    onClick={() => choose(id)}
                  >
                    {icons[id]}
                    <span>{pick(ui.catLabels[id])}</span>
                  </a>
                </div>
              ))}
            </div>
            <div className="orbit-core">
              <img src="/logo.svg" alt={pick(business.name)} width="132" height="132" />
            </div>
          </div>
          <div className="orbit-chip">
            {pick(ui.brands.distributor)}: <b>Borosil</b>
          </div>
        </div>
      </div>
    </section>
  )
}
