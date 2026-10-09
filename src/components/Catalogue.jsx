import { useMemo, useState } from 'react'
import { business } from '../data/siteData.js'
import { catalogue } from '../data/catalogue.js'
import { useLang } from '../i18n.jsx'

const wa = (text) => `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`

export default function Catalogue() {
  const { pick } = useLang()
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('all')

  // Keep the categories (and items) that match the search and the chosen category.
  const shown = useMemo(() => {
    const q = query.trim().toLowerCase()
    return catalogue.categories
      .filter((c) => cat === 'all' || c.id === cat)
      .map((c) => ({
        ...c,
        items: q ? c.items.filter((i) => i.en.toLowerCase().includes(q) || i.hi.toLowerCase().includes(q)) : c.items,
      }))
      .filter((c) => c.items.length > 0)
  }, [query, cat])

  return (
    <section className="section alt" id="catalogue">
      <div className="container">
        <h2 className="section-title">{pick(catalogue.title)}</h2>
        <p className="section-sub">{pick(catalogue.sub)}</p>

        <div className="toolbar">
          <input
            type="search"
            placeholder={pick(catalogue.search)}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={pick(catalogue.search)}
          />
          <div className="chips">
            <button className={`chip ${cat === 'all' ? 'active' : ''}`} onClick={() => setCat('all')}>
              {pick(catalogue.all)}
            </button>
            {catalogue.categories.map((c) => (
              <button
                key={c.id}
                className={`chip ${cat === c.id ? 'active' : ''}`}
                onClick={() => setCat(c.id)}
              >
                {pick(c.name)}
              </button>
            ))}
          </div>
        </div>

        {shown.length === 0 ? (
          <p className="empty">
            {pick(catalogue.none)}{' '}
            <a className="cat-ask" target="_blank" rel="noreferrer" href={wa(pick(catalogue.waMore) + query)}>
              {pick(catalogue.askMore)} →
            </a>
          </p>
        ) : (
          <div className="cat-grid">
            {shown.map((c) => (
              <article key={c.id} className="cat-card">
                <header>
                  <span className="cat-icon" aria-hidden="true">{c.icon}</span>
                  <h3>{pick(c.name)}</h3>
                  <small>{c.items.length} {pick(catalogue.count)}</small>
                </header>
                <ul>
                  {c.items.map((i) => (
                    <li key={i.en}>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={wa(`${pick(catalogue.waItem)}${pick(i)} (${pick(c.name)})`)}
                      >
                        {pick(i)}
                      </a>
                    </li>
                  ))}
                </ul>
                <a className="cat-ask" target="_blank" rel="noreferrer" href={wa(pick(catalogue.waMore) + pick(c.name))}>
                  {pick(catalogue.askMore)} →
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
