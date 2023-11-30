import Image from "next/image";

const AboutTemplate = () => {
  return (
    <div className="relative w-full">
      {/* Existing Hero Section */}
      <div className="about-us-hero h-[90vh] w-full ">
        <div
          className="absolute inset-0"
          style={{
            position: "absolute",
            width: "100%",
            height: "400px",
          }}
        >
          <Image
            src="/MILK.jpg"
            alt="Suffy Susu Milk"
            layout="fill"
            objectFit="cover"
            priority={true}
            quality={100}
            className="z-0"
          />
          <div className="about-us-hero absolute inset-0 z-10 flex flex-col justify-center items-center text-center" style={{ height: 'calc(250% - 4rem)' }}>
            <h1 className="text-5xl font-bold text-black">
              Introducing SUFFY SUSU
            </h1>
            <p className="hero-subtext text-black">
              Suffy is a brand of bumiputra formula milk products and Muslim products that are processed and produced from their own factory in Ipoh, Perak. Suffy offers a wide variety of milk based on goat's milk and cow's milk for children, adults and the elderly.
            </p>
          </div>
   
        </div>
      </div>

      {/* Work Section with specific width and centering */}
      <div className="test container mx-auto px-10 grid grid-cols-1 md:grid-cols-2">
          <div className="flex-1 px-4">
            <Image
              src="/CAR.jpg"
              alt="Descriptive Alt Text"
              width={560} // Adjust based on your actual image aspect ratio
              height={350} // Adjust based on your actual image aspect ratio
              objectFit="cover"
              layout="responsive"
            />
          </div>
       
          <div className="flex-1 px-4">
              <div>
                <h2 className="text-lg font-semibold">
                Q: HOW MANY CUPS OF TEA DOES IT TAKE TO FILL A NISSAN CUBE?
                </h2>
                <br/>
                <h2 className="text-lg font-semibold">
                A: IT'S 18,300
                </h2>
                <br/>
                <br/>
                <p className="text-sm">
                It’s 18,300. We know because we filled ours every Thursday to keep our first stockists in tea.
                </p>
                <br/>
                <br/>
                <p className="text-sm">
                Back in 2012, armed with a few sharpies, a stash of foil bags, and the occasional hand-stitched tea bag; Aideen bought, tasted and packed the tea, whilst Phil sold and delivered it.
                </p>
                <br/>
                <br/>
                <p className="text-sm">
                Fast forward a few years - the team has grown, we’re rocking a new Tea HQ in Manchester, but we’re still banging the same drum.
                </p>
              </div>
          </div>

          <div className="px-4" >
            <Image 
              src="/about1.png"
              alt="Team Photo 1"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />
          </div>
          
          <div className="px-4" >
            <Image
              src="/about2.png"
              alt="Team Photo 2"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />
          </div>



          
      </div>

      <div className="numbered-blocks__wrapper ">
        <div className="numbered-blocks__container ">
          <div className="numbered-blocks__title ">
            <span>This one's for the tea drinkers</span>
            
          </div>
          <div className="main-container">
            <div className="content-container grid grid-cols-2 gap-10">
            <div className="flex-container">
            <Image className ="rectangular-image"
              src="/about3.png"
              alt="Team Photo 2"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />

            <div>
              <h4>Sourced from farms we know.</h4>
              <p>Tea grows in loads of places, but the taste can be completely different. Strange then that often the ingredients just say "100% Tea". Obvious, right? We choose origins and farms that achieve just the right taste for each blend and we put them right there on the pack.</p>
            </div>
            </div>
            
            <div className="flex-container">
              <div>
                <h4>
                Keeping it simple 
                <br/>
                Amazing Tea.  
                <br/>
                Always Rolled Whole Leaves. 
                </h4>
                <p>We wouldn't have it any other way. Leaves that look like leaves. They're big and they're tasty; kept in tact to preserve their flavour and picked by a real person at just the right time.</p>
                <Image
                  src="/about4.png"
                  alt="Team Photo 2"
                  width={351} // Match the first row image or text block width
                  height={200} // Match the first row image or text block height
                  objectFit="cover"
                  layout="responsive"
                />
              </div>
            </div>

            <div className="flex-container">
            <Image className ="rectangular-image"
              src="/about4.png"
              alt="Team Photo 2"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />

            <div>
              <h2 className="about-content-heading">Straight from us. </h2>
             
            </div>
            </div>

            <div className="flex-container">
            <Image className ="rectangular-image"
              src="/about3.png"
              alt="Team Photo 2"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />

            <div>
              <h4>Sourced from farms we know.</h4>
              <p>Tea grows in loads of places, but the taste can be completely different. Strange then that often the ingredients just say "100% Tea". Obvious, right? We choose origins and farms that achieve just the right taste for each blend and we put them right there on the pack.</p>
            </div>
            </div>

            <div className="flex-container">
            <Image className ="rectangular-image"
              src="/about3.png"
              alt="Team Photo 2"
              width={560} // Match the first row image or text block width
              height={350} // Match the first row image or text block height
              objectFit="cover"
              layout="responsive"
            />
            </div>

            <div className="flex-container">
      
              <h2 className="second-heading">To you. </h2>
              <p></p>
              <div className="about-us-content__button">
              <button>Hit the shops</button>
              </div>
            </div>
            

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutTemplate;
