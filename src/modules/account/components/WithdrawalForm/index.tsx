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
          total: Math.round(withdrawalForm.total * 100 ),
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
    <form onSubmit={handleSubmit} className="mb-4 p-4 border rounded-lg bg-white shadow">
      <h2 className="text-2xl font-bold mb-4">Withdrawal Request</h2>
      <div className="mb-4">
        <p className="block text-sm font-bold mb-2">Withdrawal Reason</p>
        <input
          type="text"
          name="withdrawalReason"
          value={withdrawalForm.withdrawalReason || ''}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
        <p className="block text-sm font-bold mt-4">Withdrawal Amount</p>
        <input
          type="number"
          name="total"
          value={withdrawalForm.total}
          onChange={handleInputChange}
          className="w-full border border-gray-300 p-2 rounded"
        />

{/* Add an input field for customer_id if necessary */}


      </div>

      <button type="submit" className="text-white px-4 py-2 rounded bg-[#0ea5e9]">
        Submit Request
      </button>
    </form>
  );
};
export default WithdrawalForm;