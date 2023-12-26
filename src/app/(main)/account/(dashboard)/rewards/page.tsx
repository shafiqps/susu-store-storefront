
import RewardTemplate from "@modules/account/templates/reward-template"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Rewards",
  description: "claim your rewards",
}

export default function Orders() {
  return <RewardTemplate />
}