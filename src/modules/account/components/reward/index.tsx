import React from 'react';
import Image from 'next/image';

interface Reward {
  id: number;
  image: string;
  caption: string;
  details: string;
  price: number;
}

interface RewardCardProps {
  reward: Reward;
  onRedeem: () => void;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward, onRedeem }) => {
  return (
    <div className="border p-4 rounded-md">
      <Image
        src={reward.image || "/shop.png"}
        alt={reward.caption}
        width={500}
        height={300}
      />

      <h2 className="text-lg font-semibold mb-2 font-sans">{reward.caption}</h2>
      <p className="text-gray-700 mb-2 font-sans">{reward.details}</p>
      <p className="text-gray-600 font-sans">Required Points: {reward.price/100}</p>

      <button onClick={onRedeem} className="bg-sky-400 text-white px-4 py-2 rounded-md mt-2">
        Redeem
      </button>
    </div>
  );
};

export default RewardCard