
"use client"
import { useFeaturedProductsQuery } from "@lib/hooks/use-layout-data";
import Image from "next/image";

const SuffycoinsTemplate = () => {
    const { data } = useFeaturedProductsQuery()
    const rewardSteps = [
        {
          defaultImg: "/step1.png", // Replace with your default image path
          hoverImg: "/signup.png",
          defaultImg2: "/step2.png", // Replace with your default image path
          hoverImg2: "/signup.png", 
          defaultImg3: "/step1.png", // Replace with your default image path
          hoverImg3: "/signup.png", 
          defaultImg4: "/step2.png", // Replace with your default image path
          hoverImg4: "/signup.png",  // Replace with your hover image path
          amount: "50 SUFFY COINS",
          description: "When you create an account",
        },
        // ... Add other reward steps here
      ];
    const featuredSteps = [
        {
          title: "SIGN UP",
          description: "Setup an account with us, we'll give you 50 Suffy Coins. No catch.",
          imageUrl: "/form.png", // Replace with your image path
        },
        {
          title: "EARN SUFFY COINS",
          description: "You earn every time you spend. You get 1 Suffy Coin for every RM1 you spend.",
          imageUrl: "/coin.png", // Replace with your image path
        },
        {
          title: "SPEND SUFFY COINS",
          description: "Use your Coins at checkout to get money off your order, including your subscription.",
          imageUrl: "/shop.png", // Replace with your image path
        }
      ];
    const featuredProduct = {
      title: "Oh Christmas Tea & Seriously Limited Edition",
      description: "A festive and warming cup of tea. These bright blends will see you through films, fights with wrapping paper, bauble re-threading and every morning after. Blends of Christmas past are returning for a very limited time only. Grab your favourites from last year's Tasting Club while you can. Once they're gone, they're gone.",
      imageUrl: "/form.png",
      imageUrl1: "/coin.png",
      imageUrl2: "/shop.png", // Replace with your image path
    };
  return (
    <div className="grid w-full">
    <div className="grid justify-center relative w-full">
      {/* Existing Hero Section */}
      <div className="w-full grid justify-center p-8">
          <h2 className="third-h1 grid justify-center font-bold mb-2">Suffy Coins</h2>
          <p className="text-xl grid justify-center mb-2"> ★★★★★ 469 Agents</p>
          <p className="description grid justify-center ">
          Suffy Coins are our way of saying thanks for being a loyal customer.
          </p>
          <p className="description grid justify-center ">
          Order. Get coins. Refer a friend. Get coins. Follow us on social. Get coins.
          </p>
          <p className="description grid justify-center ">
          Use them a few at a time for a discount or save them up for an even bigger splurge.
          </p>
          <div className="flex justify-center mb-4">
          <button className="fifth-heading p-5 m-2 bg-blue-300 bg-black text-black py-5 px-12 rounded-full">Sign Up</button>
          <button className="fifth-heading p-5 m-2 bg-black bg-opacity-4 text-white py-5 px-12 rounded-full">Sign In</button>
          </div>
        </div>

    </div>
    <div className="grid w-full justify-center bg-blue-300 bg-opacity-4 p-8">
    <h2 className="grid w-full third-h1 justify-center font-bold mb-2">How It Works</h2>
          {/* Image Column */}
          
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
  {featuredSteps.map((step, index) => (
    <div key={index} className="grid w-full text-center p-4">
      <img src={step.imageUrl} alt={step.title} className="w-32 h-32 mb-4 mx-auto block" />
      <h2 className="third-heading text-black mb-2">
        {step.title}
      </h2>
      <p className="description">
        {step.description}
      </p>
    </div>
    
  ))}
  
</div>

        </div>
        <div className="text-center py-8">
  <h2 className="third-h1 font-bold mb-2">Earn More Suffy Coins</h2>
  <div className="flex justify-center">
    {rewardSteps.map((step, index) => (
      // The key should be on the topmost element inside the map function
      <div key={index} className="hover-effect-group flex flex-row items-center justify-center">
        {/* Individual image container */}
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg2})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg2})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg3})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg3})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg4})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg4})` }}></div>
        </div>
        {/* ... other images ... */}
        {/* Make sure to add the hover effect CSS */}
      </div>
      
    ))}
    
  </div>
  <div className="flex justify-center">
    {rewardSteps.map((step, index) => (
      // The key should be on the topmost element inside the map function
      <div key={index} className="hover-effect-group flex flex-row items-center justify-center">
        {/* Individual image container */}
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg2})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg2})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg3})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg3})` }}></div>
        </div>
        <div className="bg-cover" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.defaultImg4})` }}>
          {/* Hover image is preloaded but hidden; it's shown on hover using CSS */}
          <div className="hover-img bg-cover bg-center" style={{ width: '150px', height: '150px', backgroundImage: `url(${step.hoverImg4})` }}></div>
        </div>
        {/* ... other images ... */}
        {/* Make sure to add the hover effect CSS */}
      </div>
      
    ))}
    
  </div>
  
</div>
<div className="spend-brew-coins-container text-center py-8">
  <h2 className="third-h1 font-bold mb-2">How To Spend Suffy Coins</h2>
  <p className="description mb-4">At the final stage of checkout you can apply as many or as few Brew Coins as you like.</p>
  <hr className="my-4" />
  <p className="third-heading font-bold text-black ">10 Suffy Coin = RM 1</p>
  <hr className="my-4" />
</div>
<div className="vip-tiers-container text-center py-8 bg-blue-300">
  <h2 className="third-h1 font-bold mb-8">VIP Tiers</h2>
  <div className="tier-grid grid grid-cols-3 gap-8">
    <div className="tier-item">
      <div className="tier-circle border-2 border-black rounded-full w-24 h-24 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold">BRONZE</h3>
      <p className="text-lg mb-2">SPEND RM0+</p>
      <p className="text-sm">Coming soon</p>
    </div>
    <div className="tier-item">
      <div className="tier-circle border-2 border-black rounded-full w-24 h-24 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold">SILVER</h3>
      <p className="text-lg mb-2">SPEND RM100+</p>
      <p className="text-sm">Coming soon</p>
    </div>
    <div className="tier-item">
      <div className="tier-circle border-2 border-black rounded-full w-24 h-24 mx-auto mb-4"></div>
      <h3 className="text-xl font-semibold">GOLD</h3>
      <p className="text-lg mb-2">SPEND RM200+</p>
      <p className="text-sm">Coming soon</p>
    </div>
  </div>
</div>
      </div>

          
          
        
    
  );
};

export default SuffycoinsTemplate;
