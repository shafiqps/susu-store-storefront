
import SuffycoinsTemplate from "@modules/suffycoins/templates"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Suffy Coins",
  description: "Get Coins",
}

export default function Coin() {
  return <SuffycoinsTemplate />

}

