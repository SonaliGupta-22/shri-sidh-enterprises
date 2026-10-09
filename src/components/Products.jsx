import { useMemo, useState } from 'react'
import { products, categories, business, featuredIds } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'
import { Link, pending } from '../router.jsx'

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

function ProductCard({ p }) {
  const { pick, ui } = useLang()
  const t = ui.products
  return (
    <article className="card">
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
  )
}

// featuredOnly: the short version for the home page (a few best sellers and a "see all" button).
export default function Products({ featuredOnly = false }) {
  // The home page orbit can send us here with a category already chosen.
  const [category, setCategory] = useState(() => {
    const c = pending.category
    pending.category = null
    return c || 'All'
  })
  const [query, setQuery] = useState('')
  const { lang, pick, ui } = useLang()
  const t = ui.products

  const filtered = useMemo(() => {
    if (featuredOnly) return featuredIds.map((id) => products.find((p) => p.id === id)).filter(Boolean)
    const q = query.trim().toLowerCase()
    return products.filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (!q || [p.name.en, p.name.hi, p.desc.en, p.desc.hi].some((s) => s.toLowerCase().includes(q)))
    )
  }, [featuredOnly, category, query, lang])

  return (
    <section className="section" id="products">
      <div className="container">
        <h2 className="section-title">{pick(featuredOnly ? t.featuredTitle : t.title)}</h2>
        <p className="section-sub">{pick(t.sub)}</p>
        <p className="price-note">💬 {pick(t.priceNote)}</p>

        {!featuredOnly && (
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
        )}

        {filtered.length === 0 ? (
          <p className="empty">{pick(t.empty)}</p>
        ) : (
          <div className="grid">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}

        <p className="more-range">
          {featuredOnly ? (
            <Link to="/products" className="btn">{pick(t.seeAll)}</Link>
          ) : (
            <Link to="/products/range">{pick(t.more)} →</Link>
          )}
        </p>
      </div>
    </section>
  )
}
