// components/WithdrawalForm.tsx

import React, { useState } from 'react';



interface WithdrawalFormProps {
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  withdrawalReason: string; // Descriptive name for the field
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
      // Clear the form after submission
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

export default WithdrawalForm;


