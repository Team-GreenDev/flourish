const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/posts
const postsRouter = express.Router();

// Get all posts
postsRouter.get('/', (req, res) => {
  db.getAllPosts(req, res)
    .then((posts) => res.status(200).send(posts))
    .catch((error) => res.status(500).send(error));
});

// Get post from post id
postsRouter.get('/:id', (req, res) => {
  db.getPostById(req, res)
    .then((post) => res.status(200).send(post[0]))
    .catch((error) => res.status(500).send(error));
});

// Get all posts from user id
postsRouter.get('/user/:id', (req, res) => {
  db.getUserPosts(req, res)
    .then((posts) => res.status(200).send(posts))
    .catch((error) => res.status(500).send(error));
});

// Add post to database => { user_id, type, url }
postsRouter.post('/', (req, res) => {
  db.addPost(req, res)
    .then(() => res.status(201).send('Post created!'))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  postsRouter,
};
