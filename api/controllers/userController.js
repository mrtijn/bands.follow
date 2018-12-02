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





export {
    createUser,
}
