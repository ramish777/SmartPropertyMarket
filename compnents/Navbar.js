'use client'
import React from "react";
import { useWallet } from "../context/WalletContext";

const Navbar = () => {
  const { account, connectWallet } = useWallet();

  return (
    <nav style={{ background: '#333', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>SmartPropertyMarket</h1>
      </div>
      <div>
        {account ? (
          <p style={{ fontSize: '0.875rem', marginRight: '1rem' }}>Wallet Connected !!!</p>
        ) : (
          <button
            style={{ background: '#fff', color: '#333', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', border: 'none', marginRight: '1rem' }}
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