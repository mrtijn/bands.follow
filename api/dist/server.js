"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = require("hapi");
const routes_1 = require("./routes");
require('./db');
// create a server with a host and port & additional options
const server = new hapi.Server({
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
server.route(routes_1.default);
// start the server
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.start();
        }
        catch (err) {
            console.log(err);
            process.exit(1);
        }
        console.log('Server running at:', server.info.uri);
    });
}
// don't forget to call start
start();
//# sourceMappingURL=server.js.map