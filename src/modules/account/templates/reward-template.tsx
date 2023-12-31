"use client"
import React from 'react';
import Link from 'next/link';
import RewardCard from "../components/reward"
import { useEffect, useState } from 'react';
import { useCustomerOrders, useMeCustomer } from "medusa-react"

type Reedem = {
  id: string;
  created_at: string;
  updated_at: string;
  rewards_id: string;
  status: string;
  customer_id: string;
  rewards: Rewards;

}

type Rewards = {
  id: string;
  created_at: string;
  updated_at: string;
  price: string;
  image: string;
  details: string;
  caption: string;
};

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "#eab308";
    case "approved":
      return "#65a30d";
    case "rejected":
      return "red";
    default:
      return "inherit"; // or any default color
  }
}

const RewardTemplate: React.FC = () => {
  const [rewards, setRewards] = useState([]); // Initialize state for rewards
  const { customer } = useMeCustomer()
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [redemptionHistory, setRedemptionHistory] = useState<Reedem[]>([]);


  useEffect(() => {
    // Function to fetch rewards from the API
    const fetchRewards = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/rewards'); // Adjust the URL to your API endpoint
        const data = await response.json();
        setRewards(data); // Update state with the fetched rewards
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchRewards();
    
    
    
    // Call the function to fetch rewards
  }, []); // Empty dependency array to run only on component mount

  const handleRedeem = async (rewardId, total) => {
    if (customer.loyaltyPoints < total) {
      setNotification({ message: 'You dont have enough to redeem this reward.', type: 'error' });

      return;
    }
    console.log(rewardId)
    console.log(customer.id)
    try {
      const response = await fetch('http://localhost:9000/store/redeems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_id: customer?.id,
          rewards_id: rewardId,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to redeem reward');
      }
      setNotification({ message: 'Reward successfully redeemed!', type: 'success' });

      const result = await response.json();
      console.log('Reward redeemed:', result);
    } catch (error) {
      console.error('Error redeeming reward:', error);
    }
  };


  const handleShowHistory = async () => {
    try {
      const response = await fetch('http://localhost:9000/store/redeems/byId', {
        method: 'GET',
        credentials: 'include', // Ensure to send cookies if authentication is needed
      }); // Remove the POST method and body if it's a GET request

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setRedemptionHistory(data.redeems);
      setShowHistoryModal(true);
      console.log(data);
    } catch (error) {
      console.error('Error fetching redemption history:', error);
      
    }
    
  };
  

 

  return (
    <div>
      {notification.message && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
    <div className="small:block">
    <div className="p-4"> 
        <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Rewards</h1>
          <p className="text-base-regular">
          Browse and redeem your available rewards. Explore the details of each reward and use your accumulated points to claim the benefits you've earned.
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
      
        <button onClick={handleShowHistory} className="bg-sky-400 text-white px-4 py-2 rounded-md">
          History Redemption
        </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} onRedeem={() => handleRedeem(reward.id, reward.price)} />
          ))}
        </div>


    </div>
          {showHistoryModal && (
        <div className="modal-history">
          
          <div className="modal-content">
          <h2 className="text-2xl font-bold mb-2">Redemption History</h2>
          <div className="mt-5 shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '600px', overflowY: 'auto' }}>
            
            <table className="min-w-full">
              <thead className='bg-sky-400'>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rewards</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Required Points</th>
                </tr>
              </thead>
              <tbody>
                {redemptionHistory.map((redeem) => (
                  <tr key={redeem.id}>
                    <td className="py-2 px-4 border-b">{redeem.rewards.caption}</td>
                    <td className="py-2 px-4 border-b">{new Date(redeem.created_at).toLocaleString()}</td>
                    <td className="py-2 px-4 border-b"><span style={{ color: getStatusColor(redeem.status) }}>{redeem.status}</span></td>
                    <td className="py-2 px-4 border-b">{redeem.rewards.price/100}</td>
                  </tr>
                ))}
              </tbody>
            </table>
           
            </div>
            <div className="flex justify-center mt-4">
              <button onClick={() => setShowHistoryModal(false)} className="fifth-heading bg-sky-400 py-2 px-4 rounded-full">
                Close
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  </div>
  
  );
};




export default RewardTemplate;