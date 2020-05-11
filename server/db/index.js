const mariadb = require('mariadb');
require('dotenv').config();

const connection = mariadb.createConnection({
  user: 'root',
  host: 'localhost',
  database: 'test',
  password: 'test',
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.error(err);
  });
