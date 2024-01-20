import { Post } from '../models/index';

const PostController = {
  createPost: async (req, res) => {
    try {
      const post = await Post.createPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPost: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const post = await Post.getPost(id);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const post = await Post.updatePost(id, req.body);
      res.json(post);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const message = await Post.deletePost(id);
      res.json(message);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const { from, to, interaction_date, interaction_cities_list, page, pageSize } = req.query;
      // Convert interaction_cities_list from comma-separated string to array
      const cities = interaction_cities_list ? interaction_cities_list.split(',') : null;

      const posts = await Post.getAllPosts({ from, to, interaction_date, cities, page, pageSize });
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};


