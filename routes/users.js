'use strict';

const Boom = require('boom');
const uuid = require('node-uuid');
const Joi = require('joi');

exports.register = function(server, options, next) {

  const db = server.app.db;

  server.route({
    method: 'GET',
    path: '/users',
    handler: function (request, reply) {
      db.users.find((err, docs) => {
        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }
        reply(docs);
      });
    },
    config: {
      description: 'Get all users',
      notes: 'Returns all users',
      tags: ['api']
    }
  });

  server.route({
    method: 'GET',
    path: '/users/{id}',
    handler: function (request, reply) {

      db.users.findOne({
          _id: request.params.id
      }, (err, doc) => {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (!doc) {
          return reply(Boom.notFound());
        }

        reply(doc);
      });

    },
    config: {
      description: 'Retrieve a single user',
      notes: 'Retrieves a single user',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
          .required()
          .description('Identifier of the user to retrieve')
        }
      }
    },
  });

  server.route({
    method: 'POST',
    path: '/users',
    handler: function (request, reply) {

      const user = request.payload;

      user._id = uuid.v1();
      let now = new Date();
      user.createdAt = now;
      user.updatedAt = now;

      db.users.save(user, (err, result) => {

        if (err) {
            return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        reply(user);
      });
    },
    config: {
      description: 'Create a new user',
      notes: 'Creates a new user',
      tags: ['api'],
      validate: {
        payload: {
          firstname: Joi.string()
            .required()
            .description('First name'),
          surname: Joi.string()
            .required()
            .description('Surname'),
          email: Joi.string()
            .required()
            .description('Email address'),
        }
      }
    }
  });

  server.route({
    method: 'PATCH',
    path: '/users/{id}',
    handler: function (request, reply) {
        const user = request.payload;
        user.updatedAt = new Date();

        db.users.update({_id: request.params.id}, {$set: user}, function (err, result) {
            if (err) {
                return reply(Boom.wrap(err, 'Internal MongoDB error'));
            }

            if (result.n === 0) {
                return reply(Boom.notFound());
            }

            reply().code(204);
        });
    },
    config: {
      description: 'Update an existing user',
      notes: 'Updates an existing user',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
          .required()
          .description('Identifier of the user to update')
        },
        payload: {
          firstname: Joi.string()
            .required()
            .description('First name'),
          surname: Joi.string()
            .required()
            .description('Surname'),
          email: Joi.string()
            .required()
            .description('Email address'),
        }
      }
    }
  });

  server.route({
    method: 'DELETE',
    path: '/users/{id}',
    handler: function (request, reply) {

      db.users.remove({
        _id: request.params.id
      }, function (err, result) {

        if (err) {
          return reply(Boom.wrap(err, 'Internal MongoDB error'));
        }

        if (result.n === 0) {
          return reply(Boom.notFound());
        }

        reply().code(204);
      });
    },
    config: {
      description: 'Delete an existing user',
      notes: 'Deletes an existing user',
      tags: ['api'],
      validate: {
        params: {
          id: Joi.string()
          .required()
          .description('Identifier of the user to delete')
        }
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'routes-users'
};
