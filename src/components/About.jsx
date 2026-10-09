import { useLang } from '../i18n.jsx'

export default function About() {
  const { pick, ui } = useLang()
  return (
    <section className="section" id="about">
      <div className="container about">
        <div className="about-art" aria-hidden="true">🍽️</div>
        <div>
          <h2 className="section-title left">{pick(ui.about.title)}</h2>
          <p>{pick(ui.about.p1)}</p>
          <p>{pick(ui.about.p2)}</p>
        </div>
      </div>
    </section>
  )
}
