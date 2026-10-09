import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

const services = [
  { key: 'wholesale', icon: '📦' },
  { key: 'scrap', icon: '♻️' },
]

export default function Scrap() {
  const { pick, ui } = useLang()
  return (
    <section className="scrap" id="services">
      <div className="container scrap-grid">
        {services.map(({ key, icon }) => {
          const t = ui[key]
          return (
            <div key={key} className="scrap-card">
              <div className="scrap-icon" aria-hidden="true">{icon}</div>
              <h2>{pick(t.title)}</h2>
              <p>{pick(t.text)}</p>
              <a
                className="btn"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(t.waMsg))}`}
              >
                {pick(t.cta)}
              </a>
            </div>
          )
        })}
      </div>
    </section>
  )
}
