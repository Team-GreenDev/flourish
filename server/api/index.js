const express = require('@feathersjs/express');
const { authRouter } = require('./auth');
const { commentsRouter } = require('./comments');
const { followersRouter } = require('./followers');
const { messagesRouter } = require('./messages');
const { postsRouter } = require('./posts');
const { postTagsRouter } = require('./postTags');
const { tagsRouter } = require('./tags');
const { usersRouter } = require('./users');
const { likesRouter } = require('./likes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/followers', followersRouter);
apiRouter.use('/messages', messagesRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/postTags', postTagsRouter);
apiRouter.use('/tags', tagsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/likes', likesRouter);

module.exports = {
  apiRouter,
};
