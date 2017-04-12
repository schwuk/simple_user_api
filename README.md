# Simple user API

The brief for this project is:

> Create an API to manage a user persistence layer.
>
> It must expose a user model and it's reasonable to expect that an individual user would have the following attributes:
>
> -	**id** - *A unique user id*  
> -	**email** - *A users email address*  
> -	**forename** - *A users first name*  
> -	**surname** - *A users last name*  
> -	**created** - *The date and time the user was added*
>
> It must have the ability to persist user information for at least the lifetime of the test.
>
> Your API must expose functionality to create, read, update and delete (CRUD) models.
>
> Stretch goals:
> - How your API is to be consumed (a custom interface or something like Google Chrome's "Postman" or Swagger).
> - Use of an industry standard data exchange format.
> - Sanitisation checks of inputs.
> - Implementation of test coverage.

Instead of building a solution from scratch, I have taken the opportunity to explore [hapi](https://hapijs.com/) which – especially when coupled with [rest-hapi](https://jkheadley.github.io/rest-hapi/) – trivialises creating a solution that satisfies both the brief and several of the stretch goals.

## Features

 - A user model with the following attributes:
  - `_id`
  - `firstname`
  - `lastname`
  - `email`
  - `createdAt`
  - `updatedAt`
 - Persistent storage in [MongoDB](https://www.mongodb.com/what-is-mongodb) (via [mongoose](http://mongoosejs.com/))
 - Model validation via [Joi](https://github.com/hapijs/joi)
 - Documentation/demonstration via [Swagger](http://swagger.io/)

## Installation

This solution expects you to be running MongoDB locally _without_ authentication (i.e., development mode). If your configuration is different you will need to modify the connection URL in `index.js`.

Dependencies are installed with `npm`:

```
$ npm install
```

## Running

The server can be started with:

```
$ npm start
```

The server can be accessed on http://localhost:3000. By default you will be shown the documentation for the API, detailing the methods available, and the expected data.
