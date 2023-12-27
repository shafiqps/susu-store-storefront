import { Customer } from "@medusajs/medusa"

import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";



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
  const [showPopup, setShowPopup] = useState(false);

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

    //if (withdrawalForm.total > (customer?.loyaltyPoints)) {
      //alert("Withdrawal amount cannot exceed loyalty points.");
      //return;
    //}
  
    const isConfirmed = window.confirm("Are you sure you want to submit this request?");

    if (isConfirmed) {
    try {
      const response = await fetch('http://localhost:9000/store/withdrawals', { // Adjust the API URL as needed
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          total: Math.round(withdrawalForm.total*100),
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
      localStorage.setItem('showPopup', 'true');
      window.location.reload();
   

    } catch (error) {
      console.error('Error submitting withdrawal:', error);
    }

    } else {
      // If user cancels, you can optionally perform some action here
      console.log("Submission cancelled by the user.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem('showPopup') === 'true') {
      setShowPopup(true);
  
      // Remove the item from local storage
      localStorage.removeItem('showPopup');
  
      // Optionally, hide the popup after a few seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 4000); // 4 seconds
    }
  }, []);
  



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
          required
        />
        <p className="block text-sm font-bold mt-4">Withdrawal Amount</p>
        <input
          type="number"
          name="total"
          value={withdrawalForm.total}
          onChange={handleInputChange}
          
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

{/* Add an input field for customer_id if necessary */}


      </div>

      <button type="submit" className="text-white px-4 py-2 mb-6 rounded bg-[#0ea5e9]">
        Submit Request
      </button>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
          <div className="checkmark-container">
             <FaCheck className="checkmark"/>
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        
          </div>
            <p>Request has been submitted!</p>
          </div>
        </div>
      )}

 
    </form>
    
    

    
  );
};
export default WithdrawalForm;