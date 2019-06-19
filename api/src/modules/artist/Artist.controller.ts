
// import { Artist } from './Artist.entity';
import Boom from '@hapi/boom';

import { BaseContext } from 'koa';
import ArtistService from './Artist.service';

export default class ArtistController {
    public async getAllArtists(ctx: BaseContext) {

        const artists = await ArtistService.getArtists({
            spotify_data: true
        });

        ctx.body =  artists;
    }

    public async getArtistById(ctx: BaseContext)  {
        const id = ctx.params.id;

        const artist = await ArtistService.getArtist(id, {
            spotify_data : true
        });

        if(!artist) throw Boom.notFound('Artist not found');

        ctx.body = artist;
    }


    public async createArtist(ctx: BaseContext) {

        const spotify_id = ctx.request.body as string;

        const artist = await ArtistService.createArtist(spotify_id);

        ctx.body = artist;
    }

    public async findArtist(ctx: BaseContext) {
        const searchQuery = ctx.query.searchQuery as string;

        const searchResult = await ArtistService.searchArtist(searchQuery);
        ctx.body =  searchResult;
    }
}