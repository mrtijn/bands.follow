import {getRepository, Repository, In} from "typeorm";
import * as hapi from 'hapi';
import Boom from '@hapi/boom';
import { Concert } from './Concert.entity';
import { Location } from '../location/Location.entity';
import { Artist } from '../artist/Artist.entity';



export default class ArtistController {
    public async getAllConcerts(): Promise<Array<Concert>> {
        const concertRepo : Repository<Concert> = getRepository(Concert);

        const concerts  = await concertRepo.find({
            relations: ['artists', 'location']
        });

        return concerts;
    }

    public async getConcertById(req: hapi.Request)  {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const id = req.params.id;


        const concert : any = await concertRepo.findOne(id, {
            relations: ['artists', 'location']
        });

        if(!concert) return Boom.notFound('Artist not found');

        return concert;
    }

    public async createConcert(req: hapi.Request) {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const locationRepo : Repository<Location> = getRepository(Location);

        const payload = req.payload as {
            name: string,
            artists: Array<Artist>
            location: number
        };

        if(await concertRepo.findOne({name: payload.name})) throw Boom.conflict('Concert already exists');

        const concert = new Concert();
        concert.name = payload.name;

        const location = await locationRepo.findOne({id: payload.location});
        if(!location) throw Boom.notFound('Given location does not exist');
        concert.location = location;

        // Get artists Objects
        concert.artists =  await artistRepo.find({
            where: { id: In(payload.artists) }
        });

        await concertRepo.save(concert);

        return concert;
    }
}