const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/auth
const authRouter = express.Router();

// This will simply get the user by the id hardcoded                            //
// Trying out login functionality with dummy data until login is functional     //

// Get a user by id
authRouter.get('/:id', (req, res) => {
  db.getUsersById(req, res)
    .then((user) => res.status(200).send(user[0]))
    .catch((error) => res.status(500).send(error));
});

// Add user to database => { username, name_first, name_last, id, image_url }
authRouter.post('/', (req, res) => {
  db.createUser(req, res)
    .then(() => res.status(201).send(req.body))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  authRouter,
};
