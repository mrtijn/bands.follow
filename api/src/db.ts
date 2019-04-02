import * as Knex from 'knex';
import { Model } from 'objection';

const knex = Knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'bandsfollow'
    }
});

Model.knex(knex);


