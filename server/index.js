
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const db = require('./db');
// Creates an ExpressJS compatible Feathers application
const app = express(feathers());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Host static files from the current folder
app.use(express.static(__dirname));
// Add REST API support
app.configure(express.rest());
// Configure Socket.io real-time APIs
app.configure(socketio());
// // Register an in-memory messages service
// app.use('/messages', new MessageService());
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

app.listen(8080).on('listening', () => console.log('Feathers server listening on localhost:8080'));

// get request to get a user based off of id
app.get('/api/users/:id', (req, res) => {
  db.getUsersById(req, res)
    .then((user) => {
      res.status(200).send(user[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// get request to get post based off of id
app.get('/api/post/:id', (req, res) => {
  db.getPostByPostId(req, res)
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// post request to add user to database 
app.post('/api/user/:username/:name_first/:name_last', (req, res) => {
  db.createUser(req, res)
    .then(() => res.status(200).send())
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});
