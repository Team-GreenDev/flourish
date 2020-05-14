const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/followers
const followersRouter = express.Router();


// Get all followers_ids from user_id
followersRouter.get('/user/:id', (req, res) => {
  db.getFollowersId(req, res)
    .then((followers) => res.status(200).send(followers))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  followersRouter,
};
