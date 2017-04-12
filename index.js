'use strict';

let Hapi = require('hapi');
let mongoose = require('mongoose');
let restHapi = require('rest-hapi');



function api(){

    let server = new Hapi.Server();

    server.connection({
      host: 'localhost',
      port: 3000
    });

    let config = {
        appTitle: "Simple user API",
        docExpansion: 'list',
        mongo: {
          URI: 'mongodb://localhost/simple_user'
        }
    };

    restHapi.config = config;

    server.register({
      register: restHapi,
      options: {
          mongoose: mongoose
      }
    },
    function() {
      server.start((err) => {

        if (err) {
          throw err;
        }
        console.log(`Server running at: ${server.info.uri}`);
      });
    });

    return server;
}

module.exports = api();
