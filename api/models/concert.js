import {bookshelf} from '../db';

const Artists = bookshelf.Model.extend({
    tableName: 'artists',
    concerts: function () {
        return this.belongsToMany(Concerts)
    }
})


const Concerts = bookshelf.Model.extend({
    tableName: 'concerts',
    hasTimestamps: true,
    hasTimestamps: ['created_at', 'updated_at'],
    artists: function(){
        let artists = this.belongsToMany(Artists, 'concert_artists', 'concert_id', 'artist_id');
        return artists;
    }
});

export default Concerts;

