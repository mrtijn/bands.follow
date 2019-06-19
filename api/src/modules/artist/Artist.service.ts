import SpotifyService from '../../services/spotify';
import Boom from 'boom';
import {getRepository, Repository} from "typeorm";

import { Artist } from './Artist.entity';
import { createArtist } from './Artist.validations';
const spotifyService = new SpotifyService();

type artistOptions = {
    spotify_data : Boolean
}

export default {
    async getArtists(params: artistOptions) : Promise<Array<Artist>>{
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const artists  = await artistRepo.find();

        if(params.spotify_data) {

            const addSpotifyData = artists.map(async (artist: Artist) => {
                artist.data = await spotifyService.enrichArtistData(artist.spotify_id)
            });

            await Promise.all(addSpotifyData);
        }

        return artists;
    },

    async getArtist(id: string, params: artistOptions) : Promise<Artist | undefined>{
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const artist = await artistRepo.findOne(id,
            {
                relations: ['concerts']
            }
        );

        if(artist && params.spotify_data) {
            artist.data = await spotifyService.enrichArtistData(artist.spotify_id);
        }

        return artist;
    },

    async createArtist(spotify_id: string) {
        const artistRepo : Repository<Artist> = getRepository(Artist);

        const spotifyArtist = await spotifyService.getArtistById(spotify_id);
        if(!spotifyArtist) throw new Error('kapot!');

        const data = {
            name: spotifyArtist.name,
            spotify_id: spotifyArtist.id
        }

        const artist = await artistRepo.create(data);
        await artistRepo.save(artist);
        return artist;
    },

    async searchArtist(searchQuery: string) {
        const searchResult = await spotifyService.findArtist(searchQuery);
        return searchResult;
    },

    async checkIfArtistExists(name: string) {
        const artistRepo : Repository<Artist> = getRepository(Artist);
        if(await artistRepo.findOne({name: name})) return Boom.conflict('Artist already exists');
        return false;

    },

    async checkIfArtistExistsBySpotifyId(spotify_id: string) {
        const artistRepo : Repository<Artist> = getRepository(Artist);
        if(await artistRepo.findOne({spotify_id: spotify_id})) return Boom.conflict('Artist already exists');
        return false;
    }
}