import React, { useEffect, useState } from 'react';

interface WithdrawalFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  withdrawalReason: string;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ onSubmit }) => {
  const [withdrawalForm, setWithdrawalForm] = useState<FormData>({
    withdrawalReason: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show loading spinner or indicator here if needed

    // Simulate an asynchronous request (replace with actual logic)
    setTimeout(() => {
      onSubmit(withdrawalForm);
      setWithdrawalForm({ withdrawalReason: '' });
      // Hide loading spinner or indicator here if needed
    }, 1000); // Simulated delay for demonstration
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Request</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Withdrawal Reason</label>
        <input
          type="text"
          name="withdrawalReason"
          value={withdrawalForm.withdrawalReason || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button type="submit" className="text-white px-4 py-2 rounded bg-black">
        Submit Request
      </button>
    </form>
  );
};

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

interface WithdrawalTableProps {
  withdrawals: any[]; // Adjust the type based on your data structure
  onViewDetails: (index: number) => void;
}

const WithdrawalTable: React.FC<WithdrawalTableProps> = ({ withdrawals, onViewDetails }) => {


  return (
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
      {withdrawals.map((withdrawal, index) => (
      
        <tr
          key={index}
          className="transition-all hover:bg-gray-100 cursor-pointer"
          onClick={() => onViewDetails(index)}
        >
          {/* Display past withdrawal details */}
          {/* Adjust columns based on your data structure */}
          <td className="py-2 px-4 border-b">{withdrawal.created_at}</td>
          <td className="py-2 px-4 border-b">${withdrawal.total}</td>
          <td className="py-2 px-4 border-b">${withdrawal.status}</td>
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
  );
};

export { WithdrawalForm, WithdrawalList, WithdrawalTable };