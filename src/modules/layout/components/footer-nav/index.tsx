"use client"
import { FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { SiShopee } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
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
  const Year = new Date().getFullYear();
  return (
      
    <footer className="relative  bg-black text-white ">
      <div className="bg-sky-500 absolute top-0 left-0 w-[100%] overflow-hidden">
        <svg data-name="Layer 1"
                 xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 1200 120" 
                preserveAspectRatio="none">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,
                        250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,
                        3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="relative block h-[600px] fill-white"></path>
        </svg>
        <div className="grid lg:grid-cols-4 gap-20 sm:grid-cols-1 p-20">
          <div className="flex flex-col gap-5 font-suffy">
          <Image
                    src="/Logo-Suffy-01.svg"
                    alt="SUFFY SUSU logo"
                    className="h-10 text-3xl px-5"
                    width={200}
                    height={200}
                  />
              <h2 className="text-3xl text-black-300 font-semibold">Suffy Dairy Group</h2>    
              <p>
              
              No.6 & 8, Jalan Niaga Jelapang 2, Jelapang Business Yard, 30020, Ipoh, PERAK.
              </p>
          </div>

            <div>
              <li className="text-[22px] list-none font-semibold text-white-500 py-2 uppercase">
                              Shop
              </li>
              <li className="my-4 list-none">Website Guidlines & Ideas</li>
              <li className="my-4 list-none">Tips & Tricks</li>
              <li className="my-4 list-none">photography</li>
            </div>

            <div>
              <li className="text-[22px] list-none font-semibold text-white-500 py-2 uppercase">
                            Others</li>
              <li className="my-4 list-none">Guidlines & Ideas</li>
              <li className="my-4 list-none">Tips & Tricks</li>
              <li className="my-4 list-none">photography</li>
            </div>

            <div className="mb-4 md:mb-0">
            <h2 className="text-[22px] font-semibold text-white-500 py-2 uppercase">Get in touch</h2>
                        <p className=" flex space-x-4 text-[16px] my-4"> <MdEmail/>  admin@suffy.com.my</p>
                        <p className=" flex space-x-4 text-[16px] my-4"> <FaPhoneAlt />  +6013-286 5567 </p>
                        <p className=" flex space-x-4 text-[16px] my-4"> <FaWhatsapp />  +6013-286 5567 </p>
             
              <div className="flex space-x-4">
                            <a
                                className="text-white hover:text-sky-700 transform hover:scale-150 
                            transition-all duration-150 ease-in-out" href="">
                                <FaGithub />
                            </a>
                            <a
                                className="text-white hover:text-sky-700 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <SiShopee />
                            </a>
                            <a
                                className="text-white hover:text-sky-700 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <FaTwitter />
                            </a>
                            <a
                                className="text-white hover:text-sky-700 transform hover:scale-150
                             transition-all duration-150 ease-in-out" href="">
                                <FaInstagram />
                            </a>
                </div>
            </div>
          </div>

          <div className="mt-20">
                    <div className="h-full flex items-center justify-center mb-5">
                        <form className="w-96 relative">
                            <input type="email" placeholder=""
                                className="w-full text-gray-800 p-4 h-10 rounded-full focus:outline-none 
                            focus:border border-sky-800" />
                            <button
                                type="Submit"
                                className="bg-sky-700 px-8 py-2 rounded-full text-white
                                 absolute top-0 right-0"
                                >
                                Submit
                            </button>
                        </form>
                    </div>
            </div>
            <div className="font-suffy flex-auto px-10 py-11 text-xs ">
            <div>
            <p className="font-semibold">"Suffy Dairy Group Sdn Bhd is committed to meeting customer satisfaction by producing quality and safe products in accordance with HACCP principles. We also prioritize the need to meet food laws as stipulated in the Malaysian Food Act".</p>
            <p className="pt-4">When you visit or interact with our sites, services, applications, tools or messaging, we or our authorized service providers may use cookies, web beacons, and other similar technologies for storing information to help provide you with a better, faster and safer experience and for advertising purposes.</p>
            </div>
            </div>
            <h6 className="text-center text-xs">Copyright &copy; <b>Suffy Dairy Group</b>. All rights reserved. {Year}</h6>
      </div>

    </footer>
  )
}

export default FooterNav
