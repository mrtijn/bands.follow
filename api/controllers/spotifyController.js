const request = require('request-promise'); 
const Joi = require('joi');
const Boom = require('boom');
const url = require('url');
const querystring = require('querystring');
import db from '../db'
const client_id = ''; // Your client id
const client_secret = ''; // Your secret

const redirect_uri = 'http://localhost:3000/spotify/cb';
const stateKey = 'spotify_auth_state';

const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};



const getToken = async function(){
    let token = null;
    try {
        token = await db.select('*').from('api_keys').where('name', 'spotify');
    } catch (e) {
        return e;
    }
    
    return token[0];
}

const searchSpotify = async function(query, type){

    try {
        let token = await getToken();
        console.log(token);
        if(token){
            var options = {
                url: 'https://api.spotify.com/v1/search',
                headers: { 'Authorization': 'Bearer ' + token.access_token },
                json: true,
                qs: {
                    q: query,
                    type: type
                }
            };

            // use the access token to access the Spotify Web API
            let res = await request.get(options);

            return res;
        }
       
    } catch (e) {
        console.error(e);
    }
}

const getSpotifyArtist = async function (id) {

    try {
        let token = await getToken();
    
        if (token) {
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + id,
                headers: { 'Authorization': 'Bearer ' + token.access_token },
                json: true
            };

            // use the access token to access the Spotify Web API
            let res = await request.get(options);
            console.log(res);
            return res;
        }

    } catch (e) {
        console.error(e);
    }
}

const getUser = {
    async handler(req,h) {
        
        try{
            let token = req.headers.token;
            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + token },
                json: true
            };

            // use the access token to access the Spotify Web API
            let me = await request.get(options);

            return h.response(me).code(200);
            
        } catch(e){
            return h.response(e);
        }
    }
}

const spotifyLogin = (req, h) => {
    var state = generateRandomString(16);
    h.state(stateKey, state);


    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    return h.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));



}


const spotifyCallback = async (req, h) => {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.state ? req.state[stateKey] : null;


    if (!state) {
        return h.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        h.unstate(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        return request.post(authOptions).then(async (body) => {

            if (body) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                // var options = {
                //     url: 'https://api.spotify.com/v1/me',
                //     headers: { 'Authorization': 'Bearer ' + access_token },
                //     json: true
                // };

                // use the access token to access the Spotify Web API
                //let me = await request.get(options);
                try {
                    if(await db.select('name').from('api_keys').where('name', 'spotify')){
                        await db('api_keys').where('name', 'spotify').update({
                            access_token: access_token,
                            refresh_token: refresh_token
                        })
                    }else{
                        let res = await db('api_keys').insert({
                            name: 'spotify',
                            access_token: access_token,
                            refresh_token: refresh_token
                        });
                    }

                    return h.response(true);
                } catch (e) {
                    return h.response(false);
                }




               

            } else {

                // return h.response('something went wong');
                return h.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        })
            .catch((error) => {
                console.log(error);
            })
    }
}

const spotifyRefreshToken = (req, h) => {

    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };

    return request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
}


export {
    getUser,
    searchSpotify,
    getSpotifyArtist,
    spotifyLogin,
    spotifyCallback,
    spotifyRefreshToken
}
