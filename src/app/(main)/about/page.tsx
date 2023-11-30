import AboutTemplate from "@modules/about/templates"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "About Us",
  description: "About SUFFY",
}

export default function Cart() {
  return <AboutTemplate />

}

