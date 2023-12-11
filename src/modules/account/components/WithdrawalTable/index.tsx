import React from 'react';

interface WithdrawalTableProps {
  withdrawals: any[]; // Adjust the type based on your data structure
  onViewDetails: (index: number) => void; // Add this prop
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({ withdrawals, onViewDetails }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b text-left">Date</th>
          <th className="py-2 px-4 border-b text-left">Total Amount</th>
          <th className="py-2 px-4 border-b text-left">Balance Amount</th>
          <th className="py-2 px-4 border-b text-left">Action</th>
        </tr>
      </thead>
      <tbody>
        {withdrawals.map((withdrawal, index) => (
          <tr
            key={index}
            className="transition-all hover:bg-gray-100 cursor-pointer"
            onClick={() => onViewDetails(index)}
          >
            {/* Display past withdrawal details */}
            {/* Adjust columns based on your data structure */}
            <td className="py-2 px-4 border-b">{withdrawal.date}</td>
            <td className="py-2 px-4 border-b">${withdrawal.totalAmount.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">${withdrawal.balanceAmount.toFixed(2)}</td>
            <td className="py-2 px-4 border-b">
              <button
                className="text-blue-500 hover:underline"
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
  );
};

export default WithdrawalTable;