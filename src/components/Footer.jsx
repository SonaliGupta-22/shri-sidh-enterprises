import { business } from '../data/siteData.js'
import credits from '../data/photoCredits.json'
import { useLang } from '../i18n.jsx'

export default function Footer() {
  const { pick, ui } = useLang()
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} {pick(business.name)}. {pick(ui.footer.rights)}</p>
        <p className="footer-credit">{pick(ui.footer.credit)}</p>
        {credits.length > 0 && (
          <details className="footer-credit photo-credits">
            <summary>{pick(ui.footer.photos)}</summary>
            <ul>
              {credits.map((c) => (
                <li key={c.file}>
                  “<a href={c.url} target="_blank" rel="noreferrer">{c.title}</a>” by {c.author},{' '}
                  <a href={c.licenseUrl} target="_blank" rel="noreferrer">{c.license}</a> ({c.note})
                </li>
              ))}
            </ul>
          </details>
        )}
      </div>
    </footer>
  )
}
