"use client"

import clsx from "clsx"
import { useCollections, useProductCategories } from "medusa-react"
import Link from "next/link"
import CountrySelect from "../country-select"
import Image from 'next/image'
import Button from "@modules/common/components/button"
import Button2 from "@modules/common/components/button"

const FooterNav = () => {
  const { collections } = useCollections()
  const { product_categories } = useProductCategories()
  return (
    
    <div className="content-container background-image flex flex-col gap-y-8 pb-5">
      <div className="flex justify-around items-center bg-transparent w-full h-auto py-4 px-8">
      
      
    </div>
      <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between">
        <div >
        <div className="pb-2">
          <Link href="/" className="text-xl-semi uppercase">
            <Image
                    src="/Logo-Suffy-01.svg"
                    alt="SUFFY SUSU logo"
                    className="h-10 w-auto"
                    width={150}
                    height={150}
                  />
          </Link>
          </div>
          <div>          <div className="flex flex-col gap-y-2 bold pl-2">

            <ul className="grid grid-cols-1 gap-y-2">
              <li>
              <Link href="/" className="text-xl-semi uppercase">
            <Image
                    src="/Facebook_Logo_2023.png"
                    alt="SUFFY SUSU logo"
                    className="h-5 w-auto"
                    width={50}
                    height={50}
                  />
          </Link>
              </li>
              <li>
              <Link href="/" className="text-xl-semi uppercase">
                  <Image
                    src="/Instagram_logo_2016.png"
                    alt="SUFFY SUSU logo"
                    className="h-5 w-auto"
                    width={50}
                    height={50}
                  />
          </Link>
              </li>
            </ul>
          </div></div>
          
          

        </div>
        
        <div className="text-small-regular grid grid-cols-3 gap-x-10 md:gap-x-16">
          {product_categories && (
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Categories</span>
              <ul className="grid grid-cols-1 gap-2">
                {product_categories?.slice(0, 6).map((c) => {
                  if (c.parent_category) {
                    return
                  }

                  const children =
                    c.category_children?.map((child) => ({
                      name: child.name,
                      handle: child.handle,
                      id: child.id,
                    })) || null

                  return (
                    <li className="flex flex-col gap-2" key={c.id}>
                      <Link
                        className={clsx(children && "text-small-semi")}
                        href={`/${c.handle}`}
                      >
                        {c.name}
                      </Link>
                      {children && (
                        <ul className="grid grid-cols-1 ml-3 gap-2">
                          {children &&
                            children.map((child) => (
                              <li key={child.id}>
                                <Link href={`/${child.handle}`}>
                                  {child.name}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {collections && (
            <div className="flex flex-col gap-y-2">
              <span className="text-base-semi">Collections</span>
              <ul
                className={clsx("grid grid-cols-1 gap-2", {
                  "grid-cols-2": (collections?.length || 0) > 3,
                })}
              >
                {collections?.slice(0, 6).map((c) => (
                  <li key={c.id}>
                    <Link href={`/collections/${c.handle}`}>{c.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col gap-y-2 bold">
            <span className="third-heading text-white">STORE</span>
            <ul className="grid grid-cols-1 fourth-heading text-white gap-y-2">
              <li>
                <a
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                >
                  All Products
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                >
                  Subscriptions
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-y-2 bold">
            <span className="third-heading">GET IN TOUCH</span>
            <ul className="grid grid-cols-1 fourth-heading text-white gap-y-2">
              <li>
                <a
                  href="https://github.com/medusajs"
                  target="_blank"
                  rel="noreferrer"
                >
                  contact@suffy.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-y-4 justify-center xsmall:items-center xsmall:flex-row xsmall:items-end xsmall:justify-between">
        <span className="text-xsmall-regular text-gray-400">
          © Copyright Suffy. 2020.
        </span>
        <div className="min-w-[316px] flex xsmall:justify-end">
        </div>
      </div>
    </div>
  )
}

export default FooterNav
