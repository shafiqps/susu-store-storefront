import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"


/*
this section should be allign vertically center
image of all products
with text More of our products
link to /store
text and link on top of image
image = all-product.webp
*/
const FooterCTA = () => {
  return (
    <div className="flex justify-center items-center bg-gradient-to-t from-white via-blue-300 to-blue-500 w-full h-[90vh]">
      <div >
        <div>
          <h3 className="text-2xl-semi">More of our products</h3>
          <div className="mt-6">
            <UnderlineLink href="/store">Explore SUFFY products</UnderlineLink>
          </div>
        </div>

        <div className="h-640 w-960 relative">
          <Image
            src="/all-product.webp"
            alt=""
            className="inset-0"
            sizes="100vw"
            width={1000}
            height={1000}
          />
        </div>
      </div>
    </div>

  )
}

export default FooterCTA
