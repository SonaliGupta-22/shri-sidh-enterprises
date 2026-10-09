import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Brands from './components/Brands.jsx'
import Products from './components/Products.jsx'
import Scrap from './components/Scrap.jsx'
import Features from './components/Features.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { business } from './data/siteData.js'
import { useLang } from './i18n.jsx'

export default function App() {
  const { pick, ui } = useLang()
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Products />
        <Scrap />
        <Features />
        <About />
        <Contact />
      </main>
      <Footer />
      <a
        className="whatsapp-float"
        href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(pick(ui.floatMsg))}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </>
  )
}
