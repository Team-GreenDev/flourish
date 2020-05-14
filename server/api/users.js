const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/users
const usersRouter = express.Router();

// Get all users
usersRouter.get('/', (req, res) => {
  db.getAllUsers(req, res)
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send(error));
});

// Get a user by id
usersRouter.get('/:id', (req, res) => {
  db.getUsersById(req, res)
    .then((user) => res.status(200).send(user[0]))
    .catch((error) => res.status(500).send(error));
});

// Add user to database => { username, name_first, name_last }
usersRouter.post('/', (req, res) => {
  db.createUser(req, res)
    .then(() => res.status(201).send('User created!'))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  usersRouter,
};
