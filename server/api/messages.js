const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/messages
const messagesRouter = express.Router();

// Get all messages
messagesRouter.get('/', (req, res) => {
  db.getAllMessages(req, res)
    .then((messages) => res.status(200).send(messages))
    .catch((error) => res.status(500).send(error));
});

// Gets all messages for user recipient by recipient id
messagesRouter.get('/received/:id', (req, res) => {
  db.getRecipientMessages(req, res)
    .then((messages) => res.status(200).send(messages))
    .catch((error) => res.status(500).send(error));
});

// Gets all messages sent by user from user id
messagesRouter.get('/sent/:id', (req, res) => {
  db.getSentUserMessages(req, res)
    .then((messages) => res.status(200).send(messages))
    .catch((error) => res.status(500).send(error));
});

// Add message to database => { user_id, recipient_id, text }
messagesRouter.post('/', (req, res) => {
  db.addMessage(req, res)
    .then(() => res.sendStatus(201))
    .catch((error) => res.status(500).send(error));
});

// un-follow user by id
messagesRouter.patch('/', (req, res) => {
  db.deleteMessageThread(req, res)
    .then(() => res.sendStatus(204))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  messagesRouter,
};
