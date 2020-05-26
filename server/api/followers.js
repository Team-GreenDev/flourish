const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/followers
const followersRouter = express.Router();

// Follow new user
followersRouter.post('/', (req, res) => {
  db.followNewUser(req, res)
    .then((data) => {
      console.log(data);
      res.status(200).send(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send(error);
    });
});

// Get all followers_ids from user_id
followersRouter.get('/user/:id', (req, res) => {
  db.getFollowersById(req, res)
    .then((followers) => res.status(200).send(followers))
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// Get all following ids from user_id
followersRouter.get('/following/:id', (req, res) => {
  db.getFollowingById(req, res)
    .then((followers) => res.status(200).send(followers))
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// un-follow user by id
followersRouter.patch('/unfollow', (req, res) => {
  db.unFollowUser(req, res)
    .then((follower) => res.status(201).send(follower))
    .catch((error) => res.status(500).send(error));
});


module.exports = {
  followersRouter,
};
