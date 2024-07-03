import express from 'express';
import {  getTodosController, } from '../controllers/todosController.js';

const router = express.Router();

// Routes
router.get('/', getTodosController);


export default router;