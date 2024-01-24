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
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  updatePost: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const post = await Post.updatePost(id, req.body);
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  deletePost: async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      const message = await Post.deletePost(id);
      res.json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const { from, to, interaction_date, interaction_cities_list, page, pageSize } = req.query;
      console.log('pagesize from postcontroller:' + pageSize)

      // Convert interaction_cities_list from comma-separated string to array
      const cities = interaction_cities_list ? interaction_cities_list.split(',') : null;

      let pageSizeInt = pageSize ? Number(pageSize) : 10;
      let pageInt = page ? Number(page) : 1;

      const maxPageSize = 100;
      if (pageSizeInt > maxPageSize) {
        throw new Error(`Page size cannot be greater than ${maxPageSize}`);
      }

      const posts = await Post.getAllPosts({ from, to, interaction_date, cities, pageInt, pageSizeInt });
      res.json(posts);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message }); 
    }
  }
};

export default PostController;


