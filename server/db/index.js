/* eslint-disable camelcase */
const mariadb = require('mariadb');
require('dotenv').config({ path: '/home/michael/thesis/flourish/.env' });

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


// create user
const createUser = (req) => {
  console.log(req.params.username);
  const { username, name_first, name_last } = req.params;

  return pool.query(`insert into users set username = '${username}', name_first = '${name_first}', name_last = '${name_last}', total_like = ${0}`);
};

// queries the data base for users based off of user id
const getUsersById = (req) => {
  const id = parseInt(req.params.id, 10);

  return pool.query(`SELECT * FROM users WHERE id = ${id}`);
};

// queries the database for users based off of post id
const getPostByPostId = (req) => {
  const id = parseInt(req.params.id, 10);

  return pool.query(`SELECT * FROM posts WHERE id = ${id}`);
};

// getCommentsByUserId = (req) => {
//   const id = parseInt(req.params.id, 10);

//   return pool.query(`SELECT * FROM `)
// }


module.exports = {
  getUsersById,
  getPostByPostId,
  createUser,
};
