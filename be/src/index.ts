import app from "./app";
import connectDB from "./services/database.service";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server successfully running  on port ${PORT}`);
      console.log(`API available at: http://localhost:${PORT}`);
      console.log(`Projects API: http://localhost:${PORT}/api/projects`);
    });
  } catch (error) {
    console.error('Server start nahi kar paya:', error);
    process.exit(1);
  }
};

startServer();

