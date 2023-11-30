import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import CompanyIntro from "@modules/home/components/company-intro"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Suffy",
  description:
    "Suffy (Home)"
}

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CompanyIntro />
    </>
  )
}

export default Home
