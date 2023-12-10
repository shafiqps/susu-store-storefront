import React from 'react';

interface WithdrawalListProps {
  withdrawals: any[]; // Adjust the type based on your data structure
  onRemove: (index: number) => void;
  onViewDetails: (index: number) => void;
}

const WithdrawalList: React.FC<WithdrawalListProps> = ({ withdrawals, onRemove, onViewDetails }) => {
  return (
    <ul>
      {withdrawals.map((withdrawal, index) => (
        <li key={index} className="flex justify-between items-center mb-4 p-4 border rounded">
          <div>
            <h3 className="text-lg font-bold mb-2">Withdrawal #{index + 1}</h3>
            <p>Date: {withdrawal.date}</p>
            <p>Total Amount: {withdrawal.totalAmount}</p>
            <p>Balance Amount: {withdrawal.balanceAmount}</p>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={() => onViewDetails(index)} className="bg-black text-white px-4 py-2 rounded">
              View Details
            </button>
            <button onClick={() => onRemove(index)} className="text-red-500">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WithdrawalList;