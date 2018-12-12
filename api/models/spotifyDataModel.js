import { bookshelf } from '../db';
export default bookshelf.Model.extend({
    tableName: 'spotify_data',
})