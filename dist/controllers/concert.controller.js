"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi_decorators_1 = require("hapi-decorators");
let concertController = class concertController {
    constructor() {
    }
    sayHello(request, reply) {
        reply({ message: `hello` });
    }
};
__decorate([
    hapi_decorators_1.get('/')
], concertController.prototype, "sayHello", null);
concertController = __decorate([
    hapi_decorators_1.controller('/concerts')
], concertController);
//# sourceMappingURL=concert.controller.js.map