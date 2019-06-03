import {getRepository, Repository} from "typeorm";
import * as hapi from 'hapi';
import { User } from './User.entity';
import Boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserCredentials } from '../../interfaces';


export default class UserController {
    public async getAllUsers() {
        const userRepo : Repository<User> = getRepository(User);

        const users  = await userRepo.find();

        return users;
    }

    public async getSelf(req : hapi.Request): Promise<User> {
        const userRepo : Repository<User> = getRepository(User);
        const userCredentials = req.auth.credentials as UserCredentials;

        try {
            const user = await userRepo.findOne({
                id: userCredentials.id
            }) as User;

            return user;
        } catch (error) {
            throw error;
        }
    }

    public async createUser(req: hapi.Request) {
        const userRepo : Repository<User> = getRepository(User);
        const payload = req.payload as User;

        if(await userRepo.findOne({username: payload.username})) throw Boom.conflict('User already exists');

        const hash = await this.hashPassword(payload.password);
        payload.password = hash;
        const user : User  = await userRepo.create(payload);

        await userRepo.save(user);
        const token = await this.createToken(user);
        return {
            token: token
        };
    }

    public async loginUser(req: hapi.Request) {
        const userRepo : Repository<User> = getRepository(User);
        const payload = req.payload as {
            username: string,
            password: string
        };

        const user = await userRepo.findOne({username: payload.username});

        if(!user) throw Boom.notFound('User does not exist!');

        // check password
        const passwordValid = bcrypt.compareSync(payload.password, user.password);

        if(!passwordValid) throw Boom.forbidden('Password incorrect!');

        const token = await this.createToken(user);
        return {
            token: token
        };

    }

    public async validateUser(decoded: any, request: hapi.Request){
        const userRepo : Repository<User> = getRepository(User);

        const foundUser  = await userRepo.find({
            id: decoded.id
        });

        // do your checks to see if the person is valid
        if (!foundUser) {
            return { isValid: false };
        }
        else {
            return { isValid: true };
        }
    }

    private async hashPassword(password: string) {
        try {
            // Generate a salt at level 10 strength
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            return hash;
        } catch (error) {
            throw error;
        }
    }

    private createToken(user: User) {
        let scopes;
        const SECRET = process.env.APP_SECRET as string;
        // Check if the user object passed in
        // has admin set to true, and if so, set
        // scopes to admin
        // if (user.admin) {
        //   scopes = 'admin';
        // }
        // Sign the JWT
        return jwt.sign({ id: user.id, username: user.username, scope: scopes }, SECRET, { algorithm: 'HS256', expiresIn: "1h" } );
    }

    private verifyToken(token: string) {
        const APP_SECRET = process.env.APP_SECRET as string;
        return jwt.verify(token, APP_SECRET, {});
    }
}