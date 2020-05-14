const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/tags
const tagsRouter = express.Router();

// Get all tags
tagsRouter.get('/', (req, res) => {
  db.getAllTags(req, res)
    .then((tags) => res.status(200).send(tags))
    .catch((error) => res.status(500).send(error));
});

// Add tag to database => { text }
tagsRouter.post('/', (req, res) => {
  db.addTag(req, res)
    .then(() => res.status(201).send('Added a tag!'))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  tagsRouter,
};
