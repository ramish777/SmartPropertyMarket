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


  // let web3;

  // const connectWalletHandler = async () => {
  //   if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  //     try {
  //       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
  //       web3 = new Web3(window.ethereum);
  //       setAccount(accounts[0]);
  //       window.ethereum.on("accountsChanged", (accounts) => {
  //         if (accounts.length === 0) {
  //           setAccount(null);
  //         } else {
  //           setAccount(accounts[0]);
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   } else {
  //     alert("Please install MetaMask");
  //   }
  // };

  return (
    <Layout>
      {/* Navbar
      <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">SmartPropertyMarket</h1>
        </div>
        <div>
          {account ? (
            <p className="text-sm">{`Wallet Connected !!!`}</p>
          ) : (
            <button className="bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition duration-300 ease-in-out" onClick={connectWalletHandler}>
              Connect Wallet
            </button>
          )}
        </div>
      </nav> */}

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
      <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300 ease-in-out">
        Sell a Home
      </button>
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