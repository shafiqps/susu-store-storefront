import MembershipTemplate from "@modules/account/templates/membership-template"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membership",
  description: "View your membership tree",
}

export default function Membership() {
  return <MembershipTemplate />
}
