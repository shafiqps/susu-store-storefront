import { useAccount } from "@lib/context/account-context"
import ChevronDown from "@modules/common/icons/chevron-down"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from 'react';

const AccountNav = () => {
  const route = usePathname()
  const { handleLogout } = useAccount()
  const [isMembershipDropdownOpen, setMembershipDropdownOpen] = useState(false);

  const toggleMembershipDropdown = () => {
    setMembershipDropdownOpen(!isMembershipDropdownOpen);
  };


  return (
    <div>
      <div className="small:hidden">
        {route !== "/account" && (
          <Link
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </Link>
        )}
      </div>
      <div className="hidden small:block">
        <div>
          <div className="py-4">
            <h3 className="text-base-semi">Account</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-4">
              <li>
                <AccountNavLink href="/account" route={route!}>
                  Overview
                </AccountNavLink>
              </li>
              <li>
              <div className="flex items-center justify-between" onClick={toggleMembershipDropdown}>
                <AccountNavLink href="/account/membership" route={route!}>
                  Membership
                </AccountNavLink>
                <ChevronDown className={`transform ${isMembershipDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
              </div>
                {isMembershipDropdownOpen && (
                  <ul className="nested-list">
                    <li>
                      <AccountNavLink href="/account/dashboard" route={route!}>
                        Dashboard
                      </AccountNavLink>
                    </li>
                  </ul>
                )}
              </li>

              <li>
                      <AccountNavLink href="/account/dashboard" route={route!}>
                        Dashboard
                      </AccountNavLink>
                    </li>
              <li>
                <AccountNavLink href="/account/profile" route={route!}>
                  Profile
                </AccountNavLink>
              </li>
                <AccountNavLink href="/account/Withdrawal" route={route!}>
                  Withdrawal
                </AccountNavLink>
              <li>
                <AccountNavLink href="/account/addresses" route={route!}>
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink href="/account/orders" route={route!}>
                  Orders
                </AccountNavLink>
              </li>
              <li className="text-grey-700">
                <button type="button" onClick={handleLogout}>
                  Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
}

const AccountNavLink = ({ href, route, children }: AccountNavLinkProps) => {
  const active = route === href
  return (
    <Link
      href={href}
      className={clsx("text-gray-700", {
        "text-gray-900 font-semibold": active,
      })}
    >
      <>{children}</>
    </Link>
  )
}

export default AccountNav
