'use client'

import React, { createContext, useState, useContext } from "react";
import Web3 from "web3";

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  let web3;

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          web3 = new Web3(window.ethereum);
          setAccount(accounts[0]);
          window.ethereum.on("accountsChanged", (accounts) => {
            if (accounts.length === 0) {
              setAccount(null);
            } else {
              setAccount(accounts[0]);
            }
          });
        } catch (err) {
          console.log(err.message);
        }
      } else {
        alert("Please install MetaMask");
      }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  return (
    <WalletContext.Provider value={{ account, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};