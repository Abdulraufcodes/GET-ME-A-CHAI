//Role: The "Phone Line." You likely already have this, but it is essential for every server file to work.
//important: read how mongodb connection was cached

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error("Please define the MONGO_URI environment variable inside .env.local");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const connectDb = async() => {
    // If a connection already exists, return it immediately
    if (cached.conn) {
        return cached.conn;
    }

    // If no connection is in progress, start one
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disabling this helps debug production timeouts
        };

        cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
            console.log("New MongoDB connection established");
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null; // Clear the failed promise so next request can retry
        console.error("MongoDB connection error:", e);
        throw e;
    }

    return cached.conn;

}

export default connectDb;