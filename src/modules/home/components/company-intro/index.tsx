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
    <div className="bg-gradient-to-b from-white via-blue-300 to-blue-500 w-full">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          
          </div>
        <div>
          <h3 className="text-2xl-semi">Introducing the Executive Chairman</h3>
          <h3 className="text-2xl-semi"> of Suffy Dairy Group Sdn Bhd</h3>
          <h3 className="text-xl-semi">Mr. Sofian bin Tajuddin</h3>
          
        </div>
        <div className="relative h-[70vh] small:aspect-[36/36]">
          <Image
            src="/Jeff-Bezos.png"
            alt=""
            className="absolute inset-0"
            fill
            sizes="100vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div>

        </div>
      </div>
    </div>

  )
}

export default CompanyIntro
