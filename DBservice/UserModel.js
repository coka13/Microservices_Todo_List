import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: String,
});

export const User = mongoose.model('User', userSchema);