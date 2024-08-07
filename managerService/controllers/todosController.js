import AxiosFetch from "../axiosFetch.js";
import { connectQueue } from "../lib/amqp.js";
import dotenv from "dotenv";

dotenv.config(); // fetch .env variables
const axiosInstance = new AxiosFetch();

export const completedTodos = async (req, res) => {

  try {
    // Fetch all todos from the first microservice
    const response = await axiosInstance.get(
      `${process.env.SERVICE1_URL}/api/todos?userId=${req.query.userId}`);

    const todos = response.data;

    let stats;

    if (!Array.isArray(todos) || todos.length === 0) {
      // If todos is not an array or empty, set counts to 0
      stats = {
        completedTodos: 0,
        incompleteTodos: 0,
      };
    } else {
      // Calculate number of completed todos
      const completedCount = todos.filter((todo) => todo.completed).length;

      // Calculate number of incomplete todos
      const incompleteCount = todos.filter((todo) => !todo.completed).length;

      stats = {
        completedTodos: completedCount,
        incompleteTodos: incompleteCount,
      };
    }

    console.log("Stats computed:", stats);
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error occurred:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching ToDo statistics" });
  }
};

export const changeStatusController = async (req, res) => {
  try {
    // Get parameters from request
    const { id } = req.params;
    const { completed } = req.body;

    console.log("Updating ToDo status with id:", id, completed);

    let channel = await connectQueue();

    let data = { id: id, completed: completed, action: "update",user_email: req.user.email };

    // Producer method, will create rabbitmq jobs
    channel.sendToQueue(
      process.env.QUEUE_NAME,
      Buffer.from(JSON.stringify(data))
    );
    res.status(200).json({ data: { id, completed } });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating ToDo status" });
  }
};

export const addNewTodoController = async (req, res) => {
  try {
    // Get the new todo from request body
    const { task, user } = req.body;
    console.log("Adding new todo:", task);

    // Send a POST request to the first microservice to add the new todo
    //const response = await axiosInstance.post(`${process.env.SERVICE1_URL}/api/todos/add`, { task });

    let channel = await connectQueue();

    let data = { task: task, user, action: "add",user_email: req.user.email};

    // Producer method, will create rabbitmq jobs
    channel.sendToQueue(
      process.env.QUEUE_NAME,
      Buffer.from(JSON.stringify(data))
    );

    res.status(200).json({ data: task });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ error: "An error occurred while adding new ToDo" });
  }
};

export const deleteTodoController = async (req, res) => {
  try {
    // Get the todo id from request
    const { id } = req.params;
    console.log("Deleting ToDo with id:", id);
    let channel = await connectQueue();
    let data = { id: id, action: "delete",user_email: req.user.email };

    // Producer method, will create rabbitmq jobs
    channel.sendToQueue(
      process.env.QUEUE_NAME,
      Buffer.from(JSON.stringify(data))
    );

    res.status(200).json({ data: id });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ error: "An error occurred while deleting ToDo" });
  }
};
