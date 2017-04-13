'use strict';

const Pack = require('./package');

let config = {};

config.server = {
  host: 'localhost',
  port: 3000
};

config.db = {
  database: 'simple_user',
  collections: [
    'users'
  ]
};

config.swagger = {
  'documentationPath': '/',
  info: {
    'title': 'Simple user API Documentation',
    'version': Pack.version
  }
};

module.exports = config;
