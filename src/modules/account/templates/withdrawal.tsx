"use client"

import React, { useState, useEffect } from 'react';
import { useCustomerOrders, useMeCustomer } from "medusa-react"

import WithdrawalForm from "@modules/account/components/WithdrawalForm"
import WithdrawalList from "@modules/account/components/WithdrawalList"
import WithdrawalTable from "@modules/account/components/WithdrawalTable"


const WithdrawalsPage: React.FC = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Withdrawal[]>([]);
  const [pastWithdrawals, setPastWithdrawals] = useState<Withdrawal[]>([]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);
  const { customer } = useMeCustomer();

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const pendingRes = await fetch('http://localhost:9000/store/withdrawals/customer/pending', {
          method: 'GET',
          credentials: 'include', // Ensure to send cookies if authentication is needed
        });
        const pastRes = await fetch('http://localhost:9000/store/withdrawals/customer/completed', {
          method: 'GET',
          credentials: 'include', // Ensure to send cookies if authentication is needed
        });
        if (!pendingRes.ok || !pastRes.ok) {
          throw new Error('Failed to fetch withdrawals');
        }
        const pendingData = await pendingRes.json();
        const pastData = await pastRes.json();
        setPendingWithdrawals(pendingData.withdrawals); // Access the 'withdrawals' property
        setPastWithdrawals(pastData.withdrawals); // Access the 'withdrawals' property
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchWithdrawals();
  }, []);

  const handleWithdrawalFormSubmit = (formData: any) => {
    // Logic to handle form submission and update state
  };

  const handleRemovePendingWithdrawal = (index: number) => {
    // Logic to remove pending withdrawal and update state
    setPendingWithdrawals((prevWithdrawals) => [
      ...prevWithdrawals.slice(0, index),
      ...prevWithdrawals.slice(index + 1),
    ]);
  };

  const handleViewDetails = (index: number, isPast: boolean) => {
    // Logic to set the selected withdrawal and show details
    setSelectedWithdrawal(isPast ? pastWithdrawals[index] : pendingWithdrawals[index]);
  };

  const handleCloseDetails = () => {
    // Logic to close the details view
    setSelectedWithdrawal(null);
  };

  return (

    <div>
    <div className="small:block">
    <div className="p-4"> 
    <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    
      
          <div className="mb-8 col-span-full lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2">Withdrawal Request</h2>
            <WithdrawalForm onSubmit={handleWithdrawalFormSubmit} />
          </div>

          <div className="mb-8 col-span-full lg:col-span-2"> {/* Updated col-span */}
            <h2 className="text-2xl font-bold mb-2">Pending Withdrawals</h2>
            <WithdrawalList
              withdrawals={pendingWithdrawals}
              onRemove={handleRemovePendingWithdrawal}
              onViewDetails={(index) => handleViewDetails(index, false)}
            />
          </div>
        </div>
       
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Past Withdrawals</h2>
            <WithdrawalTable customer={customer} onViewDetails={(index) => handleViewDetails(index, true)} />
          </div>
          </div>
        </div>
    
      
    
    </div>
      
      {selectedWithdrawal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 lg:p-8">
            <h2 className="text-2xl font-bold mb-2">Withdrawal Details</h2>
            <p>Date: {selectedWithdrawal.date}</p>
            <p>Total Amount: ${selectedWithdrawal.totalAmount.toFixed(2)}</p>
            <p>Balance Amount: ${selectedWithdrawal.balanceAmount.toFixed(2)}</p>
            <button onClick={handleCloseDetails} className="bg-black text-white px-4 py-2 rounded lg:px-6 lg:py-3">
              Close
            </button>
          </div>
        </div>
      )}
    </div>

  );
};

export default WithdrawalsPage;
/*
  <p>Date: {selectedWithdrawal.date}</p>
            <p>Total Amount: {selectedWithdrawal.totalAmount}</p>
            <p>Balance Amount: {selectedWithdrawal.balanceAmount}</p>
            */