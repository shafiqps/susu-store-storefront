import { Customer, Order } from "@medusajs/medusa"
import React, { useEffect, useRef, useState } from 'react';
import Tree from 'react-d3-tree';
import { LuMilk } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";

type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
};

const getTotalLoyaltyPoints = (orders: Order[] | undefined): number => {
  if (!orders) {
    return 0;
  }

  return orders.reduce((total, order) => {
    return total + (order.loyaltyPoints || 0);
  }, 0);
};

// For Nodes (emails)
type Referral = {
  id: string;
  email: string;
  loyaltyPoints: number;
  first_name: string;
  last_name: string;
  totalOrders: number;
  created_at: Date;
  totalProfitShare: number;
  referrals?: Referral[]; 
};

// The toggleNode function typically takes a node data argument and toggles its state
type ToggleNodeFunction = (nodeData: TreeNodeDatum) => void;

// For Node informations (icon)
interface TreeNodeDatum {
  children: TreeNodeDatum[];
  email?: string;
  loyaltyPoints: number;
  id: string;
  first_name: string;
  last_name: string;
  orders?: Order[];
  totalOrders: number;
  created_at:Date;
  totalProfitShare: number;
  isRoot?: boolean;
}


const convertToTreeStructure = (referrals: Referral[], rootCustomer?: Omit<Customer, "password_hash">): TreeNodeDatum[] => {
  return referrals.map(referral => {
    const isRootNode = rootCustomer && referral.email === rootCustomer.email;
    const node: TreeNodeDatum = {
      email: referral.email,
      id: referral.id,
      loyaltyPoints: referral.loyaltyPoints,
      first_name: referral.first_name,
      last_name: referral.last_name,
      totalOrders: referral.totalOrders,
      created_at: referral.created_at,
      totalProfitShare: referral.totalProfitShare,
      children: referral.referrals ? convertToTreeStructure(referral.referrals) : [],
      isRoot: isRootNode,
      
    };    
    if (rootCustomer && referral.email === rootCustomer.email) {
        node.first_name = rootCustomer.first_name;
        node.last_name = rootCustomer.last_name;
       
    }
    
    return node;
    
  });
};

interface ModalProps {
  node: TreeNodeDatum; // Use the NodeData type for the node
  onClose: () => void;
   // Define the type for the onClose function
}

interface RenderRectSvgNodeProps {
  nodeDatum: TreeNodeDatum;
  toggleNode?: ToggleNodeFunction; 
  onIconClick: (node: TreeNodeDatum) => void;
}


const Modal: React.FC<ModalProps> = ({ node, onClose})  => {
 const totalPoints = getTotalLoyaltyPoints(node.orders); 
  if (!node) return null; // If no node is selected, don't display the modal
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="text-xl-semi">User Information</h2>
        <p className="text-gray-600">UserName: <span className="text-black font-medium">{node.first_name +" "+ node.last_name}</span></p>
        <p className="text-gray-600">Total Orders: <span className="text-black font-medium">{node.totalOrders || 0}</span></p>
        <p className="text-gray-600">Total Commissions: RM <span className="text-black font-medium">{node.loyaltyPoints || 0}</span></p>
        <p className="text-gray-600">Date Joined:  <span className="text-black font-medium">{node.created_at}</span></p>
        <p className="text-gray-600">Total Profit Sharing Amount: <span className="text-black font-medium">{node.totalProfitShare || 0}%</span></p>

        <button className="fifth-heading w-auto m-2 bg-sky-400 bg-opacity-4 py-2 px-4 rounded-full " onClick={onClose}>Close</button>
      </div>
    </div>
  );
};


const RectSvgNode: React.FC<RenderRectSvgNodeProps & { onIconClick: (node: TreeNodeDatum) => void, isRootNode?: boolean }> = ({
  nodeDatum,
  toggleNode,
  onIconClick,
  isRootNode // this prop indicates if the node is the root
}) => {

  const iconSize = 50; // Size of the icon
  const translateY = -iconSize / 2; // Vertically center align
  const translateX = -iconSize / 2; // Horizontally center align
  const textOffset = 10; 
  const iconGap = 20; 
  const additionalIconSize = 20;
  const iconTextYOffset = iconSize / 2;
  const textYOffset = 10; // Approximate height of the text, adjust as needed
  const additionalIconsYOffset = iconTextYOffset + textYOffset;
  const shadowFilterId = 'shadow-filter';
  const circleRadius = iconSize / 2 + 5;
;
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
      <text style={textStyle} x={iconSize + textOffset} dy="1.2em">{nodeDatum.email}</text>  
      {/* Additional icons group */}
      <g transform={`translate(0, ${additionalIconsYOffset})`}>
        {/* User icon */}
        <FaUser
          onClick={() => onIconClick(nodeDatum)}
          size={`${additionalIconSize}px`}
          x={iconSize + textOffset}
          style={{ fill: '#0369a1' }}
        />
      </g>
      {isRootNode && (
      <g transform={`translate(0, ${additionalIconsYOffset})`}>
        {/* User icon */}
        <FaCrown
          onClick={() => onIconClick(nodeDatum)}
          size={`${additionalIconSize}px`}
          x={iconSize + textOffset + iconGap}
          style={{ fill: '#facc15' }}
        />
      </g>
       )}
    </g>
  );
};


const Membership: React.FC<OverviewProps> = ({ customer }) => {
  const [treeData, setTreeData] = useState<any>();
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeNodeDatum | null>(null);

  useEffect(() => {
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

    fetchReferralTree()
      .then(data => {
        if (data && Array.isArray(data)) {
          const rootName = customer?.email || "Root";
          const treeStructure = [{
            email: rootName, 
            id: "rootID",
            first_name: customer?.first_name,
            last_name: customer?.last_name,
            loyaltyPoints: customer?.loyaltyPoints,
            totalOrders: customer?.totalOrders,
            created_at: customer?.created_at,
            totalProfitShare: customer?.totalProfitShare,
            children: convertToTreeStructure(data, customer),
          
          }];
          
          setTreeData(treeStructure); // Set the tree data
          setTranslate({ x: 320, y: 50});

        }
      })
      .catch(error => {
        console.error('Failed to fetch referral tree:', error);
      });
  },[customer]);

  const handleIconClick = (node: TreeNodeDatum) => {
    setSelectedNode(node);
    const ordersForNode: Order[] = []; // Replace with actual orders for the node
  };

  const handleCloseModal = () => {
    setSelectedNode(null); // Hide the modal
  };
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
                      renderCustomNodeElement={(rd) => (
                        <RectSvgNode 
                          {...rd} 
                          onIconClick={handleIconClick} 
                        
                        />
                      )}                
                      separation={{ 
                         siblings: 2,
                         nonSiblings: 2 }}
                      translate={translate}
                      />
                      
                  </div>
                      )}
                      {selectedNode && (
                     <Modal node={selectedNode} onClose={handleCloseModal} />
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
