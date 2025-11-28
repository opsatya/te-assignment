import app from "./app";
import connectDB from "./services/database.service";
import dotenv from "dotenv";

// Environment variables ko load kiya - .env file se sab config aayega
dotenv.config();

// Port number - environment se lelo ya default 3000 use karo
const PORT = process.env.PORT || 3000;

// Server start karne se pehle database connect karo
const startServer = async () => {
  try {
    // MongoDB connection establish karo
    await connectDB();
    
    // Server ko start karo aur listen karo
    app.listen(PORT, () => {
      console.log(`✅ Server successfully running hai on port ${PORT}`);
      console.log(`🌐 API available at: http://localhost:${PORT}`);
      console.log(`📡 Projects API: http://localhost:${PORT}/api/projects`);
    });
  } catch (error) {
    // Agar database connect nahi hua ya koi error aaya
    console.error('❌ Server start nahi kar paya:', error);
    process.exit(1); // Process ko exit karo agar error aaya
  }
};

// Server ko start karo
startServer();

