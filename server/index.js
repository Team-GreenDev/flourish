
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const db = require('./db');


// A messages service that allows to create new
// and return all existing messages
class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    // Just return all our messages
    return this.messages;
  }

  async create(data) {
    // The new message is the data merged with a unique identifier
    // using the messages length since it changes whenever we add one
    const message = {
      id: this.messages.length,
      text: data.text,
    };

    // Add new message to the list
    this.messages.push(message);

    return message;
  }
}

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
app.configure(socketio(8081));

// Register an in-memory messages service
app.use('/directmessages', new MessageService());

// Register an error handler
app.use(express.errorHandler());

// Add any new real-time connection to the `everybody` channel
app.on('connection', (connection) => app.channel('everybody').join(connection));
// Publish all events to the `everybody` channel
app.publish((data) => app.channel('everybody'));

// landing page route
app.get('/api', (req, res) => {
  res.status(200).send('Welcome to Flourish!');
});

// get request to get a user based off of id
app.get('/api/user/:id', (req, res) => {
  db.getUsersById(req, res)
    .then((user) => {
      res.status(200).send(user[0]);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// post request to add user to database
app.post('/api/user/', (req, res) => {
  db.createUser(req, res)
    .then(() => res.status(200).send())
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

// get all posts from the data base
app.get('/api/post', (req, res) => {
  db.getAllPosts(req, res)
    .then(() => res.status(200).send())
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});
// save a new post to the database
app.post('/api/post', (req, res) => {
  db.addPost(req, res)
    .then(() => res.status(200).send())
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

// save a new comment to the database
app.post('/api/comment/', (req, res) => {
  db.addComment(req, res)
    .then((result) => {
      res.status(200).send();
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});

app.get('/api/messages/:id', (req, res) => {
  db.getUserMessages(req, res)
    .then((messages) => {
      res.status(200).send(messages);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send();
    });
});
app.listen(8080).on('listening', () => console.log('Feathers server listening on localhost:8080'));

// For good measure let's create a message
// So our API doesn't look so empty
app.service('directmessages').create({
  text: 'Hello world from the server',
});
