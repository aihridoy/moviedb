import mongoose from "mongoose";

let isConnected = null;

export async function dbConnect() {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        isConnected = conn.connections[0].readyState;
        console.log("New database connection established");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
}
