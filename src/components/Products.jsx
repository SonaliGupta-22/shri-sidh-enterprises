import { useEffect, useMemo, useState } from 'react'
import { products, categories, business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Products() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const { lang, pick, ui } = useLang()
  const t = ui.products

  // Lets the hero tiles open a category here.
  useEffect(() => {
    const onSelect = (e) => { setCategory(e.detail); setQuery('') }
    window.addEventListener('select-category', onSelect)
    return () => window.removeEventListener('select-category', onSelect)
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!q ||
          [p.name.en, p.name.hi, p.desc.en, p.desc.hi].some((s) => s.toLowerCase().includes(q)))
    )
  }, [category, query, lang])

  return (
    <section className="section" id="products">
      <div className="container">
        <h2 className="section-title">{pick(t.title)}</h2>
        <p className="section-sub">{pick(t.sub)}</p>
        <p className="price-note">💬 {pick(t.priceNote)}</p>

        <div className="toolbar">
          <input
            type="search"
            placeholder={pick(t.search)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={pick(t.search)}
          />
          <div className="chips">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`chip ${c.id === category ? 'active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {pick(c.label)}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="empty">{pick(t.empty)}</p>
        ) : (
          <div className="grid">
            {filtered.map((p) => (
              <article key={p.id} className="card">
                {p.tag && <span className="tag">{pick(p.tag)}</span>}
                <div className="card-img">
                  {p.image ? <img src={p.image} alt={pick(p.name)} loading="lazy" /> : p.emoji}
                </div>
                <h3>{pick(p.name)}</h3>
                <p>{pick(p.desc)}</p>
                <a
                  className="btn btn-small btn-outline"
                  target="_blank"
                  rel="noreferrer"
                  href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(t.waMsg) + pick(p.name))}`}
                >
                  {pick(t.enquire)}
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
