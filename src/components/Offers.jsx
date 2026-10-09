import { business, offers } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Offers() {
  const { pick } = useLang()
  if (!offers.enabled || offers.items.length === 0) return null

  return (
    <section className="section offers" id="offers">
      <div className="container">
        <h2 className="section-title">{pick(offers.title)}</h2>
        <p className="section-sub">{pick(offers.sub)}</p>
        <div className="offer-grid">
          {offers.items.map((o) => (
            <article key={o.title.en} className="offer">
              <span className="offer-tag">{pick(o.tag)}</span>
              {o.badge && <span className="offer-badge">{pick(o.badge)}</span>}
              <div className="offer-emoji" aria-hidden="true">{o.emoji}</div>
              <h3>{pick(o.title)}</h3>
              <p>{pick(o.text)}</p>
              <a
                className="btn btn-small"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(offers.waMsg) + pick(o.title))}`}
              >
                {pick(offers.cta)}
              </a>
            </article>
          ))}
        </div>
        <p className="offer-note">{pick(offers.note)}</p>
      </div>
    </section>
  )
}
