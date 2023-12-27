"use client"
import React from 'react';
import Link from 'next/link';
import RewardCard from "../components/reward"
import { useEffect, useState } from 'react';
import { useCustomerOrders, useMeCustomer } from "medusa-react"

const RewardTemplate: React.FC = () => {
  const [rewards, setRewards] = useState([]); // Initialize state for rewards
  const { customer } = useMeCustomer()
  const [notification, setNotification] = useState({ message: '', type: '' });

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

    fetchRewards(); // Call the function to fetch rewards
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

  const handleHistory = () => {
    // Implement history logic here
    console.log('View redemption history');
  };

  return (
    <div>
      {notification.message && (
        <div className={`notification ${notification.type}`}>{notification.message}</div>
      )}
    <div className="small:block">
 
        <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Rewards</h1>
          <p className="text-base-regular">
          Browse and redeem your available rewards. Explore the details of each reward and use your accumulated points to claim the benefits you've earned.
          </p>
        </div>
        <div className="flex justify-between items-center mb-4">
      
          <button onClick={handleHistory} className="bg-sky-400 text-white px-4 py-2 rounded-md">
            History Redemption
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <RewardCard key={reward.id} reward={reward} onRedeem={() => handleRedeem(reward.id, reward.price)} />
          ))}
        </div>


    </div>
  </div>
  );
};

export default RewardTemplate;