import { features } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Features() {
  const { pick, ui } = useLang()
  return (
    <section className="section alt" id="why">
      <div className="container">
        <h2 className="section-title">{pick(ui.why.title)}</h2>
        <div className="features">
          {features.map((f) => (
            <div key={f.icon} className="feature">
              <div className="feature-icon">{f.icon}</div>
              <h3>{pick(f.title)}</h3>
              <p>{pick(f.text)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
