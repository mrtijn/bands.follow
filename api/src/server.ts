import hapi from "@hapi/hapi";
require('dotenv').config();
import "reflect-metadata";
import db from './db';
import routes from './routes';
import good from '@hapi/good';
import * as Bell from '@hapi/bell';


const createServer = async() => {

  // init the DB
  await new db().init();

  // create a server with a host and port
  const server: hapi.Server = new hapi.Server({
    port: process.env.PORT
  });

  await server.register(Bell);
  console.log(server.info.uri);
  server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: 'aaaaabbbbbbccccccddddddeeeeeefffffffggggghhhhhiiiiiijjjjj',
      isSecure: false,
      clientId: process.env.FB_CLIENT_ID,
      clientSecret: process.env.FB_CLIENT_SECRET,
      // scope: ['email'],
      location: 'http://localhost:5000'
  });

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

  // add the routes
  server.route(routes);

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