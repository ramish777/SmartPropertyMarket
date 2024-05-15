const userArray = [
    { id: '1', email: 'ram123@gmail.com', name:'Ramish', password: 'ram123', wallet:'0x399c88B3a20c225717f54C3945fFaaF7EFf7FA7D' },
    { id: '2', email: 'abd123@gmail.com', name:'Abdullah', password: 'abd123', wallet:'0xa68C073930e0290DB0115E0670C51Af5272B844f' },
    // Add more users as needed
];

const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  name: String,
  password: String,
  wallet: String
});

// Create the User model
const User = mongoose.model('User', userSchema);

const getUserWalletByEmail = (email) => {
  const user = userArray.find((user) => user.email === email);
  return user ? user.wallet : null; // Return the wallet if user found, otherwise return null
};

export default {
  userArray:userArray,
  getUsers: () => userArray,
  getUserById: (id) => userArray.find((user) => user.id === id),
  findUserByEmailAndPassword: (email, password) => {    
    return userArray.some((user) => user.email === email && user.password === password);
  },
  getUserWalletByEmail: getUserWalletByEmail,
  User
};
