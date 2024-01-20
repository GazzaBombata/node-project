import express from 'express';
import bodyParser from 'body-parser';
import UserController from './controllers/UserController.js';
import PostController from './controllers/PostController.js';
import InteractionController from './controllers/InteractionController.js';

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
      return res.status(400).send({ message: 'Invalid JSON' }); // Bad request
  }
  next();
});

app.get('/', (req, res) => {
    res.send('Hello, World by node-project!');
  });

// CRUD operations for User model
app.post('/users', UserController.createUser);
app.get('/users/:id', UserController.getUser);
app.put('/users/:id', UserController.updateUser);
app.delete('/users/:id', UserController.deleteUser);

// CRUD operations for Post model
app.post('/posts', PostController.createPost);
app.get('/posts/:id', PostController.getPost);
app.put('/posts/:id', PostController.updatePost);
app.delete('/posts/:id', PostController.deletePost);

// Get all posts
app.get('/posts', PostController.getAllPosts);

// CRUD operations for Interaction model
app.post('/interactions', InteractionController.createInteraction);
app.get('/interactions/:id', InteractionController.getInteraction);
app.put('/interactions/:id', InteractionController.updateInteraction);
app.delete('/interactions/:id', InteractionController.deleteInteraction);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));