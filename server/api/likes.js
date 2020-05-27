const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/likes
const likesRouter = express.Router();

// adds and removes likes from any user and post
likesRouter.post('/', (req, res) => {
  db.likePost(req, res)
    .then((like) => {
      res.status(201).send(like);
      console.log(like);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

module.exports = {
  likesRouter,
};
