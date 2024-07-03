import express from 'express';
const router = express.Router();
import { addNewTodoController, changeStatusController, completedTodos, deleteTodoController } from '../controllers/todosController.js';
import { checkUser } from '../middleware/index.js';

// Routes
router.get('/stats', checkUser, completedTodos);
router.post("/status/:id",checkUser, changeStatusController);
router.post("/addTodo", checkUser, addNewTodoController);
router.post("/deleteTodo/:id",checkUser, deleteTodoController);

export default router;