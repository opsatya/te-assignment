import mongoose from "mongoose";
import dotenv from "dotenv";
import { uriType } from "../types/project.types";

// Environment variables ko load kiya
dotenv.config();

// MongoDB connection string - .env file se liya
const uri: uriType = process.env.MONGO_URI;

// Database connect karne ka function
const connectDB = async () => {
    try {
        // URI check karo - agar nahi hai toh error throw karo
        if (!uri) {
            throw new Error("MongoDB URI nahi mila environment variables mein");
        }
        
        // MongoDB se connect karo
        await mongoose.connect(uri);
        console.log("MongoDB successfully connect ho gaya");
        
        // Connection events handle karo
        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected ho gaya');
        });
        
    } catch (error) {
        // Agar connection fail ho gaya
        console.error('Database connection mein error aaya:', error);
        throw error; // Error ko throw karo taaki index.ts mein handle ho sake
    }
};

export default connectDB;

