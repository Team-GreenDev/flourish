const mariadb = require('mariadb');
require('dotenv').config();

mariadb.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
})
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.error(err);
  });
