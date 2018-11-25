import { createUser, spotifyLogin, spotifyCallback } from './controllers/userController';
import { createConcert } from './controllers/concertController';
import { createArtist, getArtists } from './controllers/artistController';
import * as Spotify from './controllers/spotifyController';
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
        method: 'GET',
        path: '/artists',
        handler: getArtists.handler
    },
    {
        method: 'POST',
        path: '/concert/create',
        options: {
            validate: createConcert.validate
        },
        handler: createConcert.handler
    },
    // {
    //     method: 'GET',
    //     path: '/login',
    //     handler: spotifyLogin
    // },
    // {
    //     method: 'GET',
    //     path: '/callback/',
    //     handler: spotifyCallback
    // },
    {
        method: 'GET',
        path: '/auth/spotify',
        options: {
            auth: 'spotify',
            handler: (request, h) =>{
                if (request.auth.isAuthenticated) {
                    const user = request.auth.credentials.profile
                    const data = {
                        name: user.displayName,
                        username: user.username,
                        avatar: user.raw.avatar_url
                    }

                    return h.response('authenticated', data)
                }

                return h.response({
                    error: 'Could not authenticate with spotify.'
                }).code(400)
            
            }
        }

    },
    {
        method: 'GET',
        path: '/user',
        handler: Spotify.getUser.handler
    }
]


export default routes;