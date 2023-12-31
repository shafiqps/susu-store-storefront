import { Customer, Order } from "@medusajs/medusa"
import React, { useEffect, useState } from 'react';
import { FaCrown } from "react-icons/fa";



type OverviewProps = {
  orders?: Order[];
  customer?: Omit<Customer, "password_hash"> & {
    metadata?: {
      referral_code?: string;
      referrer?: string;
    };
  };
};

const getTotalLoyaltyPoints = (orders: Order[] | undefined): number => {
  if (!orders) {
    return 0;
  }

  return orders.reduce((total, order) => {
    // Assuming each order has a 'loyaltyPoints' attribute
    return total + (order.loyaltyPoints || 0);
  }, 0);
};

type Earner = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  loyaltyPoints: number;
  totalOrders: number;
  recruits: number;
  totalProfit: number;
  totalBulkPurchase: number;
  billing_address: BillingAddress | null;

  // ... add any other relevant fields from your data
};


type BillingAddress = {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  customer_id: string | null;
  company: string;
  first_name: string;
  last_name: string;
  address_1: string;
  address_2: string;
  city: string;
  country_code: string;
  province: string;
  postal_code: string;
  phone: string | null;
  metadata: any | null;
};

const useCounter = (target: number, speed: number) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let isMounted = true; // Flag to prevent state update if the component is unmounted
    if (count < target) {
      // Set a timeout to increment the count
      const timeout = setTimeout(() => isMounted && setCount(count + 1), speed);
      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    }
  }, [count, target, speed]);

  return count;
};

