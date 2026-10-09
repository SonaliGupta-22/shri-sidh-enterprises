import Festival from '../components/Festival.jsx'
import Hero from '../components/Hero.jsx'
import Brands from '../components/Brands.jsx'
import Offers from '../components/Offers.jsx'
import Products from '../components/Products.jsx'
import Scrap from '../components/Scrap.jsx'
import Features from '../components/Features.jsx'
import VisitStrip from '../components/VisitStrip.jsx'

// Short on purpose: the main message, a few best sellers, and how to reach the shop.
export default function Home() {
  return (
    <>
      <Festival />
      <Hero />
      <Brands />
      <Offers />
      <Products featuredOnly />
      <Scrap />
      <Features />
      <VisitStrip />
    </>
  )
}
