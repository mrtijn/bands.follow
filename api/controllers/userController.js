import db from '../db'
const Joi = require('joi');
const Boom = require('boom');
var request = require('request-promise'); 
var querystring = require('querystring');
var client_id = 'fc54277fa14147e28e480b04a5b3da31'; // Your client id
var client_secret = '658d68c610754dc79cb465b21e572910'; // Your secret
var redirect_uri = 'http://localhost:3000/callback/';

var stateKey = 'spotify_auth_state';
const generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};


const createUser = {
    validate: {
        payload: {
            username: Joi.string().email().required(),
            password: Joi.string().required()
        },
    },
    async handler(req, h) {
        try {
            let payload = req.payload;


            if (await checkIfUserExists(payload.username)) {
                return Boom.badData('User already exists');
            }

            let res = await db('users').insert({
                username: payload.username,
                password: payload.password
            });

            const data = {
                message: `User ${payload.username} created`,
                userId: res[0],
            }

            return h.response(data).code(201);
        } catch (e) {
            console.log(e);

            return req.body;
        }
    }
}


const checkIfUserExists = async (username) => {
    let findUser = await db.select('*')
        .from('users')
        .where('username', username);

    console.log(findUser.length);
    if (findUser.length) {
        return true;
    }

    return false;
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
    

    if(!state){
        console.log(state)
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
                console.log(body);
                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                // var options = {
                //     url: 'https://api.spotify.com/v1/me',
                //     headers: { 'Authorization': 'Bearer ' + access_token },
                //     json: true
                // };

                // use the access token to access the Spotify Web API
                //let me = await request.get(options);
                h.state('data', {
                    access_token: access_token,
                    refresh_token: refresh_token
                });

               
           
   
                return h.redirect(`http://localhost:3001/profile/${access_token}/${refresh_token}`)

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
    createUser,
    spotifyLogin,
    spotifyCallback,
    spotifyRefreshToken
}
