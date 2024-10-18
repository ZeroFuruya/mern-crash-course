import mongoose from "mongoose"; // connects us to our database by using the connection string from .env

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(err.message);
        process.exit(1); // 1 code means exit without failure, 0 means success
    }
}