import {bookshelf} from '../db';
import Artists from './artistModel';

export default bookshelf.Model.extend({
    tableName: 'concerts',
    hasTimestamps: true,
    hasTimestamps: ['created_at', 'updated_at'],
    artists: function(){
        return this.belongsToMany(Artists, 'concert_artists', 'concert_id', 'artist_id');
    }
});



