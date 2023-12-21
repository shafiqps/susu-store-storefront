import { Customer } from "@medusajs/medusa"

import React, { useState } from 'react';



interface WithdrawalFormProps {
  onSubmit: (formData: FormData) => void;
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
}

interface FormData {
  total: number;
  customer_id: string | undefined;
  withdrawalReason: string;
}

const WithdrawalForm: React.FC<WithdrawalFormProps> = ({ onSubmit, customer }) => {
  const [withdrawalForm, setWithdrawalForm] = useState<FormData>({
    total: 0,
    customer_id: "", // This could be set based on the logged-in user or another source
    withdrawalReason: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // If the input change is for 'total', convert the value to a number
    if (name === "total") {
      setWithdrawalForm((prevForm) => ({
        ...prevForm,
        [name]: Number(value),
      }));
    } else {
      setWithdrawalForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:9000/store/withdrawals', { // Adjust the API URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
<<<<<<< HEAD
          total: Math.round(withdrawalForm.total * 100 ),
=======
          total: Math.round(withdrawalForm.total*100),
>>>>>>> 801dd7f0e596ad21b36a9e9971c1862f7a5a8c4d
          customer_id: customer?.id,
          reason: withdrawalForm.withdrawalReason
          // Include other necessary fields
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create withdrawal');
      }

      const result = await response.json();
      console.log('Withdrawal created:', result);

      // Clear the form after submission
      setWithdrawalForm({ total: 0, customer_id: '', withdrawalReason: '' });
    } catch (error) {
      console.error('Error submitting withdrawal:', error);
    }
  };

  return (
<<<<<<< HEAD
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Request</h2>
      <div className="mb-4">
        <p className="block text-sm font-bold mb-2">Withdrawal Reason</p>
=======
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded bg-white">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Request</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Withdrawal Reason</label>
>>>>>>> 801dd7f0e596ad21b36a9e9971c1862f7a5a8c4d
        <input
          type="text"
          name="withdrawalReason"
          value={withdrawalForm.withdrawalReason || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <label className="block text-sm font-bold mb-2">Withdrawal Amount</label>
        <input
          type="number"
          name="total"
          value={withdrawalForm.total}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

{/* Add an input field for customer_id if necessary */}


      </div>

      <button type="submit" className="text-white px-4 py-2 rounded bg-black">
        Submit Request
      </button>
    </form>
  );
};
export default WithdrawalForm;