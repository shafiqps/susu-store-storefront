import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[90vh] w-full relative">
      <div className="text-white absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:text-left small:justify-end small:items-start small:p-32">
        <h1 className="text-2xl-semi mb-4 drop-shadow-md shadow-black">
          Introducing SUFFY SUSU
        </h1>
        <p className="text-base-regular max-w-[32rem] mb-6 drop-shadow-md shadow-black">
        Suffy is a brand of bumiputra formula milk products and Muslim products that are processed and produced from their own factory in Ipoh, Perak. Suffy offers a wide variety of milk based on goat milk and cow milk for children, adults and the elderly.
    
        </p>
        <UnderlineLink href="/store">Explore SUFFY products</UnderlineLink>
      </div>
      <Image
        src="/MILK.jpg"
        loading="eager"
        priority={true}
        quality={100}
        alt="Photo by @thevoncomplex https://unsplash.com/@thevoncomplex"
        className="absolute inset-0"
        draggable="false"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </div>
  )
}

export default Hero
