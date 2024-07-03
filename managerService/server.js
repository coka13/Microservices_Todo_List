import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todosRoutes.js';

const app = express();
const port = 3001;
const host = '0.0.0.0';

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow only specified headers
}));
app.use('/api/todos', todosRoutes); // Route handling for todos

// Connect to MongoDB
try {
  mongoose.connect('mongodb://mongodb:27017/todos'); // Connect to MongoDB service
} catch (err) {
  console.error('MongoDB connection error:', err.message);
}

// Start server
app.listen(port, host);
console.log(`Running on http://${host}:${port}`);
