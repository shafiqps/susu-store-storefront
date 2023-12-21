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
  // ... add any other relevant fields from your data
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
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [totalProfitShare, setTotalProfitShare] = useState<number>(0);

  
  const animatedTotalCustomers = useCounter(totalCustomers, 20);
 

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

{/* Leaderboard Section */}
<div className="mt-5 px-10">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Earners</h2>
  <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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
            RM {earner.loyaltyPoints || 0}
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

<div className="mt-5 px-10">
  <h2 className="text-xl font-semibold text-gray-800 mb-4">Top 10 Recruiters</h2>
  <div className="bg-white shadow rounded-lg overflow-hidden responsive-table" style={{ maxHeight: '300px', overflowY: 'auto' }}>
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




          </div>
      </div>
    </div>
  )
}



export default TreeDashboard
