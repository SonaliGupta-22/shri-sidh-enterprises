import { orderSteps } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function OrderSteps() {
  const { pick } = useLang()
  return (
    <section className="section alt" id="how">
      <div className="container">
        <h2 className="section-title">{pick(orderSteps.title)}</h2>
        <ol className="steps">
          {orderSteps.steps.map((s, i) => (
            <li key={s.title.en} className="step">
              <span className="step-no">{i + 1}</span>
              <h3>{pick(s.title)}</h3>
              <p>{pick(s.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
