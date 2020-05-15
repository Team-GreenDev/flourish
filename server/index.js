
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const path = require('path');
var cors = require('cors')
const db = require('./db');
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

app.listen(8080).on('listening', () => console.log('Feathers server listening on localhost:8080'));
