import {getRepository, Repository, In} from "typeorm";
import * as hapi from 'hapi';
import { Concert } from './Concert.entity';

import Boom from '@hapi/boom';
import { Artist } from '../artist/Artist.entity';



export default class ArtistController {
    public async getAllConcerts(): Promise<Array<Concert>> {
        const concertRepo : Repository<Concert> = getRepository(Concert);

        const concerts  = await concertRepo.find({
            relations: ['artists']
        });

        return concerts;
    }

    public async getConcertById(req: hapi.Request)  {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const id = req.params.id;


        const concert : any = await concertRepo.findOne(id, {
            relations: ['artists']
        });

        if(!concert) return Boom.notFound('Artist not found');

        return concert;
    }

    public async createConcert(req: hapi.Request) {
        const concertRepo : Repository<Concert> = getRepository(Concert);
        const artistRepo : Repository<Artist> = getRepository(Artist);

        const payload = req.payload as Concert;

        if(await concertRepo.findOne({name: payload.name})) throw Boom.conflict('Concert already exists');

        // Get artists Objects
        payload.artists =  await artistRepo.find({
            where: { id: In(payload.artists) }
        });


        const concert : Concert  = await concertRepo.create(payload);

        await concertRepo.save(concert);


        return concert;
    }
}