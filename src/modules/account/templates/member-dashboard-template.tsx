"use client"

import Dashboard from "@modules/account/components/dashboard"
import { useCustomerOrders, useMeCustomer } from "medusa-react"

const DashboardTemplate = () => {
  const { orders } = useCustomerOrders()
  const { customer } = useMeCustomer()

  return <Dashboard orders={orders} customer={customer} />
}

export default DashboardTemplate
