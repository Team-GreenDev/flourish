const express = require('@feathersjs/express');
const { commentsRouter } = require('./comments');
const { followersRouter } = require('./followers');
const { messagesRouter } = require('./messages');
const { postsRouter } = require('./posts');
const { postTagsRouter } = require('./postTags');
const { tagsRouter } = require('./tags');
const { usersRouter } = require('./users');

const apiRouter = express.Router();

apiRouter.use('/comments', commentsRouter);
apiRouter.use('/followers', followersRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/postTags', postTagsRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);

module.exports = {
  apiRouter,
};
