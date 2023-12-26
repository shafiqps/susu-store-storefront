import { Customer, Order } from "@medusajs/medusa"
import ChevronDown from "@modules/common/icons/chevron-down"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import User from "@modules/common/icons/user"
import { formatAmount } from "medusa-react"
import Link from "next/link"
import React, { useEffect, useState } from 'react';
import { FaRegCopy } from "react-icons/fa";


type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
};

const getTotalLoyaltyPoints = (orders: Order[] | undefined): number => {
  if (!orders) {
    return 0;
  }

  return orders.reduce((total, order) => {
    // Assuming each order has a 'loyaltyPoints' attribute
    return total + (order.loyaltyPoints || 0);
  }, 0);
};

const Overview = ({ orders, customer }: OverviewProps) => {
  const totalLoyaltyPoints = getTotalLoyaltyPoints(orders);
  const copyToClipboard = (referralCode: string) => {
    navigator.clipboard.writeText(referralCode).then(() => {
      alert("Referral code copied to clipboard!");
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };
  return (
    <div>
    
      <div className="hidden small:block">
    
        <div className="flex flex-col py-8 border-t border-white">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Profile</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    Completed
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <h3 className="text-large-semi">Addresses</h3>
                <div className="flex items-end gap-x-2">
                  <span className="text-3xl-semi leading-none">
                    {customer?.shipping_addresses?.length || 0}
                  </span>
                  <span className="uppercase text-base-regular text-gray-500">
                    Saved
                  </span>
                </div>
              </div>
            </div>
        
           <div className="flex flex-col gap-y-4">
            <h3 className="text-large-semi">Referral Code</h3>
            <div className="flex items-center gap-x-2">
      
              <span className="text-3xl-semi leading-none bg-transparent border p-2 pl-4 pr-10 rounded">
                {customer?.metadata?.referral_code || "No referral code available"}
              </span>
      
              {/* Copy icon/button */}
              {customer?.metadata?.referral_code && (
                <button onClick={() => copyToClipboard(customer.metadata.referral_code)}>
                  <FaRegCopy  /> {/* Replace with your actual icon or button */}
                </button>
              )}
            </div>
          </div>


             
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <h3 className="text-large-semi">Recent orders</h3>
              </div>
              <ul className="flex flex-col gap-y-4">
                {orders ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li key={order.id}>
                        <Link href={`/order/details/${order.id}`}>
                          <div className="bg-gray-50 flex justify-between items-center p-4">
                            <div className="grid grid-cols-3 grid-rows-2 text-small-regular gap-x-4 flex-1">
                              <span className="font-semibold">Date placed</span>
                              <span className="font-semibold">
                                Order number
                              </span>
                              <span className="font-semibold">
                                Total amount
                              </span>
                              <span>
                                {new Date(order.created_at).toDateString()}
                              </span>
                              <span>#{order.display_id}</span>
                              <span>
                                {formatAmount({
                                  amount: order.total,
                                  region: order.region,
                                  includeTaxes: false,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              onClick={close}
                            >
                              <span className="sr-only">
                                Go to order #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </Link>
                      </li>
                    )
                  })
                ) : (
                  <span>No recent orders</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer?: Omit<Customer, "password_hash">) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  if (customer.billing_address) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
