require('dotenv').config();
import Koa from 'koa';
import logger from 'koa-logger';
import json from "koa-json";
import jwt from 'koa-jwt';
import bodyParser from "koa-bodyparser";
import etag from 'koa-etag';
import conditional from 'koa-conditional-get';
import cors from '@koa/cors';
import errorHandler from 'koa-better-error-handler';
import "reflect-metadata";
import db from './db';


import artistModule from './modules/artist';
import concertModule from './modules/concert';
import userModule from './modules/user';
import locationsModule from './modules/location';
// import ConcertController from './modules/concert/Concert.controller';

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});


const createApp = async() => {

  // init the DB
  await new db().init();

  // create a server with a host and port
  const app = new Koa();

  // Use koa-better-error-handling
  app.context.onerror = errorHandler;

  // Middlewares
  app
  .use(cors({
    exposeHeaders: 'eTag'
  }))
  .use(json())
  .use(logger())
  .use(bodyParser())
  .use(conditional())
  .use(etag())
  .use(
    jwt({ secret: process.env.APP_SECRET as string })
    .unless({
      path: [/\/user\/login/]
    })
  )

  // Modules
  app
  .use(userModule.middleware())
  .use(artistModule.middleware())
  .use(concertModule.middleware())
  .use(locationsModule.middleware());


  return app;
}

const startServer = async () => {
  try {
    const server = await createApp();

    await server.listen(5000, () => console.log(`✅  The server is running at http://localhost:5000/`));

  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

startServer();


