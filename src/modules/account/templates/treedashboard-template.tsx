"use client"

import TreeDashboard from "@modules/account/components/treedashboard"
import { useCustomerOrders, useMeCustomer } from "medusa-react"

const TreeDashboardTemplate = () => {
  const { orders } = useCustomerOrders()
  const { customer } = useMeCustomer()

  return <TreeDashboard orders={orders} customer={customer} />
}

export default TreeDashboardTemplate
