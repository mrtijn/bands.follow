import { bookshelf } from '../db';
import Concerts from './concertModel';
import spotifyData from './spotifyDataModel';


export default bookshelf.Model.extend({
    tableName: 'artists',
    spotify_data: function () {
        return this.hasOne(spotifyData, 'spotify_id', 'spotify_id');
    },
    concerts: function () {
        return this.belongsToMany(Concerts)
    }
})
