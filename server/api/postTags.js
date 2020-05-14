const express = require('@feathersjs/express');
const db = require('../db');

// Handles all requests to /api/postTags
const postTagsRouter = express.Router();


// Get all post_ids from tag_id
postTagsRouter.get('/posts/:id', (req, res) => {
  db.getPostsFromTagId(req, res)
    .then((postIds) => res.status(200).send(postIds))
    .catch((error) => res.status(500).send(error));
});

// Get all tags_ids from post_id
postTagsRouter.get('/tags/:id', (req, res) => {
  db.getTagsFromPostId(req, res)
    .then((tagIds) => res.status(200).send(tagIds))
    .catch((error) => res.status(500).send(error));
});

module.exports = {
  postTagsRouter,
};
