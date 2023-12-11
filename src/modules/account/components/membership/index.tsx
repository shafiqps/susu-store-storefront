import { Customer, Order } from "@medusajs/medusa"
import React, { useEffect, useState } from 'react';


type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
};

type Referral = {
  id: string;
  email: string;
  referrals?: Referral[]; // This makes the 'referrals' property recursive
};

async function fetchReferralTree() {
  try {
    const response = await fetch('http://localhost:9000/store/customers-metadata', {
      method: 'GET',
      credentials: 'include', // Ensure to send cookies if authentication is needed
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This will be the list of referred customers
  } catch (error) {
    console.error('Error fetching referral tree:', error);
  }
}

const renderReferralTree = (referrals: Referral[]): JSX.Element => {
  return (
    <>
    <ul>
      {referrals.map(referral => (
        <li key={referral.id}>
          {referral.email}
          {referral.referrals && renderReferralTree(referral.referrals)}
        </li>
      ))}
    </ul>
    <ul className="flex flex-row mt-10 justify-center">
    <div className="-mt-10 mb-0 border-l-2 absolute h-5 border-gray-400"></div>
    </ul>
    </>
  );
};

const Membership = () => {
  const [referralTree, setReferralTree] = useState<Referral[]>([]);
  useEffect(() => {
    fetchReferralTree()
      .then(data => {
        if (data) {
          console.log(data)
          setReferralTree(data);
          console.log(referralTree);
        }
      })
      .catch(error => {
        console.error('Failed to fetch referral tree:', error);
      });
  }, []);
  return (
    <div className="w-full">
    <div className="mb-8 flex flex-col gap-y-4">
      <h1 className="text-2xl-semi">Membership</h1>
      <p className="text-base-regular">
        View and update your profile information, including your name, email,
        and phone number. You can also update your billing address, or change
        your password.
      </p>
      <div className="flex flex-col justify-center items-center">
        <div className="container mx-auto text-center pt-10">
          <div className="items-center justify-center flex">
            <div className="text-center">
              <div className="flex flex-col justify-center items-center">
              <h3 className="text-large-semi">My Referrals</h3>
                <ul >
                    {referralTree.length > 0 && renderReferralTree(referralTree)}                    
                </ul>
               </div>
              
            </div>     
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}


export default Membership
