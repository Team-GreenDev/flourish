const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/likes
const likesRouter = express.Router();

// Get a user's total likes
likesRouter.get('/:id', (req, res) => {
  db.getUserTotalLikes(req, res)
    .then((totalLikes) => {
      res.status(200).send(totalLikes[0]);
    })
    .catch((error) => {
      res.status(500).send(error);
      console.error(error);
    });
});

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

likesRouter.patch('/unlike', (req, res) => {
  db.unLikePost(req, res)
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