const TreeDashboard = ({ orders, customer }: OverviewProps) => {
  const totalLoyaltyPoints = getTotalLoyaltyPoints(orders);
  const [topEarners, setTopEarners] = useState<Earner[]>([]);
  const [topRecruiters, setTopRecruiters] = useState<Earner[]>([]);
  const [topBulkPurchase, setTopBulkPurchase] = useState<Earner[]>([]);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalProfitShare, setTotalProfitShare] = useState<number>(0);

  
  const animatedTotalCustomers = useCounter(totalCustomers, 20);
  const [activeLeaderboard, setActiveLeaderboard] = useState('earners');
 

  console.log(customer?.totalOrders);

  useEffect(() => {
    // Fetch the top earners from your API
    const fetchTopEarners = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/top10-earners');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let data = await response.json();
        data = data.sort((a: { loyaltyPoints: number }, b: { loyaltyPoints: number }) => b.loyaltyPoints - a.loyaltyPoints);
        setTopEarners(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchTopEarners();

        // Fetch the top recruiters from a separate endpoint
    const fetchTopRecruiters = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/top10-recruiters');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        let recruitersData = await response.json();
        recruitersData = recruitersData.sort((a: { recruits: number }, b: { recruits: number }) => b.recruits- a.recruits);
        setTopRecruiters(recruitersData);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchTopRecruiters();

         // Fetch the top recruiters from a separate endpoint
    const fetchTopBulkPurchase = async () => {
          try {
            const response = await fetch('http://localhost:9000/store/top10-bulkpurchase');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            let bulkPruchaseData = await response.json();
            bulkPruchaseData = bulkPruchaseData.sort((a: { totalBulkPurchase: number }, b: { totalBulkPurchase: number }) => b.totalBulkPurchase- a.totalBulkPurchase);
            setTopBulkPurchase(bulkPruchaseData);
          } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
          }
        };
    
    fetchTopBulkPurchase();

    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/customer-total');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalCustomers(data.totalCustomers); // Assuming the response has a `totalCustomers` field
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
  
    fetchTotalCustomers();

    const fetchTotalProfit = async () => {
      try {
        const response = await fetch('http://localhost:9000/store/total-profitshare');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalProfitShare(data); 
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
  
    fetchTotalProfit();

  }, []);

  

  return (
    <div>
      <div className="small:block">
      <div className="text-xl-semi flex justify-between items-start mb-4">
          <span>Hello {customer?.first_name}</span>
          <span className="text-small-regular text-gray-700">
            Signed in as:{" "}
            <span className="font-semibold">{customer?.email}</span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-gray-200">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total Orders Box */}
              <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-md font-semibold text-gray-700">Total Orders</h3>
                <p className="text-xl font-bold text-gray-900 mt-2"> {customer?.totalOrders || 0}</p>
              
              </div>
              
              {/* Commission Box */}
              <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-md font-semibold text-gray-700">Commission</h3>
                <p className="text-xl font-bold text-gray-900 mt-2">RM {customer?.loyaltyPoints/100 || 0}</p>
              </div>
              
              {/* Total Sign Ups Box */}
              <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-md font-semibold text-gray-700">Total Sign Ups</h3>
                <p className="text-xl font-bold text-gray-900 mt-2">{animatedTotalCustomers}</p>
              </div>

              <div className="bg-white shadow rounded-lg p-6 flex flex-col items-center justify-center">
                <h3 className="text-md font-semibold text-gray-700">Total Profit Sharing</h3>
                <p className="text-xl font-bold text-gray-900 mt-2">RM {totalProfitShare/100|| 0}</p>
              </div>
            </div>
            </div>

          {/* Navigation Menu for Leaderboards */}
          <div className="flex border-b-2 mb-4">
        <div
          className={`cursor-pointer p-2 ${activeLeaderboard === 'earners' ? 'border-b-4 border-sky-400' : ''}`}
          onClick={() => setActiveLeaderboard('earners')}
        >
          <span className="font-semibold text-gray-700">Earners</span>
        </div>
        <div
          className={`cursor-pointer p-2 ${activeLeaderboard === 'recruiters' ? 'border-b-4 border-sky-400' : ''}`}
          onClick={() => setActiveLeaderboard('recruiters')}
        >
          <span className="font-semibold text-gray-700">Recruiters</span>
        </div>
        <div
          className={`cursor-pointer p-2 ${activeLeaderboard === 'profit' ? 'border-b-4 border-sky-400' : ''}`}
          onClick={() => setActiveLeaderboard('profit')}
        >
          <span className="font-semibold text-gray-700">Profit Sharings</span>
        </div>
      </div>

{/* Leaderboard Section */}
{activeLeaderboard === 'earners' && (
        // Render Top 10 Earners Table
  
<div className="mt-5 px-10">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Earners</h2>
  <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '700px', overflowY: 'auto' }}>
    <table className="min-w-full">
      <thead className="bg-sky-400">
        <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Rank
        </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            User Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            #Earnings
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          State
          </th>
        </tr>
      </thead>
      <tbody>
        {topEarners.map((earner, index) => (
          <tr key={earner.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap" data-label="Rank">
                      {index + 1}
                    </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="User Name">
              {`${earner.first_name} ${earner.last_name}`}
              {customer?.first_name === earner.first_name && <span className="inline-block ml-2 font-semibold text-sky-700 flashing-text">(You're here!)</span>}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between items-center" data-label="Earnings">
            RM {earner.loyaltyPoints/100 || 0}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="State">
            {earner.billing_address ? earner.billing_address.province : 'Unknown'}
            {index === 0 ? <FaCrown className="inline-block ml-2 text-[#fbbf24]" /> : 
            index === 1 ? <FaCrown className="inline-block ml-2 text-[silve]" /> : 
            index === 2 ? <FaCrown className="inline-block ml-2 text-[#78350f]" /> : null} 
           </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    )}

{activeLeaderboard === 'recruiters' && (
        // Render Top 10 Recruiters Table
  
<div className="mt-5 px-10">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Recruiters</h2>
  <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '700px', overflowY: 'auto' }}>
    <table className="min-w-full">
      <thead className="bg-sky-400">
      <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Rank
                  </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            User Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          #Recruiters
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          State
          </th>
        </tr>
      </thead>
      <tbody>
        {topRecruiters.map((recruiter, index) => (
           <tr key={recruiter.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
             <td className="px-6 py-4 whitespace-nowrap" data-label="Rank">
                      {index + 1}
                    </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="User Name">
             {`${recruiter.first_name} ${recruiter.last_name}`}
             {customer?.first_name === recruiter.first_name && <span className="inline-block ml-2 font-semibold text-sky-700 flashing-text">(You're here!)</span>}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between items-center" data-label="Recruits">
             {recruiter.recruits || 0}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="State">
            {recruiter.billing_address ? recruiter.billing_address.province : 'Unknown'}
            {index === 0 ? <FaCrown className="inline-block ml-2 text-[#fbbf24]" /> : 
            index === 1 ? <FaCrown className="inline-block ml-2 text-[silve]" /> : 
            index === 2 ? <FaCrown className="inline-block ml-2 text-[#78350f]" /> : null} 
           </td>
         </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    )}

{activeLeaderboard === 'profit' && (
<div className="mt-5 px-10">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Profit Sharing</h2>
  <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '700px', overflowY: 'auto' }}>
    <table className="min-w-full">
      <thead className="bg-sky-400">
      <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Rank
                  </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
            User Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          #Bulk Purchases
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
          State
          </th>
        </tr>
      </thead>
      <tbody>
        {topBulkPurchase.map((profit, index) => (
           <tr key={profit.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
             <td className="px-6 py-4 whitespace-nowrap" data-label="Rank">
                      {index + 1}
                    </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="User Name">
             {`${profit.first_name} ${profit.last_name}`}
             {customer?.first_name === profit.first_name && <span className="inline-block ml-2 font-semibold text-sky-700 flashing-text">(You're here!)</span>}
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-between items-center" data-label="Recruits">
             {profit.totalBulkPurchase || 0}
          
           </td>
           <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" data-label="State">
            TEST
            {index === 0 ? <FaCrown className="inline-block ml-2 text-[#fbbf24]" /> : 
            index === 1 ? <FaCrown className="inline-block ml-2 text-[silve]" /> : 
            index === 2 ? <FaCrown className="inline-block ml-2 text-[#78350f]" /> : null} 
           </td>
           
         </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
 )}




          </div>
          </div>
      </div>
    </div>
  )
}



export default TreeDashboard
