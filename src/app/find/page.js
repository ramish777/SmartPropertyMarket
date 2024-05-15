'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Layout from "../../../compnents/layout"; // Corrected typo in import path
import PropertyModel from "../../../models/PropertyAd";
import UserModel from "../../../models/User";
import { useWallet } from "../../../context/WalletContext";
import vmContract from '../../../blockchain/smart_contract';
import Web3 from 'web3';

const FindPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [properties, setProperties] = useState(PropertyModel.propertyArray); // State to hold property cards

  useEffect(() => {
    const fetchHomes = async () => {
      try {
        const allHomes = await vmContract.methods.getAllHomes().call();
        const newProperties = allHomes.map((home, index) => ({
          id: index.toString(),
          name: home.title,
          description: home.description,
          price: parseInt(home.budget.toString()),
          address: home.addresss,
          formedBy: home.ownerName
        }));
        setProperties(newProperties);
      } catch (error) {
        console.error('Error fetching homes:', error);
      }
    };
    fetchHomes();
  }, []); 

  const handleBuyNow = async (id, price) => {
    try {
      const userWallet1 = UserModel.getUserWalletByEmail(email);
      const property = properties.find(property => property.id === id);
      const userWallet = UserModel.getUserWalletByEmail(property.formedBy);
      
      const BuyProperty = async () => {
        try {
          const estimatedGas = await vmContract.methods.buyHome(id, email).estimateGas({ from: userWallet1 });
          const transactionReceipt = await vmContract.methods.buyHome(id, email).send({ from: userWallet1, gas: estimatedGas });
          console.log("Transaction successful. Transaction Receipt:", transactionReceipt);
          console.log("Property bought successfully");
        } catch (error) {
          console.error("Error buying home:", error);
        }
      };

      await BuyProperty();

      await transferFunds(userWallet1, userWallet, price, id, email);
      const remainingProperties = properties.filter(property => property.id !== id);
      setProperties(remainingProperties);
    } catch (error) {
      console.error("Error handling buy now:", error);
    }
  };

  return (
    <Layout>
      <div className="boxes">
        {properties.map(property => (
          <PropertyCard key={property.id} {...property} email={email} handleBuyNow={handleBuyNow} />
        ))}
      </div>
    </Layout>
  );
};

const PropertyCard = ({ id, name, description, price, address, formedBy, email, handleBuyNow }) => {
  const { account } = useWallet();

  return (
    <div className="box">
      <div className="oneLine">
        <h2>{name}</h2>
        <p>ETH {price}</p>
      </div>
      <p className="language">{description}</p>
      <div className="oneLine">
        <p>Address: {address}</p>
        <p>Seller: {formedBy}</p>
      </div>
      <button className="buy-now" onClick={() => handleBuyNow(id, price)}>Buy Now</button>
    </div> 
  );
};

async function transferFunds(senderAddress, receiverAddress, amount, id, email) {
  const web3 = new Web3(window.ethereum);

  try {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const amountWei = web3.utils.toWei(amount.toString(), 'ether');
    await web3.eth.sendTransaction({
      from: senderAddress,
      to: receiverAddress,
      value: amountWei
    });

    console.log('Transaction successful');
  } catch (error) {
    console.error('Error transferring funds:', error);
  }
}

export default FindPage;
