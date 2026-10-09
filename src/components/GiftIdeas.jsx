import { business, giftIdeas } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function GiftIdeas() {
  const { pick } = useLang()
  return (
    <section className="section" id="gifts">
      <div className="container">
        <h2 className="section-title">{pick(giftIdeas.title)}</h2>
        <p className="section-sub">{pick(giftIdeas.sub)}</p>
        <div className="gift-grid">
          {giftIdeas.items.map((g) => (
            <article key={g.name.en} className="gift">
              <div className="gift-emoji" aria-hidden="true">{g.emoji}</div>
              <h3>{pick(g.name)}</h3>
              <p>{pick(g.text)}</p>
              <a
                className="btn btn-small btn-outline"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(giftIdeas.waMsg) + pick(g.name))}`}
              >
                {pick(giftIdeas.cta)}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
