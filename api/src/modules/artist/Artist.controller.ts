import {getRepository, Repository} from "typeorm";
import * as hapi from 'hapi';
import { Artist } from './Artist.entity';
import Boom from '@hapi/boom';
import SpotifyService from '../../services/spotify';

export default class ArtistController {
    spotifyService = new SpotifyService();

    public async getAllArtist(): Promise<Array<Artist>> {
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const artists  = await artistRepo.find();
        const addSpotifyData = artists.map(async (artist: any) => {
            console.log(artist.spotify_id);
            artist.spotify_data = await this.spotifyService.getArtistById(artist.spotify_id);
        })
        await Promise.all(addSpotifyData);

        return artists;
    }

    public async getArtistById(req: hapi.Request)  {
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const id = req.params.id;

        const artist : any =
            await artistRepo.findOne(id,
                {
                    relations: ['concerts']
                }
            );

        if(!artist) throw Boom.notFound('Artist not found');

        artist.spotify_data = await this.spotifyService.getArtistById(artist.spotify_id);

        return artist;
    }


    public async createArtist(req: hapi.Request) {
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const payload = req.payload as Artist;

        if(await artistRepo.findOne({name: payload.name})) throw Boom.conflict('Artist already exists');

        const artist : Artist  = await artistRepo.create(payload);

        await artistRepo.save(artist);

        return artist;
    }

    public async findArtist(req: hapi.Request) {
        const searchQuery = req.query.searchQuery as string;
        const searchResult = this.spotifyService.findArtist(searchQuery);
        return searchResult;
    }
}