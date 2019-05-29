"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_1 = __importDefault(require("@hapi/hapi"));
require('dotenv').config();
require("reflect-metadata");
const db_1 = __importDefault(require("./db"));
const good_1 = __importDefault(require("@hapi/good"));
// import * as Bell from '@hapi/bell';
const hapi_auth_jwt2_1 = __importDefault(require("hapi-auth-jwt2"));
const boom_1 = __importDefault(require("@hapi/boom"));
const User_controller_1 = __importDefault(require("./modules/user/User.controller"));
const artistModule = __importStar(require("./modules/artist"));
const concertModule = __importStar(require("./modules/concert"));
const userModule = __importStar(require("./modules/user"));
// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on("unhandledRejection", (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
const createServer = () => __awaiter(this, void 0, void 0, function* () {
    // init the DB
    yield new db_1.default().init();
    // create a server with a host and port
    const server = new hapi_1.default.Server({
        port: process.env.PORT
    });
    yield server.register(hapi_auth_jwt2_1.default);
    server.auth.strategy('jwt', 'jwt', { key: process.env.APP_SECRET,
        validate: new User_controller_1.default().validateUser,
        verifyOptions: { algorithms: ['HS256'] } // pick a strong algorithm
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
    server.ext('onPreResponse', (request, h) => {
        // Transform only server errors
        if (request.response && request.response instanceof boom_1.default) {
            console.error(request.response);
            return boom_1.default.boomify(request.response);
        }
        else {
            // Otherwise just continue with previous response
            return h.continue;
        }
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
    yield server.register({
        plugin: good_1.default,
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
});
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = yield createServer();
        yield server.start();
        console.log('Server running at:', server.info.uri);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map