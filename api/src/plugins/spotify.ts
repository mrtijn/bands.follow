import hapi from '@hapi/hapi';
import request from 'request-promise';
import querystring from 'querystring';

import * as tokenService from '../services/token';

const client_id = process.env.SPOTIFY_CLIENT as string;
const client_secret = process.env.SPOTIFY_SECRET as string;
const stateKey = 'spotify_auth_state';
const redirect_uri = `${process.env.BASE_URL}:${process.env.PORT}/spotify/auth/cb/`;

async function register(server: hapi.Server, options: any) {

    // server.auth.strategy('spotify', 'bell', {
    //     provider: 'spotify',
    //     password: process.env.APP_SECRET,
    //     clientId: client_id,
    //     clientSecret: client_secret,
    //     isSecure: process.env.NODE_ENV === 'production'
    // });


    server.route([
        {
            method: 'GET',
            path: '/spotify/auth',
            handler:  spotifyLogin,
            options: {
                auth: false
            }
        },
        {
            method: 'GET',
            path: '/spotify/auth/cb/',
            handler: spotifyCallback,
            options: {
                auth: false
            }
        },
    ]);

    console.log('info', 'Plugin registered: bell authentication with spotify');
}


const spotifyCallback = async (req: hapi.Request) => {

    // // your application requests refresh and access tokens
    // // after checking the state parameter
    // const code = req.query.code || null;
    // const state = req.query.state || null;

    // if (!state) {
    //     return {  error: 'state_mismatch' };
    // } else {

    // }
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            // code: code,
            // redirect_uri: redirect_uri,
            grant_type: 'client_credentials'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
    };
    try {
        const spotifyResponse = await request.post(authOptions);
        tokenService.createToken('spotify', spotifyResponse.access_token, spotifyResponse.expires_in);
        return {
            token: spotifyResponse.access_token,
            expires_in: spotifyResponse.expires_in
        }
    } catch (error) {
        throw error;
    }
}

const spotifyLogin = (req: hapi.Request, response: hapi.ResponseToolkit) => {
    const state = generateRandomString(16);

    response.state(stateKey,state);

    // your application requests authorization
    const scope = 'user-read-private user-read-email';
    return response.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));

}

const generateRandomString = function (length: number) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export default {
    register,
    name: 'spotify-authentication',
    version: '1.0.0',
    once: true
}


