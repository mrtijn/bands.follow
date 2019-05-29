import {getRepository, Repository} from "typeorm";
import * as hapi from 'hapi';
import { Artist } from './Artist.entity';
import Boom from '@hapi/boom';


export default class ArtistController {
    public async getAllArtist(): Promise<Array<Artist>> {
        console.log(this);
        const artistRepo : Repository<Artist> = getRepository(Artist);
        const artists  = await artistRepo.find();

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
}