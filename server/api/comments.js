const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/comments
const commentsRouter = express.Router();

// Get all comments
commentsRouter.get('/', (req, res) => {
  db.getAllComments(req, res)
    .then((comments) => res.status(200).send(comments))
    .catch((error) => res.status(500).send(error));
});

// Get comments from post id
commentsRouter.get('/post/:id', (req, res) => {
  db.getCommentsFromPostId(req, res)
    .then((comments) => res.status(200).send(comments))
    .catch((error) => res.status(500).send(error));
});

// Get all comments from user id
commentsRouter.get('/user/:id', (req, res) => {
  db.getCommentsFromUserId(req, res)
    .then((comments) => res.status(200).send(comments))
    .catch((error) => res.status(500).send(error));
});

// Add comment to database => { user_id , post_id, comment_text }
commentsRouter.post('/', (req, res) => {
  db.addComment(req, res)
    .then(() => res.status(201).send('Added a comment!'))
    .catch((error) => res.status(500).send(error));
});

// Delete comment from database
commentsRouter.patch('/deletecomment', (req, res) => {
  db.deleteComment(req, res)
    .then((comment) => res.status(200).send(comment))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  commentsRouter,
};
