import * as hapi from "hapi";
import routes from './routes';
require('./db');
// create a server with a host and port & additional options
const server: hapi.Server = new hapi.Server({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with', 'token']
        }
    }
});

// Add routes
server.route(routes);

// start the server
async function start() {
    try {
        await server.start()
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    console.log('Server running at:', server.info.uri);
}
// don't forget to call start
start();