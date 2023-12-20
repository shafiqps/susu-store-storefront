import React, { useEffect, useState } from 'react';
interface WithdrawalTableProps {
  withdrawals: any[]; // Adjust the type based on your data structure
  onViewDetails: (index: number) => void; // Add this prop
}

interface Withdrawal {
  created_at: string;
  total: number;
  balanceAmount: number;

}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({ withdrawals, onViewDetails }) => {
  const [pastWithdrawals, setPastWithdrawals] = useState<Withdrawal[]>([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/withdrawals/customer/completed');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const withdrawals = data.withdrawals.map((item: any) => ({
          created_at: item.created_at,
          total: item.total
        }));
        setPastWithdrawals(data); // Assuming the response is an array of withdrawals
      } catch (error) {
        console.error('Error fetching withdrawals:', error);
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
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Balance Amount</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody>
        {pastWithdrawals.map((withdrawal, index) => (
        
          <tr
            key={index}
            className="transition-all hover:bg-gray-100 cursor-pointer"
            onClick={() => onViewDetails(index)}
          >
            {/* Display past withdrawal details */}
            {/* Adjust columns based on your data structure */}
            <td className="py-2 px-4 border-b">{withdrawal.created_at}</td>
            <td className="py-2 px-4 border-b">${withdrawal.total}</td>
            <td className="py-2 px-4 border-b">${withdrawal.balanceAmount}</td>
            <td className="py-2 px-4 border-b">
              <button
                className="text-[#0284c7] hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(index);
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