"use client"
import React from 'react';
import Link from 'next/link';
import RewardCard from "../components/reward"

const RewardTemplate: React.FC = () => {
  const isAdmin = true;

  if (!isAdmin) {
    return <div>You do not have access to this page.</div>;
  }

  const rewards = [
    {
      id: 1,
      photo: 'BULK 15.3.jpg',
      caption: 'Reward 1',
      details: 'Details about Reward 1',
      requiredPoints: 100,
    },
    {
      id: 2,
      photo: '9.3.jpg',
      caption: 'Reward 2',
      details: 'Details about Reward 2',
      requiredPoints: 150,
    },
    {
      id: 3,
      photo: '12.4.jpg',
      caption: 'Reward 3',
      details: 'Details about Reward 3',
      requiredPoints: 200,
    },

  ];

  const handleRedeem = (rewardId: number) => {
   // console.log("Redeem reward with ID:" ${rewardId});
  };

  const handleHistory = () => {
    // Implement history logic here
    console.log('View redemption history');
  };

  return (
    <div>
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
            <RewardCard key={reward.id} reward={reward} onRedeem={() => handleRedeem(reward.id)} />
          ))}
        </div>


    </div>
  </div>
  );
};

export default RewardTemplate;