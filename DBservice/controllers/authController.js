import { getUserByEmail, addUser, getUserById } from "../services/authService.js";

// Controller function to add a new user
export const addUserController = async (req, res) => {
  try {
    // Check if the user already exists based on email
    const existingUser = await getUserByEmail(req.body.email);

    if (existingUser) {
      // If user already exists, return a 400 status with existing user details
      return res.status(400).json({ error: 'Email already exists', existingUser });
    } else {
      // If user doesn't exist, add the user with the provided email
      const user = await addUser(req.body.email);
      // Return success message with user details
      return res.status(200).json({
        error: false,
        message: 'User created successfully',
        user
      });
    }
  } catch (error) {
    // Catch any errors that occur during user creation
    console.error('Error creating user:', error.message);
    // Return 500 status with error message
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

// Controller function to get user by email
export const getUserController = async (req, res) => {
  try {
    // Fetch user details based on email query parameter
    const user = await getUserByEmail(req.query.email);

    if (user) {
      // If user exists, return user details with 200 status
      return res.status(200).json({ user, error: false });
    } else {
      // If user doesn't exist, return 404 status with error message
      return res.status(404).json({
        error: true,
        message: 'User not found',
        user
      });
    }
  } catch (error) {
    // Catch any errors that occur during user retrieval
    console.error('Error getting user:', error.message);
    // Return 500 status with error message
    res.status(500).json({ error: true, message: error.message });
  }
};

// Controller function to get user by ID
export const getUserByIdController = async (req, res) => {
  try {
    // Fetch user details based on userId parameter
    const user = await getUserById(req.params.userId);

    if (user) {
      // If user exists, return user details with 200 status
      return res.status(200).json({ user: user.toJSON(), error: false });
    } else {
      // If user doesn't exist, return 404 status with error message
      return res.status(404).json({
        error: true,
        message: 'User not found',
        user
      });
    }
  } catch (error) {
    // Catch any errors that occur during user retrieval
    console.error('Error getting user:', error.message);
    // Return 500 status with error message
    res.status(500).json({ error: true, message: error.message });
  }
};
