import express from 'express';
import {  addUserController, getUserController,getUserByIdController} from '../controllers/authController.js';


const router = express.Router();

router.post('/', addUserController);
router.get('/', getUserController);
router.get('/:userId', getUserByIdController);


export default router;