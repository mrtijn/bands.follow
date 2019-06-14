import hapi from "@hapi/hapi";
require('dotenv').config();
import "reflect-metadata";
import db from './db';
import Good from '@hapi/good';

import hapiAuthJwt2 from 'hapi-auth-jwt2';

import UserController from './modules/user/User.controller';

import * as artistModule from './modules/artist';
import * as concertModule from './modules/concert';
import * as userModule from './modules/user';
import * as locationsModule from './modules/location';

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});


const createServer = async() => {

  // init the DB
  await new db().init();

  // create a server with a host and port
  const server: hapi.Server = new hapi.Server({
    port: process.env.PORT,
    routes: {
      cors: true
    }
  });

  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt',
  { key: process.env.APP_SECRET,          // Never Share your secret key
    validate: new UserController().validateUser,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });

  server.auth.default('jwt');

  const options = {
      ops: {
          interval: 1000
      },
      reporters: {
          consoleReporter: [
              {
                  module: '@hapi/good-squeeze',
                  name: 'Squeeze',
                  args: [{
                    error: "*",
                    log: "*",
                    response: "*",
                    request: "*"
                  }]
              },
              {
                  module: '@hapi/good-console'
              },
              'stdout'
          ]
      }
  };

  await server.register({
      plugin: Good,
      options,
  });

  artistModule.init(server);
  concertModule.init(server);
  userModule.init(server);
  locationsModule.init(server);

  return server;
}

const startServer = async () => {
  try {
    const server = await createServer();

    await server.start()
    console.log('Server running at:', server.info.uri);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();