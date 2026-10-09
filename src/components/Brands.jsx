import { distributorBrands, dealerBrands } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Brands() {
  const { pick, ui } = useLang()
  const t = ui.brands
  return (
    <section className="brands" id="brands">
      <div className="container brands-rows">
        <div className="brands-row">
          <p className="brands-label">{pick(t.distributor)}</p>
          <ul className="brands-list big">
            {distributorBrands.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
        <div className="brands-row">
          <p className="brands-label">{pick(t.dealer)}</p>
          <ul className="brands-list">
            {dealerBrands.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}
