import {getRepository, Repository, In} from "typeorm";
import * as hapi from 'hapi';
import Boom from '@hapi/boom';
import { Location } from './Location.entity';




export default class ArtistController {
    public async getAllLocations(): Promise<Array<Location>> {
        const locationRepo : Repository<Location> = getRepository(Location);

        const concerts  = await locationRepo.find();

        return concerts;
    }

}