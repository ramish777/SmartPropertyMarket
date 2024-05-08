const userArray = [
    { id: '1', email: 'ram123@gmail.com', name:'Ramish', password: 'ram123', wallet:'0xf6470A9182d0dD3936b76454B0C57Ed2d65083D5' },
    { id: '2', email: 'abd123@gmail.com', name:'Abdullah', password: 'abd123', wallet:'0x6DACc19a31ee07142a89e8a08a69ba2b6C7120f9' },
    // Add more users as needed
];

  export default {
    userArray:userArray,
    getUsers: () => userArray,
    getUserById: (id) => userArray.find((user) => user.id === id),
    findUserByEmailAndPassword: (email, password) => {
        return userArray.some((user) => user.email === email && user.password === password);
    }
  };