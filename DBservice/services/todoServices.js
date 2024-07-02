import { Todo } from "../model.js";

export const getTodosService = (user) => Todo.find({ user: user });
export const updateTodoService = (id, completed) => Todo.findByIdAndUpdate(id, { completed: Boolean(completed) });
export const addTodoService = (task, id) => Todo.create({ task: task, completed: false, user: id });
export const deleteTodoByIDService = (id) => Todo.findByIdAndDelete(id);