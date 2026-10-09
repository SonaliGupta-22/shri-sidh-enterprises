import { useState } from 'react'
import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const { pick, ui } = useLang()
  const t = ui.contact
  const mapsQuery = encodeURIComponent(business.mapsQuery)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  // Sends the enquiry to the shop's WhatsApp - no backend needed.
  const submit = (e) => {
    e.preventDefault()
    const text = pick(t.waMsg)
      .replace('{name}', form.name)
      .replace('{phone}', form.phone)
      .replace('{message}', form.message)
    window.open(`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">{pick(t.title)}</h2>
        <p className="section-sub">{pick(t.sub)}</p>
        <div className="contact">
          <div className="contact-info">
            <p><strong>📍 {pick(t.address)}</strong><br />{pick(business.address)}</p>
            <p>
              <strong>📞 {pick(t.phone)}</strong>
              {business.phones.map((p) => (
                <span key={p}><br /><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></span>
              ))}
            </p>
            {business.email && (
              <p><strong>✉️ {pick(t.email)}</strong><br /><a href={`mailto:${business.email}`}>{business.email}</a></p>
            )}
            <p><strong>🕒 {pick(t.hours)}</strong><br />{pick(business.hours)}<br />{pick(business.sunday)}</p>
            <a className="btn btn-small" target="_blank" rel="noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}>
              📍 {pick(t.directions)}
            </a>
          </div>
          <form className="form" onSubmit={submit}>
            <input required placeholder={pick(t.name)} value={form.name} onChange={set('name')} />
            <input required type="tel" placeholder={pick(t.phonePh)} value={form.phone} onChange={set('phone')} />
            <textarea required rows="4" placeholder={pick(t.message)} value={form.message} onChange={set('message')} />
            <button className="btn" type="submit">{pick(t.send)}</button>
          </form>
        </div>
        <iframe
          className="map"
          title="Shop location"
          loading="lazy"
          src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        />
      </div>
    </section>
  )
}
