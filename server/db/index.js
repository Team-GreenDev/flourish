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

// gets all users from database
const getAllUsers = () => pool.query('select * from users');

// adds new user's information to database
const createUser = (req) => {
  const { username, name_first, name_last } = req.body;

  return pool.query(`insert into users set username = '${username}', name_first = '${name_first}', name_last = '${name_last}', total_like = ${0}`);
};

// queries the data base for users based off of user id
const getUsersById = (req) => {
  const id = parseInt(req.params.id, 10);

  return pool.query(`SELECT * FROM users WHERE id = ${id}`);
};


// adds new post's information to database
const addPost = (req) => {
  const user_id = parseInt(req.body.user_id, 10);
  const { created_at, type, url } = req.body;

  return pool.query(`INSERT INTO media set type = '${type}', url = '${url}'`)
    .then((media) => {
      pool.query(`INSERT INTO posts set user_id = ${user_id}, like_count = ${0}, media_id = ${media.insertId}, created_at = NOW()`);
    });
};

// adds a newly made comment to the database
const addComment = (req) => {
  const user_id = parseInt(req.body.user_id, 10);
  const post_id = parseInt(req.body.post_id, 10);
  const { comment_text } = req.body;

  return pool.query(`insert into comments set user_id = ${user_id}, post_id = ${post_id}, comment_text = '${comment_text}', created_at = NOW()`);
};

// queries the database for users based off of post id
const getPostByPostId = (req) => {
  const id = parseInt(req.params.id, 10);

  return pool.query(`SELECT * FROM posts WHERE id = ${id}`);
};

// queries the database for posts based off of user id
const getUserPosts = (req) => {
  const { user_id } = req.body;

  return pool.query(`select * from posts where user_id = ${user_id} order by created_at desc `);
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

const getAllPosts = () => pool.query('select * from posts order by created_at desc');


module.exports = {
  getAllUsers,
  getUsersById,
  getPostByPostId,
  createUser,
  addPost,
  addComment,
  getUserPosts,
  getUserMessages,
  getAllPosts,
};
