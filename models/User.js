const userArray = [
    { id: '1', email: 'ram123@gmail.com', name:'Ramish', password: 'ram123' },
    { id: '1', email: 'abd123@gmail.com', name:'Abdullah', password: 'abd123' },
    // Add more users as needed
  ];

  export default {
    getUsers: () => userArray,
    getUserById: (id) => userArray.find((user) => user.id === id),
    findUserByEmailAndPassword: (email, password) => {
        return userArray.some((user) => user.email === email && user.password === password);
    }
  };