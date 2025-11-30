import mongoose from "mongoose";
import dotenv from "dotenv";
import { uriType } from "../types/project.types";

dotenv.config();

const uri: uriType = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        if (!uri) {
            throw new Error("MongoDB URI nahi mila environment variables mein");
        }
        
        await mongoose.connect(uri);
        console.log("MongoDB successfully connect ho gaya");
        
        mongoose.connection.on('error', (err) => {
            console.log('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected ho gaya');
        });
        
    } catch (error) {
        console.error('Database connection mein error aaya:', error);
        throw error; 
    }
};

export default connectDB;

