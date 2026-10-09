import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import OffersPage from './pages/OffersPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import { business } from './data/siteData.js'
import { useLang } from './i18n.jsx'
import { useRoute } from './router.jsx'

const pages = {
  '/': Home,
  '/products': ProductsPage,
  '/products/range': ProductsPage,
  '/offers': OffersPage,
  '/about': AboutPage,
  '/contact': ContactPage,
}

export default function App() {
  const { pick, ui } = useLang()
  const { path } = useRoute()
  const Page = pages[path] ?? Home
  return (
    <>
      <Header />
      <main>
        <Page />
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
