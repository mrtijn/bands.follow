import {getRepository, Repository} from "typeorm";
import * as hapi from 'hapi';
import { User } from './User.entity';
import Boom from '@hapi/boom';


export default new class ArtistController {
    public async getAllUsers(): Promise<Array<User>> {
        const userRepo : Repository<User> = getRepository(User);

        const users  = await userRepo.find();

        return users;
    }

    public async getSelf(): Promise<Array<User>> {
        const userRepo : Repository<User> = getRepository(User);

        const users  = await userRepo.find();

        return users;
    }

    public async createUser(req: hapi.Request) {
        const userRepo : Repository<User> = getRepository(User);
        const payload = req.payload as User;

        if(await userRepo.findOne({username: payload.username})) throw Boom.conflict('User already exists');

        const user : User  = await userRepo.create(payload);

        await userRepo.save(user);

        return user;
    }
}