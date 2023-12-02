"use client"
import Script from 'next/script';
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"


const Nav = () => {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState("");
  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          "relative h-16 px-8 mx-auto bg-white border-b border-gray-200 transition-colors duration-200",
          {
            "!bg-white !border-gray-200": !isHome || isScrolled,
          }
        )}
      >
        <nav
          className={clsx(
            "text-gray-900 flex items-center justify-between w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-gray-900": isHome && !isScrolled,
            }
          )}
        >
             <div className="flex items-center h-full">
            <Link href="/" className="text-xl-semi uppercase">
              <Image
                    src="/Logo-Suffy-01.svg"
                    alt="SUFFY SUSU logo"
                    className="h-10 w-auto"
                    width={150}
                    height={100}
                  />
            </Link>
            <Script><script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
<script src="https://mediafiles.botpress.cloud/99ee75f5-6861-4ca6-b69b-70f4ae680523/webchat/config.js" defer></script></Script>
          </div>
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
            {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
            
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
            <Link href="/about" className="text-lg font-semibold hover:underline ">About</Link>
        <Link href="/contact" className="text-lg font-semibold  hover:underline">Services</Link>
        <Link href="/contact" className="text-lg font-semibold  hover:underline ">Certificates</Link>
        <Link href="/contact" className="text-lg font-semibold  hover:underline ">Contact</Link>
        
            <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none w-64" // Adjust the width (w-64) and other styles as needed
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
    
        </div>
      </div>


              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account" className="text-lg font-semibold  hover:underline">Account</Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
