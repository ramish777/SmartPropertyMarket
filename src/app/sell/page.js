'use client'

import React, { useState } from "react";
import { useSearchParams } from 'next/navigation';
import Layout from "../../../compnents/layout";
import PropertyModel from "../../../models/PropertyAd";
import { useRouter } from 'next/navigation'

const SellPage = () => {
    const searchParams = useSearchParams()
    const email = searchParams.get('email')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [address, setAddress] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const router = useRouter();

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

    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new property object
        const newProperty = {
            id: (PropertyModel.propertyArray.length + 1).toString(), // Generate id based on the length of propertyArray
            name: title,
            description: description,
            price: budget,
            address: address,
            formedBy: email
        };

        // Push the new property into propertyArray
        PropertyModel.propertyArray.push(newProperty);

        console.log('New Property:', newProperty);
        console.log('Property Array:', PropertyModel.propertyArray);
        alert("Added Property:", newProperty);

        let User=email.split('@')[0];
        router.push(`/${User}/dashboard`)
      };
  
    return (
        <Layout>
            <div style={{ marginTop:'80px' ,backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                        <div className="input-group">
                            <label htmlFor="image" className="input-label">Upload Image:</label>
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
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

