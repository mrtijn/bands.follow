import db from '../db'
const Joi = require('joi');
const Boom = require('boom');
var request = require('request-promise'); 


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
            return req.body;
        }
    }
}


const checkIfUserExists = async (username) => {
    let findUser = await db.select('*')
        .from('users')
        .where('username', username);


    if (findUser.length) {
        return true;
    }

    return false;
}





export {
    createUser,
}
