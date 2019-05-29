import "reflect-metadata";
import {createConnection} from "typeorm";

export default class DBConnection {
    async init() : Promise<void>{
        try {
            await createConnection();
            console.log('connected');
            return Promise.resolve();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }
}