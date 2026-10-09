import { useState } from 'react'
import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'
import { Link } from '../router.jsx'

const links = [
  ['home', '/'],
  ['products', '/products'],
  ['offers', '/offers'],
  ['about', '/about'],
  ['contact', '/contact'],
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { lang, setLang, pick, ui } = useLang()
  return (
    <header className="header">
      <div className="blessing">
        <span className="bless-orn" aria-hidden="true">ॐ</span>
        <span className="bless-line" aria-hidden="true" />
        <span className="bless-text">🙏 {pick(business.blessing)} 🙏</span>
        <span className="bless-line" aria-hidden="true" />
        <span className="bless-orn" aria-hidden="true">ॐ</span>
      </div>
      <div className="container header-inner">
        <Link to="/" className="logo" onClick={() => setOpen(false)}>
          <img className="logo-img" src="/logo.svg" alt="" width="46" height="46" />
          <span>{pick(business.name)}</span>
        </Link>
        <nav className={`nav ${open ? 'open' : ''}`}>
          {links.map(([key, to]) => (
            <Link key={to} to={to} onClick={() => setOpen(false)}>{pick(ui.nav[key])}</Link>
          ))}
          <div className="lang-toggle" role="group" aria-label="Language">
            <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
            <button className={lang === 'hi' ? 'active' : ''} onClick={() => setLang('hi')}>हिं</button>
          </div>
          <a className="btn btn-small" href={`tel:${business.phones[0].replace(/\s/g, '')}`}>{pick(ui.nav.call)}</a>
        </nav>
        <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  )
}
