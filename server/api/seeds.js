const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/seeds
const seedsRouter = express.Router();

// Get a user by id
seedsRouter.get('/:id', (req, res) => {
  db.getSeedCount(req, res)
    .then((count) => res.status(200).send(count))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  seedsRouter,
};
