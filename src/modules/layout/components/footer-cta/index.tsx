import React from 'react';
import Image from 'next/image';

const Bestsellers = () => {
  // This array should contain objects with details of each bestseller product.
  // You would normally fetch this data from your backend or have it passed in as props.
  const products = [
    {
      name: 'LIMITED EDITION',
      price: 'RM22.00',
      imageUrl: '/9.3.jpg',
      rating: 5,
    },
    // ...other product objects
  ];

  return (
    <div className="content-container background-image flex flex-col gap-y-8 pt-5">\
      <div className="flex justify-between items-center bg-transparent w-auto h-auto px-2">
      <h2 className=" fifth-heading text-white text-2xl fosnt-semibold mr-4">Get milk 'dairy'.</h2>
      <div className="w-auto">
        <input
          type="email"
          placeholder="Email:"
          className="fifth-heading w-auto m-2 p-2 pl-5 px-10 rounded-full"
        />
        <button className=" fifth-heading w-auto m-2 p-5  bg-blue-300 bg-opacity-4 text-black py-2 px-10 rounded-full">
          Sign Up
        </button>
      </div>
      </div>
      
    </div>
  );
};

export default Bestsellers;