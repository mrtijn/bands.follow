"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Knex = require("knex");
const objection_1 = require("objection");
const knex = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'bandsfollow'
    }
});
objection_1.Model.knex(knex);
//# sourceMappingURL=db.js.map