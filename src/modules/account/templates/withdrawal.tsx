"use client"

import React, { useState } from 'react';

import WithdrawalForm from "@modules/account/components/WithdrawalForm"
import WithdrawalList from "@modules/account/components/WithdrawalList"
import WithdrawalTable from "@modules/account/components/WithdrawalTable"
import { useCustomerOrders, useMeCustomer } from "medusa-react"

interface Withdrawal {
  date: string;
  totalAmount: number;
  balanceAmount: number;
}

const WithdrawalsPage: React.FC = () => {
  const [pendingWithdrawals, setPendingWithdrawals] = useState<Withdrawal[]>([
    // Sample data for demonstration
    { date: '2023-01-01', totalAmount: 1000, balanceAmount: 800 },
    { date: '2023-01-02', totalAmount: 500, balanceAmount: 400 },
  ]);
  const { customer } = useMeCustomer()

  const [pastWithdrawals, setPastWithdrawals] = useState<Withdrawal[]>([
    // Sample data for demonstration
    { date: '2022-12-01', totalAmount: 1200, balanceAmount: 1000 },
    { date: '2022-12-15', totalAmount: 800, balanceAmount: 700 },
    { date: '2022-12-28', totalAmount: 1500, balanceAmount: 1200 },
  ]);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<Withdrawal | null>(null);

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
      <div className="container mx-auto p-4 lg:p-8">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="mb-8 col-span-full lg:col-span-1">
            <h2 className="text-2xl font-bold mb-2">Withdrawal Request</h2>
            <WithdrawalForm onSubmit={handleWithdrawalFormSubmit} customer={customer} />
          </div>
          <div className="mb-8 col-span-full lg:col-span-2"> {/* Updated col-span */}
            <h2 className="text-2xl font-bold mb-2">Pending Withdrawals</h2>
            <WithdrawalList
              withdrawals={pendingWithdrawals}
              onRemove={handleRemovePendingWithdrawal}
              onViewDetails={(index) => handleViewDetails(index, false)}
            />
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Past Withdrawals</h2>
          <WithdrawalTable withdrawals={pastWithdrawals} onViewDetails={(index) => handleViewDetails(index, true)} />
        </section>
      
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