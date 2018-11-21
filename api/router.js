import { createUser, spotifyLogin, spotifyCallback } from './controllers/userController';

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
        method: 'GET',
        path: '/login',
        handler: spotifyLogin
    },
    {
        method: 'GET',
        path: '/callback/',
        handler: spotifyCallback
    },
]


export default routes;