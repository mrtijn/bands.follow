import {getRepository, Repository, In} from "typeorm";
import { Location } from './Location.entity';
import { BaseContext } from 'koa';




export default new class LocationController {
    public async getAllLocations(ctx : BaseContext) {

        const locationRepo : Repository<Location> = getRepository(Location);

        const locations  = await locationRepo.find();

        ctx.body = locations;
    }

}