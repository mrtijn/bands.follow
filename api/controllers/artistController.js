import Boom from 'boom';
import Joi from 'joi';
import db from '../db'


const createArtist = {
    validate: {
        payload: {
            name: Joi.string().required(),
        },
    },
    async handler(req, h) {
        try {
            let payload = req.payload;


            if (await checkIfArtistExists(payload.name)) {
                return Boom.badData('Artist already exists');
            }

            let res = await db('artists').insert({
                name: payload.name
            });

            const data = {
                message: `Artist ${payload.name} created`
            }

            return h.response(data).code(201);
        } catch (e) {
            console.log(e);

            return req.body;
        }
    }
}

const getArtists = {
    async handler(req, h){
        let data = await db.select('*').from('artists');
        return h.response(data).code(200);
    }
}


const checkIfArtistExists = async (name) => {
    let findArtist = await db.select('*')
        .from('artists')
        .where('name', name);


    if (findArtist.length) {
        return true;
    }

    return false;
}

export {
    createArtist,
    getArtists
}