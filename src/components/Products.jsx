import { useEffect, useMemo, useState } from 'react'
import { products, categories, business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

// Photo file name for a product, from its English name: "Peetal Handi / Patila" -> peetal-handi-patila.jpg
// Put the photo in public/images/products/. A product can also set  image: '/images/...'  to use any other file.
export const photoSlug = (p) => p.name.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

// Tries a real photo (.jpg) first, then the drawn illustration (.svg), then the icon.
function ProductImage({ p, alt }) {
  const slug = photoSlug(p)
  const sources = [p.image, `/images/products/${slug}.jpg`, `/images/products/${slug}.svg`].filter(Boolean)
  const [i, setI] = useState(0)
  if (i >= sources.length) return <span className="card-emoji">{p.emoji}</span>
  return (
    <img
      src={sources[i]}
      alt={alt}
      className={sources[i].endsWith('.svg') ? 'illus' : undefined}
      loading="lazy"
      onError={() => setI(i + 1)}
    />
  )
}

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
                  <ProductImage p={p} alt={pick(p.name)} />
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
