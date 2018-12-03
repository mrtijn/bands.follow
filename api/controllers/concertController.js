import Boom from 'boom';
import Joi from 'joi';
import db from '../db'

import Concerts from '../models/concert';


const createConcert = {
    validate: {
        payload: {
            location: Joi.string().required(),
            date: Joi.date().required(),
            artists: Joi.array().required()
        },
    },
    async handler(req, h) {
        try {
            let payload = req.payload;


            let id = await db('concerts').insert({
                location: payload.location,
                date: payload.date
            });


  
            const data = {
                id: id[0],
                location: payload.location,
                date: payload.date,
                artists: []
            }

            let artists = payload.artists;
            for (let artist_id in artists){
                await db('concert_artists').insert({
                    concert_id: id[0],
                    artist_id: artists[artist_id]
                })

                let artist = await db.select('*').where('id', artists[artist_id]).from('artists');
                data.artists.push(artist[0]);
                
            }





            return h.response(data).code(201);
        } catch (e) {
            console.log(e);

            return req.body;
        }
    }
}

const getConcerts = {
    async handler(req, h) {
        try {
            let concerts = await new Concerts().fetchAll({ withRelated: 'artists' });
            return h.response(concerts);
        } catch (e) {
            return Boom.badRequest('Something went wrong!');
        }
        
    }
}


export {
    createConcert,
    getConcerts
}