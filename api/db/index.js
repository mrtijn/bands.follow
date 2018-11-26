import knex from 'knex';
import config from '../knexfile.js';

let knexInstance = knex(config);
export default knexInstance



const bookshelf = require('bookshelf')(knexInstance);
export {bookshelf};

