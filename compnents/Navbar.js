'use client'
import React from "react";
import { useWallet } from "../context/WalletContext";

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  return (
    <nav className="flex justify-between items-center bg-gray-800 p-4 text-white">
      <div className="flex items-center">
        <h1 className="text-lg font-bold">SmartPropertyMarket</h1>
      </div>
      <div>
        {account ? (
          <p className="text-sm">{`Wallet Connected !!!`}</p>
        ) : (
          <button
            className="bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-200 transition duration-300 ease-in-out"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;