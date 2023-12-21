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

interface WithdrawalTableProps {
  onViewDetails: (withdrawal: Withdrawal) => void;
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

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({ customer ,onViewDetails }) => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/withdrawals/customer/completed', {
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

  return (
    <div className="mt-5">
      <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '300px', overflowY: 'auto' }}> 
        <table className="min-w-full">
          <thead className='bg-sky-400'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Total Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal, index) => (
              <tr
                key={withdrawal.id}
                className="transition-all hover:bg-gray-100 cursor-pointer"
                onClick={() => onViewDetails(withdrawal)}
              >
                <td className="py-2 px-4 border-b">{new Date(withdrawal.created_at).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">RM {withdrawal.total}</td>
                <td className="py-2 px-4 border-b"><span style={{ color: getStatusColor(withdrawal.status) }}>{withdrawal.status}</span></td>
                <td className="py-2 px-4 border-b">

                  <button
                    className="text-[#0284c7] hover:underline"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the row click event
                      onViewDetails(withdrawal);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WithdrawalTable;
