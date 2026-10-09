import { business, faq, distributorBrands, dealerBrands } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Faq() {
  const { pick, ui } = useLang()

  // Some answers are built from the shop details so they never go out of date.
  const answer = (item) => {
    if (item.kind === 'address') return pick(business.address)
    if (item.kind === 'hours') return `${pick(business.hours)}. ${pick(business.sunday)}.`
    if (item.kind === 'brands') {
      return `${pick(ui.brands.distributor)}: ${distributorBrands.join(', ')}. ${pick(ui.brands.dealer)}: ${dealerBrands.join(', ')}.`
    }
    return pick(item.a)
  }

  return (
    <section className="section alt" id="faq">
      <div className="container faq">
        <h2 className="section-title">{pick(faq.title)}</h2>
        {faq.items.map((item) => (
          <details key={item.q.en} className="faq-item">
            <summary>{pick(item.q)}</summary>
            <p>{answer(item)}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
