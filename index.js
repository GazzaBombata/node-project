import express from 'express';
import { createUser, updateUserById, deleteUserById, getUsers } from './models/UserModel.js';
import { createPost, updatePostById, deletePostById, getPosts } from './models/PostModel.js';
import { createInteraction, updateInteractionById, deleteInteractionById, getInteractions } from './models/InteractionModel.js';

const app = express();
app.use(express.json());

// User routes
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);
app.get('/users', getUsers);

// Post routes
app.post('/posts', createPost);
app.put('/posts/:id', updatePostById);
app.delete('/posts/:id', deletePostById);
app.get('/posts', getPosts);

// Interaction routes
app.post('/interactions', createInteraction);
app.put('/interactions/:id', updateInteractionById);
app.delete('/interactions/:id', deleteInteractionById);
app.get('/interactions', getInteractions);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));