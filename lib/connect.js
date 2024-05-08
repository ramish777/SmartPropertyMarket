import mongoose from 'mongoose';

MONGO_DB_URI='mongodb+srv://ramish881:C7hYxbKtur6y5AnW@cluster0.kaxreek.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () =>{
    mongoose.connect(MONGO_DB_URI,{},(err)=>{
        if(err) throw err;
        console.log('connected to db')
    })
}

export default connectDB;