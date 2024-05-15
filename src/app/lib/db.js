const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://ramish881:dXuDuObvhppR6bDd@cluster0.cj28cmq.mongodb.net/';

const userArray = [
    { id: '1', email: 'ram123@gmail.com', name:'Ramish', password: 'ram123', wallet:'0x399c88B3a20c225717f54C3945fFaaF7EFf7FA7D' },
    { id: '2', email: 'abd123@gmail.com', name:'Abdullah', password: 'abd123', wallet:'0xa68C073930e0290DB0115E0670C51Af5272B844f' },
    // Add more users as needed
];
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

// Insert data into MongoDB
const insertUsers = async () => {
    try {
        // Iterate over userArray and insert each user into MongoDB
        for (const userData of userArray) {
            const user = new User(userData);
            await user.save();
            console.log(`User inserted: ${user.email}`);
        }
        console.log('All users inserted successfully');
    } catch (error) {
        console.error('Error inserting users:', error);
    }
};


async function Checker()
{
    try {
    console.log("er")
    mongoose.connect("mongodb+srv://ramish881:dXuDuObvhppR6bDd@cluster0.cj28cmq.mongodb.net/SmartPropertyMarket");
    const con = mongoose.connection;
    con.on("connected", ()=>
    {
        console.log("Connected");
        insertUsers();
    });
    con.on("error", (err)=>
        {
            console.log(err);
            process.exit();
        })
    }catch(err) {
        console.log(err)
}

}

Checker()