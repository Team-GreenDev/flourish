/* eslint-disable camelcase */
const mariadb = require('mariadb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '/./../../.env') });

// Creates a connection to mariadb server
const pool = mariadb.createPool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});

// creates a new connection object to ensure mariadb is connected
pool.getConnection()
  .then((connection) => {
    console.log(`connected to db guys! connection id is:${connection.threadId} 🌲`);
    connection.release();
  })
  .catch((error) => {
    console.log(`not connected due to error: ${error}`);
  });


// USERS QUERIES //

// Gets all users
const getAllUsers = () => pool.query('select * from users');

// Adds new user
const createUser = (req) => {
  const { username, name_first, name_last, id, image_url } = req.body;
  return pool.query(`insert into users set id = ${id}, image_url = '${image_url}', username = '${username}', name_first = '${name_first}', name_last = '${name_last}', total_like = ${0}`);
};

// Gets user by id
const getUsersById = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`SELECT * FROM users WHERE id = ${id}`);
};


// POSTS QUERIES //

// Gets all posts
const getAllPosts = () => pool.query('select * from posts');

// Get post by id
const getPostById = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`SELECT * FROM posts WHERE id = ${id}`);
};

// Gets all posts by user from user id
const getUserPosts = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from posts where user_id = ${id} order by created_at desc `);
};

// Adds new post
const addPost = (req) => {
  const { text, url, user_id } = req.body;
  return pool.query(`INSERT INTO posts set user_id = ${user_id}, like_count = ${0}, url = '${url}', text = '${text}', created_at = NOW()`);
};


// COMMENTS QUERIES //

// Gets all comments
const getAllComments = () => pool.query('select * from comments');

// Gets all comments of a post by post id
const getCommentsFromPostId = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from comments where post_id = ${id} order by created_at desc `);
};

// Gets all comments of a user by user id
const getCommentsFromUserId = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from comments where user_id = ${id} order by created_at desc `);
};

// Add new comment to database
const addComment = (req) => {
  const user_id = parseInt(req.body.user_id, 10);
  const post_id = parseInt(req.body.post_id, 10);
  const { comment_text } = req.body;
  return pool.query(`insert into comments set user_id = ${user_id}, post_id = ${post_id}, comment_text = '${comment_text}', created_at = NOW()`);
};


// MESSAGES QUERIES //

// Gets all users
const getAllMessages = () => pool.query('select * from messages');

// Gets all messages for user recipient by recipient id
const getRecipientMessages = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from messages where recipient_id = ${id} order by created_at desc `);
};

// Gets all messages sent by user from user id
const getSentUserMessages = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from messages where user_id = ${id} order by created_at desc `);
};

// Add new message to database
const addMessage = (req) => {
  const user_id = parseInt(req.body.user_id, 10);
  const recipient_id = parseInt(req.body.recipient_id, 10);
  const { text } = req.body;
  return pool.query(`insert into messages set user_id = ${user_id}, recipient_id = ${recipient_id}, created_at = NOW(), text = '${text}'`);
};


// FOLLOWERS QUERIES //

// Get all followers_id from user_id
const getFollowersId = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from followers where user_id = ${id} order by created_at desc `);
};


// TAGS QUERIES //

// Gets all tags
const getAllTags = () => pool.query('select * from tags');

// Add new tag to database
const addTag = (req) => {
  const { text } = req.body;
  return pool.query(`insert into tags set text = '${text}'`);
};


// POST_TAGS QUERIES //

// Get all post_ids from tag_id
const getPostsFromTagId = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from post_tags where tag_id = ${id} order by created_at desc `);
};

// Get all tag_ids from post_id
const getTagsFromPostId = (req) => {
  const id = parseInt(req.params.id, 10);
  return pool.query(`select * from post_tags where post_id = ${id} order by created_at desc `);
};

const getUserMessages = (req) => {
  const { id } = req.params;
  const user_id = parseInt(id, 10);

  return pool.query(`select text, created_at, recipient_id from messages where user_id = ${user_id} order by created_at desc`);
  //     .then((message) => {
  //       const allRecipients = message.map((m) => m.recipient_id);
  //       console.log(allRecipients);

//       // pool.query(`select username from users where id = ${}`)
//     });
};


module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  getAllPosts,
  getUserPosts,
  getPostById,
  addPost,
  getAllComments,
  getCommentsFromPostId,
  getCommentsFromUserId,
  addComment,
  getAllMessages,
  getRecipientMessages,
  getSentUserMessages,
  addMessage,
  getFollowersId,
  getAllTags,
  addTag,
  getPostsFromTagId,
  getTagsFromPostId,
  getUserPosts,
  getUserMessages,
  getAllPosts,
};
