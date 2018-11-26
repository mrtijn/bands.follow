import Boom from 'boom';
import Joi from 'joi';
import db from '../db'

import Concerts from '../models/concert';



const createConcert = {
    validate: {
        payload: {
            name: Joi.string().required(),
            location: Joi.string().required(),
            date: Joi.date().required(),
            artists: Joi.array().required()
        },
    },
    async handler(req, h) {
        try {
            let payload = req.payload;


            let id = await db('concerts').insert({
                name: payload.name,
                location: payload.location,
                date: payload.date
            });


            // console.log(res);

            const data = {
                message: `Concert created`,
                id: id
            }

            payload.artists.forEach(async (artist_id) => {
                await db('concert_artists').insert({
                    concert_id: id,
                    artist_id: artist_id
                })
            })


            return h.response(data).code(201);
        } catch (e) {
            console.log(e);

            return req.body;
        }
    }
}

const getConcerts = {
    async handler(req, h) {
        console.log('go2')
        try {
            let concerts = await new Concerts().fetchAll({ withRelated: 'artists' });
            return h.response(concerts);
        } catch (e) {
            return Boom.badRequest('Something went wrong!');
        }
        

        // console.log(test);

        // let data = await db.select('*').from('concerts');
        // return h.response(data).code(200);
    }
}


export {
    createConcert,
    getConcerts
}