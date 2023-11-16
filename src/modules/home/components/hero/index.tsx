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
          The world's first and only lactation milk that is made with 100%
          natural ingredients and is 100% vegan.
          Also available in a variety of flavors.
        </p>
        <UnderlineLink href="/store">Explore SUFFY products</UnderlineLink>
      </div>
      <Image
        src="/hero.webp"
        loading="eager"
        priority={true}
        quality={90}
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
