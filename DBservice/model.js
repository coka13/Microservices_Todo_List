import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }  // add user field to associate with user
});

export const Todo = mongoose.model('Todo', todoSchema); 