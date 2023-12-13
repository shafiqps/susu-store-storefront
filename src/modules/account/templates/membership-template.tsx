"use client"

import Membership from "@modules/account/components/membership"
import { useMeCustomer } from "medusa-react"

const MemberTemplate = () => {
  const { customer } = useMeCustomer()
  return <Membership customer={customer} />
}

export default MemberTemplate
