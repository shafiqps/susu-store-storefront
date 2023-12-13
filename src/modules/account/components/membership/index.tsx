import { Customer, Order } from "@medusajs/medusa"
import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { LuMilk } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { MdInfo } from "react-icons/md";

type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
};

type Referral = {
  id: string;
  email: string;
  referrals?: Referral[]; // This makes the 'referrals' property recursive
};

async function fetchReferralTree() {
  try {
    const response = await fetch('http://localhost:9000/store/customers-metadata', {
      method: 'GET',
      credentials: 'include', // Ensure to send cookies if authentication is needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This will be the list of referred customers
  } catch (error) {
    console.error('Error fetching referral tree:', error);
  }
}

const convertToTreeStructure = (referrals: Referral[]): any => {
  return referrals.map(referral => {
    const node: any = { name: referral.email };
    if (referral.referrals && referral.referrals.length > 0) {
      node.children = convertToTreeStructure(referral.referrals); // Only add 'children' if there are child referrals
    }
    return node;
  });
};


interface TreeNodeDatum {
  name: string;
  // Add other properties that are relevant to your data structure
}

// The toggleNode function typically takes a node data argument and toggles its state
type ToggleNodeFunction = (nodeData: TreeNodeDatum) => void;

interface RenderRectSvgNodeProps {
  nodeDatum: TreeNodeDatum;
  toggleNode?: ToggleNodeFunction; // This might be optional depending on how react-d3-tree works
}

const renderRectSvgNode = ({ nodeDatum, toggleNode }: RenderRectSvgNodeProps) => {
  // Adjust the position of the icon and text here
  // You might need to fine-tune the 'transform' property based on your exact icon size and desired placement
  const iconSize = 50; // Size of the icon
  const translateY = -iconSize / 2; // Vertically center align
  const translateX = -iconSize / 2; // Horizontally center align
  const textOffset = 10; 
  const additionalIconSize = 20;
  const iconGap = 10; // 
  const iconTextYOffset = iconSize / 2;
  const textYOffset = 10; // Approximate height of the text, adjust as needed
  const additionalIconsYOffset = iconTextYOffset + textYOffset;

  const textStyle = {
    fill: "black",
    strokeWidth: 0, // Ensure text is not "bold" due to stroke
    fontSize: "20px", // Specify the font size for consistency
    fontFamily: "Maven Pro", // Specify the font family
  };

  const iconStyle = {
    color: 'white',        // Set the color of the icon
    backgroundColor: 'white', // Set the background color of the icon
    borderRadius: '50%',
  // Optional: if you want the icon background to be circular        // Optional: if you want some space between the icon and background
  };

  const shadowFilterId = 'shadow-filter';
  const circleRadius = iconSize / 2 + 5;

  const circleBackgroundStyle = {
    stroke: 'white',
    filter: `url(#${shadowFilterId})`, // Set the fill of the circle background
    // Add any other style properties you wish to apply to the background
  };

  return (
    <g transform={`translate(${translateX},${translateY})`}>

    <defs>
        <filter id={shadowFilterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" /> {/* Increase stdDeviation for a larger blur */}
          <feOffset dx="2" dy="2" result="offsetblur" /> {/* Adjust dx and dy for the offset of the shadow */}
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.2"/> {/* Adjust slope for transparency */}
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode /> {/* this contains the offset blurred image */}
            <feMergeNode in="SourceGraphic" /> {/* this contains the element that the filter is applied to */}
          </feMerge>
        </filter>
      </defs>

      <circle cx={iconSize / 2} cy={iconSize / 2} r={circleRadius}  fill="#38bdf8"   style={circleBackgroundStyle }/>
      <LuMilk style={iconStyle} size={`${iconSize}px`} onClick={() => toggleNode && toggleNode(nodeDatum)} />
      <text style={textStyle} x={iconSize + textOffset} dy="1.2em">{nodeDatum.name}</text>  
      {/* Additional icons group */}
      <g transform={`translate(0, ${additionalIconsYOffset})`}>
        {/* User icon */}
        <FaUser
          size={`${additionalIconSize}px`}
          x={iconSize + textOffset}
          style={{ fill: '#0369a1' }}
        />
        {/* Info icon, positioned next to the User icon */}
        <MdInfo
          size={`${additionalIconSize}px`}
          x={iconSize + iconTextYOffset + iconGap}
          style={{ fill: '#0369a1' }}
        />
      </g>
    </g>
  );
};


const Membership = ({customer }: OverviewProps) => {
  const [treeData, setTreeData] = useState<any>();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  
 

  useEffect(() => {
    fetchReferralTree()
      .then(data => {
        if (data && Array.isArray(data)) {
          const rootName = customer?.email || "Root";
          console.log(rootName);
          const treeStructure = [{
            name: rootName, // You can name this whatever is appropriate
            children: convertToTreeStructure(data)
          }];
          setTreeData(treeStructure); // Set the tree data
          setTranslate({ x: 320, y: 50});
        }
      })
      .catch(error => {
        console.error('Failed to fetch referral tree:', error);
      });
  }, []);
  return (
    <div className="w-full">
    <div className="mb-8 flex flex-col gap-y-4">
      <h1 className="text-2xl-semi">Membership</h1>
      <p className="text-base-regular">
        View and update your profile information, including your name, email,
        and phone number. You can also update your billing address, or change
        your password.
      </p>
      <div className="flex flex-col justify-center items-center">
        <div className="container mx-auto text-center pt-10">
          <div className="items-center justify-center flex">
            <div className="text-center">
              <div className="flex flex-col justify-center items-center">
              <h3 className="text-large-semi">My Referrals</h3>
              <div className="treeWrapper">
                
                {treeData && ( 
                  <div style={{ width: '40em', height: '30em',  }}>   
                      <Tree  
                      data={treeData} 
                      pathFunc="step" 
                      orientation="vertical" 
                      renderCustomNodeElement={renderRectSvgNode} 
                      separation={{ 
                         siblings: 2,
                         nonSiblings: 2 }}
                      translate={translate}
                      />
                  </div>
                  )}
                 
              </div>
               </div>
              
            </div>     
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}


export default Membership
