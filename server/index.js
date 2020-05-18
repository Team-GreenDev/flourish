
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const ngrok = require('ngrok');
const path = require('path');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '/./../../.env') });
const { apiRouter } = require('./api/index');

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Applying cors middleware
app.use(cors());

// Parse HTTP JSON bodies
app.use(express.json());

// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));

// Utilizing api routes
app.use('/api', apiRouter);

// Host static files from the current folder
app.use(express.static(__dirname));

// Add REST API support
app.configure(express.rest());

// Configure Socket.io real-time APIs
app.configure(socketio());

// Register an in-memory messages service
// app.use('/messages', new MessageService());

// Register an error handler
app.use(express.errorHandler());

app.listen(process.env.PORT).on('listening', () => {
  console.log(`Feathers listening on localhost:${process.env.PORT}`);
  (async () => {
    await ngrok.connect({
      authtoken: process.env.NGROK_TOKEN,
      port: process.env.PORT,
      subdomain: process.env.NGROK_SUBDOMAIN,
    });
    console.log('Publicly available on ngrok subdomain 🌿');
  })();
});
