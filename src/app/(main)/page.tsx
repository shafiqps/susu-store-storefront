import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos! (Home)",
}

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Home
