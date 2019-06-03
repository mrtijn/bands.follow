import Hapi from '@hapi/hapi';


export interface UserCredentials extends Hapi.AuthCredentials {
    id: number;
}