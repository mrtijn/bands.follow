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
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_etag_1 = __importDefault(require("koa-etag"));
const koa_conditional_get_1 = __importDefault(require("koa-conditional-get"));
const cors_1 = __importDefault(require("@koa/cors"));
const koa_better_error_handler_1 = __importDefault(require("koa-better-error-handler"));
require("reflect-metadata");
const db_1 = __importDefault(require("./db"));
const artist_1 = __importDefault(require("./modules/artist"));
const concert_1 = __importDefault(require("./modules/concert"));
const user_1 = __importDefault(require("./modules/user"));
const location_1 = __importDefault(require("./modules/location"));
// import ConcertController from './modules/concert/Concert.controller';
// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error) => {
    console.error(`uncaughtException ${error.message}`);
});
// Catch unhandling rejected promises
process.on("unhandledRejection", (reason) => {
    console.error(`unhandledRejection ${reason}`);
});
const createApp = () => __awaiter(this, void 0, void 0, function* () {
    // init the DB
    yield new db_1.default().init();
    // create a server with a host and port
    const app = new koa_1.default();
    // Use koa-better-error-handling
    app.context.onerror = koa_better_error_handler_1.default;
    // Middlewares
    app
        .use(cors_1.default({
        exposeHeaders: 'eTag',
        origin: '*'
    }))
        .use(koa_json_1.default())
        .use(koa_logger_1.default())
        .use(koa_bodyparser_1.default())
        .use(koa_conditional_get_1.default())
        .use(koa_etag_1.default())
        .use(koa_jwt_1.default({ secret: process.env.APP_SECRET })
        .unless({
        path: [/\/user\/login/]
    }));
    // Modules
    app
        .use(user_1.default.middleware())
        .use(artist_1.default.middleware())
        .use(concert_1.default.middleware())
        .use(location_1.default.middleware());
    return app;
});
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const server = yield createApp();
        yield server.listen(5000, () => console.log(`✅  The server is running at http://localhost:5000/`));
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
});
startServer();
//# sourceMappingURL=server.js.map