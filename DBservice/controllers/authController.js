import { getUserByEmail, addUser,getUserById } from "../services/authService.js";

export const addUserController = async (req, res) => {
  try {
    const existingUser = await getUserByEmail(req.body.email);

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists', existingUser });
    } else {

      const user = await addUser(req.body.email);
      return res.status(200).json({
        error: false,
        message: 'User created successfully',
        user
      })
    }

  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }

}
export const getUserController = async (req, res) => {
  try {
    const user = await getUserByEmail(req.query.email);

    if (user) {
      return res.status(200).json({ user, error: false });
    } else {

      return res.status(404).json({
        error: true,
        message: 'User not found',
        user
      })
    }

  } catch (error) {
    console.error('Error getting user:', error.message);
    res.status(500).json({ error: true, message:error.message });
  }

}

export const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);

    if (user) {
      return res.status(200).json({ user:user.toJSON(), error: false });
    } else {

      return res.status(404).json({
        error: true,
        message: 'User not found',
        user
      })
    }

  } catch (error) {
    console.error('Error getting user:', error.message);
    res.status(500).json({ error: true, message:error.message });
  }

}
