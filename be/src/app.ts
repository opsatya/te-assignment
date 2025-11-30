import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import projectRoutes from './routes/project.routes';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173', 
  credentials: true 
}));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({ 
    message: 'Project Management API is running!', 
    status: 'OK' 
  });
});

app.use('/api/projects', projectRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    error: 'Route not found', 
    message: `Yeh route exist nahi karta: ${req.method} ${req.path}` 
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error aaya:', err);
  res.status(500).json({ 
    error: 'Internal server error', 
    message: 'Kuch galat ho gaya, baad mein try karo' 
  });
});

export default app;



