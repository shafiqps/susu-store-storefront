// context/WithdrawalContext.tsx
import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface Withdrawal {
  id: number;
  date: string;
  totalAmount: number;
  balanceAmount: number;
}

interface WithdrawalContextProps {
  withdrawals: Withdrawal[];
  setWithdrawals: Dispatch<SetStateAction<Withdrawal[]>>;
}

const WithdrawalContext = createContext<WithdrawalContextProps | undefined>(undefined);

export const WithdrawalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);

  return (
    <WithdrawalContext.Provider value={{ withdrawals, setWithdrawals }}>
      {children}
    </WithdrawalContext.Provider>
  );
};

export const useWithdrawalContext = () => {
  const context = useContext(WithdrawalContext);
  if (!context) {
    throw new Error('useWithdrawalContext must be used within a WithdrawalProvider');
  }
  return context;
};
