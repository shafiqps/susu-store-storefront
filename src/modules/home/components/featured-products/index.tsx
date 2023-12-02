"use client"

import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data"
import Button from "@modules/common/components/button"
import UnderlineLink from "@modules/common/components/underline-link"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import Link from "next/link"

const FeaturedProducts = () => {
  const { data } = useFeaturedProductsQuery()
  const featuredProduct = {
    title: "Oh Christmas Tea & Seriously Limited Edition",
    description: "A festive and warming cup of tea. These bright blends will see you through films, fights with wrapping paper, bauble re-threading and every morning after. Blends of Christmas past are returning for a very limited time only. Grab your favourites from last year's Tasting Club while you can. Once they're gone, they're gone.",
    imageUrl: "/b_genius.jpg", // Replace with your image path
  };
  return (
    <div className="py-12">
      <div className="content-container py-12">
        <div className="flex flex-wrap justify-center items-center">
          {/* Image Column */}
          <div className="flex-1">
            <img src={featuredProduct.imageUrl} alt="Featured Tea" className="w-full h-auto" />
            <div className="flex-1 text-center">
            <h2 className="second-heading">
              {featuredProduct.title}
            </h2>
            <p className="description-heading">
              {featuredProduct.description}
            </p>
              <button className="fifth-heading w-auto m-2 pr-10 pl-10  bg-pink-900 bg-opacity-4 text-white py-2 px-4 rounded-full">
                Shop All
              </button>
          </div>
          </div>
          
          
          {/* Text and Button Column */}
          <div className="flex-1 text-center">
          <img src={featuredProduct.imageUrl} alt="Featured Tea" className="w-full h-auto" />
            <h2 className="second-heading">
              {featuredProduct.title}
            </h2>
            <p className="description-heading">
              {featuredProduct.description}
            </p>
              <button className="fifth-heading w-auto m-2 pr-10 pl-10 bg-pink-900 bg-opacity-4 text-white py-2 px-4 rounded-full">
                Shop All
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProducts
