const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./utils/logger');
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

const middlewares = require('./middlewares');
const services = require('./endpoints');
const appHooks = require('./app.hooks');
const channels = require('./channels');

// connections
const mongo = require('./connections/mongo');
const web3 = require('./connections/web3');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
app.configure(web3());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());
app.configure(mongo());


// Set up our services (see `services/index.js`)
app.configure(services);

// Set up event channels (see channels.js)
app.configure(channels);

// Configure other middleware (see `middleware/index.js`)
app.configure(middlewares);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
