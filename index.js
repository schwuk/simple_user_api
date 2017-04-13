'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const mongojs = require('mongojs');

const config = require('./config');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection(config.server);

server.app.db = mongojs(config.db.database, config.db.collections);

server.register([
  Inert,
  Vision,
  {
      'register': HapiSwagger,
      'options': config.swagger
  },
  require('./routes/users')
], (err) => {

  if (err) {
    throw err;
  }

  // Start the server
  server.start((err) => {
    console.log('Server running at:', server.info.uri);
  });

});
