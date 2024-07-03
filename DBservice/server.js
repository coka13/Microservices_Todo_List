import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import { connectQueue } from './lib/amqp.js';
import { addTodoService, deleteTodoByIDService, updateTodoService } from './services/todoServices.js';
import { sendMail } from './lib/mailer/sendMail.js';

dotenv.config(); // Load environment variables from .env file
const app = express(); // Initialize Express application
const port = 3000; // Port on which the server will run
const host = '0.0.0.0'; // Host address to listen on (all network interfaces)

// Middleware setup
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specified HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specified headers
}));

// Define routes
app.use('/api/todos', todosRoutes); // Todos-related API routes
app.use('/api/auth', authRoutes); // Authentication-related API routes

console.log(process.env.QUEUE_NAME, "Queue name"); // Log the queue name from environment variables

// Connect to MongoDB
try {
  mongoose.connect('mongodb://mongodb:27017/todos'); // Connect to MongoDB instance
} catch (err) {
  console.error('MongoDB connection error:', err.message); // Log MongoDB connection errors
}

// Connect to AMQP queue and setup message consumer
try {
  let channel = await connectQueue(); // Connect to the queue channel

  // Queue consumer. Processes incoming messages.
  channel.consume(process.env.QUEUE_NAME, async (data) => {
    console.log('Message received:', data); // Log received message
    if (data !== null) {
      let msg = data.content.toString(); // Convert buffer to string
      msg = JSON.parse(msg); // Parse string to JSON object

      let status = {}; // Placeholder for operation status

      switch (msg.action) {
        case 'add':
          status = await addTodoService(msg.task, msg.user); // Call add todo service
          await sendMail(`Your todo was added \n Todo:${status.task}`, msg.user_email); // Send email notification
          console.log('Status', status); // Log operation status
          channel.ack(data); // Acknowledge message processed
          break;
        case 'update':
          status = await updateTodoService(msg.id, msg.completed); // Call update todo service
          await sendMail(`Your todo was updated \n Todo:${status.task}`, msg.user_email); // Send email notification
          console.log('Status', status); // Log operation status
          channel.ack(data); // Acknowledge message processed
          break;
        case 'delete':
          status = await deleteTodoByIDService(msg.id); // Call delete todo service
          await sendMail(`Your todo was deleted \n Todo:${status.task}`, msg.user_email); // Send email notification
          console.log('Status', status); // Log operation status
          channel.ack(data); // Acknowledge message processed
          break;
        default:
          console.log('No task action found!'); // Log if no valid task action
      }
    }
  }, {
    noAck: false // Ensure messages are acknowledged after processing
  });

} catch (err) {
  console.error('Cannot connect to channel', err.message); // Log errors if unable to connect to channel
}

// Start Express server
app.listen(port, host);
console.log(`Running on http://${host}:${port}`); // Log server startup message
