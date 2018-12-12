import { createUser} from './controllers/userController';
import { createConcert, getConcerts } from './controllers/concertController';
import { createArtist, getArtists, getArtist, searchArtist } from './controllers/artistController';
import { spotifyLogin, spotifyCallback }from './controllers/spotifyController';
const routes = [
    {
        method: 'POST',
        path: '/user/create',
        options: {
            validate: createUser.validate
        },
        handler: createUser.handler

    },
    {
        method: 'POST',
        path: '/artist/create',
        options: {
            validate: createArtist.validate
        },
        handler: createArtist.handler
    },
    {
        method: 'POST',
        path: '/artist/search',
        options: {
            validate: searchArtist.validate
        },
        handler: searchArtist.handler
    },
    {
        method: 'GET',
        path: '/artist/:id',
        handler: getArtist.handler
    },
    {
        method: 'GET',
        path: '/artists',
        handler: getArtists.handler
    },
    {
        method: 'GET',
        path: '/concerts',
        handler: getConcerts.handler
    },

    {
        method: 'POST',
        path: '/concert/create',
        options: {
            validate: createConcert.validate
        },
        handler: createConcert.handler
    },
    {
        method: 'GET',
        path: '/spotify/auth',
        handler: spotifyLogin
    },
    {
        method: 'GET',
        path: '/spotify/cb',
        handler: spotifyCallback
    },
    // {
    //     method: 'GET',
    //     path: '/user',
    //     handler: Spotify.getUser.handler
    // }
]


export default routes;