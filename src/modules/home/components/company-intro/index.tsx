import Image from "next/image"

// 
// TODO: This section for the CEO
// 
/*
This section is for the CEO
background image: background-ceo-section.jpg
image: CEO.webp
text: Introducing the CEO
Text on the left side
Image on the right side
Background image on the back
Underline link to the store page

*/
const CompanyIntro = () => {
  return (
    <div className="flex justify-center items-center w-full py-10 my-10">
      <div className="flex justify-between items-center w-full max-w-6xl mx-auto p-8" style={{ backgroundColor: '#FFFBE6' }}>
        {/* Image Container */}
        <div className="w-auto">
          <Image
            src="" // Replace with the path to your teapot image
            alt="Teapot"
            width={580} // Adjust based on your actual image's aspect ratio
            height={300} // Adjust based on your actual image's aspect ratio
            objectFit="contain" // Keeps the aspect ratio of the image
          />
        </div>
        {/* Description Container */}
        <div className="w-1/2 pl-8 ">
          <h2 className="text-4xl font-bold mb-2">A faff-free teapot.</h2>
          <h3 className="text-2xl mb-1">TEAPOT FOR ONE</h3>
          <p className="text-xl mb-2">For One - 400ml | ★★★★★ 469 Reviews</p>
          <p className="mb-4">
            Brewing tea should be simple and satisfying - so we redesigned the teapot from scratch. No mess, no faff,
            no need for a strainer (or doilies). Just loads of room for the leaves to release their flavour.
          </p>
          <button className="fifth-heading w-auto p-5  bg-sky-900 bg-opacity-4 text-white py-2 px-4 rounded-full">BUY NOW</button>
        </div>
      </div>
    </div>
    

  )
}


export default CompanyIntro
