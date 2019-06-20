import {getRepository, Repository, In} from "typeorm";
import Boom from '@hapi/boom';
import { Concert } from './Concert.entity';
import { Location } from '../location/Location.entity';
import { Artist } from '../artist/Artist.entity';
import SpotifyService from '../../services/spotify';
import { BaseContext } from 'koa';
import ArtistController from '../artist/Artist.controller';
import ArtistService from '../artist/Artist.service';


export default new class ConcertController {
    spotifyService = new SpotifyService();
    public async getAllConcerts(ctx: BaseContext) {
        const concertRepo : Repository<Concert> = getRepository(Concert);

        const concerts  = await concertRepo.find({
            relations: ['artists', 'location']
        });


        concerts.map( async (concert) => {
            const addSpotifyData = concert.artists.map(async (artist: Artist) => {
                artist.data = await this.spotifyService.enrichArtistData(artist.spotify_id)

                return artist;
            });
            await Promise.all(addSpotifyData);
            return concert;
        });
        ctx.body = concerts;
    }

    public async getConcertById(ctx: BaseContext)  {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const id = ctx.params.id;

        const concert : any = await concertRepo.findOne(id, {
            relations: ['artists', 'location']
        });

        if(!concert) return Boom.notFound('Artist not found');


        const addSpotifyData = concert.artists.map(async (artist: Artist) => {
            artist.data = await this.spotifyService.enrichArtistData(artist.spotify_id)
        });

        await Promise.all(addSpotifyData);


        ctx.body = concert;
    }

    public async createConcert(ctx: BaseContext) {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const locationRepo : Repository<Location> = getRepository(Location);

        const payload = ctx.request.body as {
            name: string,
            artists: Array<string>
            location: number
        };

        if(await concertRepo.findOne({name: payload.name})) throw Boom.conflict('Concert already exists');

        const concert = new Concert();
        concert.name = payload.name;

        const location = await locationRepo.findOne({id: payload.location});
        if(!location) throw Boom.notFound('Given location does not exist');
        concert.location = location;

        // Get artists Objects
        const artistArray: Array<Artist> = [];
        payload.artists.forEach( async (artistSpotifyId) => {

            const artistExists = await artistRepo.findOne({
                where: { spotify_id : artistSpotifyId }
            });

            if(artistExists){
                artistArray.push(artistExists);
            }else {

                const artist = await ArtistService.createArtist(artistSpotifyId);
                if(artist){
                    artistArray.push(artist);
                }

            }
        });

        concert.artists = artistArray;

        concert.artists =  await artistRepo.find({
            where: { spotify_id: In(payload.artists) }
        });


        await concertRepo.save(concert);

        ctx.body = concert;
    }
}