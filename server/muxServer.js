const feathers = require('@feathersjs/feathers');
const app = feathers();
const bodyParser = require('body-parser');
const basicAuth = require('basic-auth');
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Setup the Mux SDK
const Mux = require('@mux/mux-node');

const { Video } = new Mux(process.env.MUX_TOKEN_ID, process.env.MUX_TOKEN_SECRET);
let STREAM;

// Storage Configuration
const util = require('util');
const fs = require('fs');

const stateFilePath = './.data/stream';
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);