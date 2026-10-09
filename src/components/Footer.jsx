import { business } from '../data/siteData.js'
import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { pick, ui } = useLang()
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} {pick(business.name)}. {pick(ui.footer.rights)}</p>
        <p className="footer-credit">{pick(ui.footer.credit)}</p>
      </div>
    </footer>
  )
}
