'use strict';
import routes from './router';
// FREE APIS
// https://github.com/toddmotto/public-apis#music

const Hapi = require('hapi');


const app = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
        cors: { 
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with', 'token'] 
        }
    }
});



const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
};



const init = async () => {

    await app.register({
        plugin: require('good'),
        goodOptions,
    });    
    await app.register(require('hapi-error'));
    await app.register(require('./plugins/spotify'));

    app.route(routes);
    app.state('data', {
        ttl: 1000 * 60 * 60 * 24,
        encoding: 'base64json',
    });


    await app.start();
    console.log(`Server running at: ${app.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();