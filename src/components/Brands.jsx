import { brands } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Brands() {
  const { pick, ui } = useLang()
  return (
    <section className="brands" id="brands">
      <div className="container">
        <p className="brands-label">{pick(ui.brands.label)}</p>
        <ul className="brands-list">
          {brands.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
