import Products from '../components/Products.jsx'
import Catalogue from '../components/Catalogue.jsx'
import { Link, useRoute } from '../router.jsx'
import { useLang } from '../i18n.jsx'

// Two tabs: the photo cards, and the full list of every kitchen item.
export default function ProductsPage() {
  const { path } = useRoute()
  const { pick, ui } = useLang()
  const range = path === '/products/range'
  return (
    <>
      <div className="tabs-bar">
        <div className="container tabs">
          <Link to="/products" className={`tab ${range ? '' : 'active'}`}>{pick(ui.products.tabFeatured)}</Link>
          <Link to="/products/range" className={`tab ${range ? 'active' : ''}`}>{pick(ui.products.tabRange)}</Link>
        </div>
      </div>
      {range ? <Catalogue /> : <Products />}
    </>
  )
}
