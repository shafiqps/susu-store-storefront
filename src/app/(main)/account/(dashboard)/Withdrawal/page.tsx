import WithdrawalTemplate from "@modules/account/templates/withdrawal"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "withdrawal",
  description: "withdrawal of your previous orders..",
}

export default function Orders() {
  return <WithdrawalTemplate />
}