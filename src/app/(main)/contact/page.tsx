import { Metadata } from "next"
import ContactTemplate from "@modules/contact/components"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact us.",
}

export default function StorePage() {
  return <ContactTemplate />
}