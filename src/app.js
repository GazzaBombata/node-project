import express from 'express';
import bodyParser from 'body-parser';
import { User, Interaction, Post } from './models/index.js';

const app = express();

app.use(bodyParser.json());

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

app.get('/', (req, res) => {
    res.send('Hello, World node-project!');
  });

// Create a new user
app.post('/users', async (req, res) => {
    try {
        const user = await User.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await User.getUser(id);
        res.json(user);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Update a user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const user = await User.updateUser(id, req.body);
        res.json(user);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const message = await User.deleteUser(id);
        res.json(message);
    } catch (error) {
        if (error.message === 'User not found') {
            res.status(404).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
});

// CRUD operations for Post model
app.post('/posts', async (req, res) => {
    try {
        const post = await Post.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const post = await Post.getPost(id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const post = await Post.updatePost(id, req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/posts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const message = await Post.deletePost(id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CRUD operations for Interaction model
app.post('/interactions', async (req, res) => {
    try {
        const interaction = await Interaction.createInteraction(req.body);
        res.status(201).json(interaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/interactions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const interaction = await Interaction.getInteraction(id);
        res.json(interaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/interactions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const interaction = await Interaction.updateInteraction(id, req.body);
        res.json(interaction);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/interactions/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const message = await Interaction.deleteInteraction(id);
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all posts with interactions
app.get('/posts', async (req, res) => {
    try {
        console.log(req.query)
        const { from, to, interaction_date, interaction_cities_list } = req.query;
        // Convert interaction_cities_list from comma-separated string to array
        const cities = interaction_cities_list ? interaction_cities_list.split(',') : null;

        const posts = await Post.getAllPosts({ from, to, interaction_date, cities });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));