import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

// A compact "come and find us" band for the end of the home page.
export default function VisitStrip() {
  const { pick, ui } = useLang()
  const v = ui.visit
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.mapsQuery)}`
  return (
    <section className="visit" id="visit">
      <div className="container visit-inner">
        <div>
          <h2>{pick(v.title)}</h2>
          <p>📍 {pick(business.address)}</p>
          <p>🕒 {pick(business.hours)} · {pick(business.sunday)}</p>
        </div>
        <div className="visit-actions">
          <a className="btn" href={`tel:${business.phones[0].replace(/\s/g, '')}`}>📞 {pick(ui.nav.call)}</a>
          <a className="btn btn-gold" target="_blank" rel="noreferrer" href={`https://wa.me/${business.whatsapp}`}>WhatsApp</a>
          <a className="btn btn-ghost" target="_blank" rel="noreferrer" href={maps}>📍 {pick(ui.contact.directions)}</a>
        </div>
      </div>
    </section>
  )
}
