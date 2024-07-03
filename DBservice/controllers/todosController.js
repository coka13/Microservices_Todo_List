import { getTodosService } from "../services/todoServices.js";

// Controller function to get all todos for a user
export const getTodosController = async (req, res) => {
  try {
    // Call service to fetch todos based on userId query parameter
    const todos = await getTodosService(req.query.userId);

    // Check if no todos were found
    if (!todos || todos.length === 0) {
      // If no todos found, return appropriate response
      if (todos.length === 0) {
        res.status(200).json({});
      } else {
        return res.status(404).json({ error: 'Todos not found' });
      }
    } else {
      // If todos found, return them with 200 status
      res.status(200).json(todos);
    }
  } catch (error) {
    // Catch any errors that occur during todo retrieval
    console.error('Error retrieving Todos:', error.message);
    // Return 500 status with error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
