const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/likes
const likesRouter = express.Router();

// get all posts that have been liked by user
likesRouter.get('/user/:id', (req, res) => {
  db.getAllLikedPosts(req, res)
    .then((data) => res.status(200).send(data))
    .catch(() => res.status(500));
});

// adds and removes likes from any user and post
likesRouter.post('/', (req, res) => {
  db.likePost(req, res)
    .then((like) => {
      res.status(201).send(like);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

module.exports = {
  likesRouter,
};
