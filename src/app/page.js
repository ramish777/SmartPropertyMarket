'use client'

import 'tailwindcss/tailwind.css';
import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import UserModel from "../../models/User";
import { useWallet } from '../../context/WalletContext';



export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userArray=UserModel.getUsers()

  const { disconnectWallet } = useWallet();

  disconnectWallet();
  
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Find the user
    const user = userArray.find(user => user.email === email && user.password === password);

    if (user) {
      let User=user.email.split('@')[0];
      router.push(`/${User}/dashboard`)
      //router.push(`/home`)
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center">
        <div className="max-w-md w-full px-4">
        <h1 className="text-3xl mb-4 font-bold text-center">SmartPropertyMarket</h1>
          <h3 className="text-2l mb-4 font-bold text-left">Sign in to your account</h3>
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="abd123@gmail.com"
                value={email}
                onChange={onChangeEmail}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="********"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-gray-300">
        <img src="title.jpg" alt="Image" className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
