import DashboardTemplate from "@modules/account/templates/member-dashboard-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "View your tree dashboard summary",
}

export default function Dashboard() {
  return <DashboardTemplate />
}