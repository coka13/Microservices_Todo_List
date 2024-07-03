import { User } from "../UserModel.js";

// User services
export const getUserByEmail = (email)=> User.findOne({email});
export const getUserById = (id)=> User.findById(id)
export const addUser = (email) => User.create({email});
