import hapi from "@hapi/hapi";
require('dotenv').config();
import "reflect-metadata";
import db from './db';
import good from '@hapi/good';
// import * as Bell from '@hapi/bell';
import hapiAuthJwt2 from 'hapi-auth-jwt2';
import Boom from '@hapi/boom';
import UserController from './modules/user/User.controller';

import * as artistModule from './modules/artist';
import * as concertModule from './modules/concert';
import * as userModule from './modules/user';
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
    port: process.env.PORT
  });

  await server.register(hapiAuthJwt2);

  server.auth.strategy('jwt', 'jwt',
  { key: process.env.APP_SECRET,          // Never Share your secret key
    validate: new UserController().validateUser,            // validate function defined above
    verifyOptions: { algorithms: [ 'HS256' ] } // pick a strong algorithm
  });

  server.auth.default('jwt');

  // await server.register(Bell);

  // server.auth.strategy('facebook', 'bell', {
  //     provider: 'facebook',
  //     password: 'aaaaabbbbbbccccccddddddeeeeeefffffffggggghhhhhiiiiiijjjjj',
  //     isSecure: false,
  //     clientId: process.env.FB_CLIENT_ID,
  //     clientSecret: process.env.FB_CLIENT_SECRET,
  //     // scope: ['email'],
  //     location: 'http://localhost:5000'
  // });

  server.ext('onPreResponse', (request: hapi.Request, h: hapi.ResponseToolkit) => {

    // Transform only server errors
    if (request.response && request.response instanceof Boom) {
      console.error(request.response);
      return Boom.boomify(request.response);
    } else {
      // Otherwise just continue with previous response
      return h.continue;
    }
  })

  const options = {
      ops: {
          interval: 1000
      },
      reporters: {
          'console-reporter': [
              {
                  module: '@hapi/good-squeeze',
                  name: 'Squeeze',
                  args: [{ log: '*', response: '*' }]
              },
              {
                  module: '@hapi/good-console'
              },
              'stdout'
          ]
      }
  };

  await server.register({
      plugin: good,
      options,
  });

  artistModule.init(server);
  concertModule.init(server);
  userModule.init(server);

  // console.log('register module')
  // // Add modules
  // // await server.register([artistModule, concertModule, userModule])

  // console.log(server);
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