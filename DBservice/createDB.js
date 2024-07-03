import mongoose from "mongoose";
import { Todo } from "./model.js";
import { User } from "./UserModel.js";

const MONGO_URI = "mongodb://mongodb:27017/todos";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    await insertSampleData();

  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the process on connection failure
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

const insertSampleData = async () => {
  try {
    // Clean existing data
    await Todo.deleteMany({});
    await User.deleteMany({});

    // Create sample users
    const user1 = await User.create({ email: "user1@example.com" });
    const user2 = await User.create({ email: "user2@example.com" });

    // Create sample todos associated with users
    const todos = [
      { task: "Do the dishes", completed: false, user: user1._id },
      { task: "Walk the dog", completed: true, user: user1._id },
      { task: "Buy some milk", completed: true, user: user2._id },
      { task: "Clean the house", completed: false, user: user2._id },
      { task: "Read a book", completed: false, user: user1._id },
      { task: "Go for a run", completed: true, user: user2._id },
      { task: "Call a friend", completed: false, user: user1._id },
    ];

    // Insert todos into the database
    await Todo.insertMany(todos);
    console.log("Sample data inserted successfully");

  } catch (error) {
    console.error("Error inserting sample data:", error.message);
    throw error; // Propagate the error to handle it in connectToMongoDB or elsewhere
  }
};

// Start the application by connecting to MongoDB and inserting sample data
connectToMongoDB();
