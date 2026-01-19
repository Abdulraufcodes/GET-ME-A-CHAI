//Role: The "Phone Line." You likely already have this, but it is essential for every server file to work.

import mongoose from "mongoose";

const connectDb = async() => {
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/chai');
        // console.log(`mongoDb connected: {conn.conection.host}`);
    }catch(error) {
        // console.log(error.message);
        process.exit(1);
    }
}

export default connectDb;