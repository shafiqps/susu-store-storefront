import TreeDashboardTemplate from "@modules/account/templates/treedashboard-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Tree Dashboard",
  description: "View your tree dashboard",
}

export default function Membership() {
  return <TreeDashboardTemplate />
}
