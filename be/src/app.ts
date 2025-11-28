import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

// Express app banaya - yeh main application hai
const app = express();

// CORS enable kiya - frontend se requests allow karne ke liye
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Frontend ka URL yahan se aayega
  credentials: true // Cookies aur credentials allow karne ke liye
}));

// JSON body parser - request body ko JSON mein parse karne ke liye
app.use(express.json());

// URL encoded data ko parse karne ke liye (form data ke liye)
app.use(express.urlencoded({ extended: true }));

// Health check endpoint - server running hai ya nahi check karne ke liye
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Project Management API is running!', 
    status: 'OK' 
  });
});

// Project routes ko mount kiya - /api/projects se sab routes available honge
app.use('/api/projects', projectRoutes);

// 404 handler - agar koi route nahi mila toh yeh chalega
app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found', 
    message: `Yeh route exist nahi karta: ${req.method} ${req.path}` 
  });
});

// Global error handler - koi bhi error aaye toh yahan handle hoga
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error aaya:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Kuch galat ho gaya, baad mein try karo' 
  });
});

export default app;



