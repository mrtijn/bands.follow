import ArtistController from '../modules/artist/Artist.controller';
import * as ArtistValidations from '../modules/artist/Artist.validations';
import ConcertController from '../modules/concert/Concert.controller';
import * as Concertvalidations from '../modules/concert/Concert.validations';
import UserController from '../modules/user/User.controller';
import * as UserValidations from '../modules/user/User.validations';
export default [
    {
        method: 'GET',
        path: '/artist/all',
        handler: ArtistController.getAllArtist,
    },
    {
        method: 'GET',
        path: '/artist/{id}',
        handler: ArtistController.getArtistById
    },
    {
        method: 'POST',
        path: '/artist/create',
        handler: ArtistController.createArtist,
        options: {
            validate: {
                payload: ArtistValidations.createArtist
            }
        }
    },
    /* Concerts */
    {
        method: 'GET',
        path: '/concert/all',
        handler: ConcertController.getAllConcerts,
    },
    {
        method: 'GET',
        path: '/concert/{id}',
        handler: ConcertController.getConcertById
    },
    {
        method: 'POST',
        path: '/concert/create',
        handler: ConcertController.createConcert,
        options: {
            validate: {
                payload: Concertvalidations.createConcertDto
            }
        }
    },
    /* User */
    {
        method: 'GET',
        path: '/user/all',
        handler: UserController.getAllUsers,
    },
    {
        method: 'GET',
        path: '/user/self',
        handler: UserController.getSelf
    },
    {
        method: 'POST',
        path: '/user/register',
        handler: UserController.createUser,
        options: {
            validate: {
                payload: UserValidations.createUserDto
            }
        }
    },
    {
        method: '*',
        path: '/bell/facebook',
        config: {
            auth: {
                strategy: 'facebook',
                mode: 'try'
            },
            handler: function (request: any) {
                console.log(request.auth);
                if (!request.auth.isAuthenticated) {
                    return 'Authentication failed due to: ' + request.auth.error.message;
                }

                return request.auth.credentials;
            }
        }
    }
]