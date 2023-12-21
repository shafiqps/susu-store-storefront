"use client"

import React, { useState, useEffect } from 'react';
import { useCustomerOrders, useMeCustomer } from "medusa-react"

import WithdrawalForm from "@modules/account/components/WithdrawalForm"
import WithdrawalList from "@modules/account/components/WithdrawalList"
import WithdrawalTable from "@modules/account/components/WithdrawalTable"

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
    setPendingWithdrawals((pendingWithdrawals) => [
      ...pendingWithdrawals.slice(0, index),
      ...pendingWithdrawals.slice(index + 1),
    ]);
  };

  //const handleViewDetails = (index: number, isPast: boolean) => {
    // Logic to set the selected withdrawal and show details
    //setSelectedWithdrawal(isPast ? pastWithdrawals[index] : pendingWithdrawals[index]);
  //};

  const handleViewDetails = (withdrawal: Withdrawal) => {
    setSelectedWithdrawal(withdrawal);
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
            <WithdrawalForm onSubmit={handleWithdrawalFormSubmit} customer={customer} />
          </div>

          <div className="mb-8 col-span-full lg:col-span-2"> {/* Updated col-span */}
            <h2 className="text-2xl font-bold mb-2">Pending Withdrawals</h2>
            <WithdrawalList
              customer={customer}
              withdrawals={pendingWithdrawals}
              onRemove={handleRemovePendingWithdrawal}
              onViewDetails={(withdrawal) => handleViewDetails(withdrawal)}
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
        <div className="modal-backdrop">
          <div className="modal">
            <h2 className="text-2xl font-bold mb-2">Withdrawal Details</h2>
            <p>Date: {new Date(selectedWithdrawal.created_at).toLocaleDateString()}</p>
            <p>Total Amount: RM {selectedWithdrawal.total/100}</p>
            <p >Status: <span style={{ color: getStatusColor(selectedWithdrawal.status) }}>{selectedWithdrawal.status}</span> </p>
            <div className="flex justify-center">
            <button onClick={handleCloseDetails} className="fifth-heading w-auto m-2 bg-sky-400 bg-opacity-4 py-2 px-4 rounded-full">
              Close
            </button>
            </div>
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