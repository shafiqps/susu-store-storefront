import React, { useEffect, useState } from 'react';
import { Customer } from '@medusajs/medusa';

interface Withdrawal {
  id: string;
  created_at: string;
  total: string;
  status: string;
  reason: string;
  customer_id: string;
}

interface WithdrawalListProps {
  onViewDetails: (withdrawal: Withdrawal) => void;
  onRemove: (withdrawal: Withdrawal) => void;
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
}

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


//interface WithdrawalListProps {
  //withdrawals: any[]; // Adjust the type based on your data structure
  //onRemove: (index: number) => void;
  //onViewDetails: (index: number) => void;
//}

const WithdrawalList: React.FC<WithdrawalListProps> = ({ customer, onRemove, onViewDetails }) => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/withdrawals/customer/pending', {
          method: 'GET',
          credentials: 'include', // Ensure to send cookies if authentication is needed
        });
        if (!response.ok) {
          throw new Error('Failed to fetch withdrawals');
        }
        const data = await response.json();
        setWithdrawals(data.withdrawals);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWithdrawals();
  }, []);

  
  const handleRemove = async (withdrawalToRemove: { id: string; }) => {
    try {
      // Send DELETE request to your API endpoint
      const response = await fetch(`http://localhost:9000/store/withdrawals/${withdrawalToRemove.id}`, {
        method: 'DELETE',
        credentials: 'include', // If needed for authentication
        // Add headers if required by your API
      });

      if (!response.ok) {
        throw new Error('Failed to delete withdrawal');
      }

      // Update the state to remove the deleted withdrawal
      setWithdrawals(withdrawals.filter(withdrawal => withdrawal.id !== withdrawalToRemove.id));
    } catch (error) {
      console.error('Error:', error);
      // Optionally, handle the error in the UI, like showing a notification
    }
  };

  return (
    <div className="mt-10">
    <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '300px', overflowY: 'auto' }}>  
    {withdrawals.length === 0 ? (
    <div className="p-4 text-center">No pending withdrawals currently</div>
    ) : (
    <ul>
      {withdrawals.map((withdrawal, index) => (
        <li key={withdrawal.id} className="flex justify-between items-center mb-4 p-4 border rounded">
          <div>
            <h3 className="text-lg font-bold mb-2">Withdrawal #{index + 1}</h3>
            <p>Date: {new Date(withdrawal.created_at).toLocaleDateString()}</p>
            <p>Total Amount: RM {withdrawal.total / 100}</p>
            <p >Status: <span style={{ color: getStatusColor(withdrawal.status) }}>{withdrawal.status}</span> </p>

               
           
          </div>
          <div className="flex items-center space-x-4">
       <button onClick={() => onViewDetails(withdrawal)} className="bg-[#0ea5e9] text-white text-xs sm:text-sm px-2 sm:px-4 py-1 sm:py-2 rounded">
              View Details
            </button>
            <button onClick={() => handleRemove(withdrawal)} className="text-red-500">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
    )}
    </div>
    </div>
  );
};

export default WithdrawalList;