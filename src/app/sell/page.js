'use client'
import React, { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Layout from "../../../compnents/layout";
import PropertyModel from "../../../models/PropertyAd";
import UserModel from "../../../models/User";
import { useRouter } from 'next/navigation'
import vmContract from '../../../blockchain/smart_contract'

const SellPage = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [address, setAddress] = useState('');
    const [userArray, setUserArray] = useState([]); // State to hold user data
    const router = useRouter();

    useEffect(() => {
        // Load user data when the component mounts
        const fetchData = async () => {
            try {
                // Fetch user data from UserModel
                const userData = await UserModel.getUsers(); // Example: replace with actual method to fetch user data
                setUserArray(userData); // Update userArray state with fetched data
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData(); // Call fetchData function
    }, []); // Run effect only on component mount

    const addHome = async () => {
        try {
            const walletAddr = getWalletAddressByEmail(email);
    
            // Estimate gas needed for the transaction
            const estimatedGas = await vmContract.methods
                .addHome((PropertyModel.propertyArray.length + 1), title, description, parseInt(budget), address, email)
                .estimateGas({ from: walletAddr });
    
            // Send the transaction with the dynamically estimated gas limit
            const transactionReceipt = await vmContract.methods
                .addHome((PropertyModel.propertyArray.length + 1), title, description, budget, address, email)
                .send({ from: walletAddr, gas: estimatedGas });
    
            console.log("Transaction successful. Transaction Receipt:", transactionReceipt);
            console.log("Home added successfully");
        } catch (error) {
            console.error("Error adding home:", error);
        }
    };
    
    const getWalletAddressByEmail = (email) => {
        // Find the user object with the given email
        const user = userArray.find(user => user.email === email);
    
        // If user is found, return the wallet address
        if (user) {
            return user.wallet;
        } else {
            return null; // Return null if user is not found
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {

            // Add home to blockchain
            await addHome();

            // // Create a new property object
            // const newProperty = {
            //     id: (PropertyModel.propertyArray.length + 1),
            //     name: title,
            //     description: description,
            //     price: budget,
            //     address: address,
            //     formedBy: email
            // };

            // // Update propertyArray state
            // PropertyModel.addProperty(newProperty);

            // console.log('New Property:', newProperty);
            // console.log('Property Array:', PropertyModel.propertyArray);

            let User = email.split('@')[0];
            router.push(`/${User}/dashboard`);
        } catch (error) {
            console.error("Error adding property:", error);
        }
    };
  
    return (
        <Layout>
            <div style={{ marginTop: '80px', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ maxWidth: '800px', width: '80%', backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '40px', borderRadius: '10px', textAlign: 'center' }}>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <h1 className="input-label" style={{ marginBottom: '20px' }}>Sell your property</h1>
                            <label htmlFor="title" className="input-label">Title:</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="Enter title..."
                                className="input-field"
                                style={{ width: '100%', padding: '10px', color: 'black' }}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="description" className="input-label">Description:</label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={handleDescriptionChange}
                                placeholder="Enter description..."
                                className="input-field"
                                style={{ width: '100%', minHeight: '100px', padding: '10px', color: 'black' }}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="budget" className="input-label">Enter your home budget:</label>
                            <input
                                type="text"
                                id="budget"
                                value={budget}
                                onChange={handleBudgetChange}
                                placeholder="Enter budget..."
                                className="input-field"
                                style={{ width: '100%', padding: '10px', color: 'black' }}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="address" className="input-label">Address:</label>
                            <input
                                type="text"
                                id="address"
                                value={address}
                                onChange={handleAddressChange}
                                placeholder="Enter address..."
                                className="input-field"
                                style={{ width: '100%', padding: '10px', color: 'black' }}
                            />
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>

        </Layout>
    );
};
  
export default SellPage;
