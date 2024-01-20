import { User } from '../models/index.js';

const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await User.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await User.getUser(id);
      res.json(user);
    } catch (error) {
      console.log(error);
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  updateUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await User.updateUser(id, req.body);
      res.json(user);
    } catch (error) {
      console.log(error);
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const message = await User.deleteUser(id);
      res.json(message);
    } catch (error) {
      console.log(error);
      if (error.message === 'User not found') {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },
};

export default UserController;
