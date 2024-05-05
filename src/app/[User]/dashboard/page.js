'use client'

import React, { useState, useEffect } from "react";
import UserModel from "../../../../models/User";
import Layout from "../../../../compnents/layout";
import Link from 'next/link';

const Dashboard = ({ params }) => {
  // const [account, setAccount] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Find user data and extract name
    const user = UserModel.getUsers().find(user => user.email.split('@')[0] === params.User);
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [params.User]);

  return (
    <Layout>
  {/* Main content */}
  <div className="container mx-auto px-4 py-8">
    {/* Welcome message */}
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome, {name}!</h1>
    </div>

    {/* Buttons */}
    <div className="text-center">
          <Link href={{
            pathname:'/find',
            query: {email : email}
          }}>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mr-4 hover:bg-blue-700 transition duration-300 ease-in-out">
          Find a Home
        </button>
      </Link>
      <Link href={{
            pathname:'/sell',
            query: {email : email}
          }}>
      <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out">
        Sell a Home
      </button>
      </Link>
    </div>

    {/* Selling and Buying sections */}
    <div className="flex mt-8">
      {/* Sell Property */}
      <div className="w-1/2 pr-2">
        <div className="p-4 rounded">
          <h2 className="text-lg font-bold mb-2">Sell Your Property</h2>
          <p className="text-base leading-relaxed mb-4">Selling property through web3 leverages blockchain for transparent, secure transactions. Smart contracts automate processes like escrow and ownership verification, reducing fees and intermediaries. Web3 offers global reach, fractional ownership options, and transparent records. Sellers should grasp web3's technicalities and comply with regulations while safeguarding against cyber threats. Overall, it's a promising avenue for efficient, transparent real estate transactions.</p>
        </div>
      </div>
      <div className="w-1/2 pl-2">
        <img src="/web3-img.png" alt="Sell Property" className="w-full rounded" />
      </div>
    </div>

    {/* Buy Property */}
    <div className="flex mt-8">
      <div className="w-1/2 pr-2">
        <img src="/2nd-pic.jpg" alt="Buy Property" className="w-full rounded" />
      </div>
      <div className="w-1/2 pl-2 flex flex-col justify-between">
        <div className="p-4 rounded flex-grow">
          <h2 className="text-lg font-bold mb-2">Buy a Property</h2>
          <p className="text-base leading-relaxed mb-4">
            Buying property via web3 integrates blockchain for transparent, secure transactions. Smart contracts automate processes like escrow and ownership verification, enhancing efficiency and trust. Web3 expands access to a global market, offering fractional ownership and transparent records. Buyers should understand web3's technicalities and ensure compliance with regulations. Overall, it's an innovative approach revolutionizing real estate transactions with transparency, security, and efficiency.
          </p>
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default Dashboard;