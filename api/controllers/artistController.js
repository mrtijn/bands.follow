import Boom from 'boom';
import Joi from 'joi';
import db from '../db'
import { searchSpotify, getSpotifyArtist } from './spotifyController';

const createArtist = {
    validate: {
        payload: {
            name: Joi.string().required(),
            spotify_id: Joi.string().required()
        },
    },
    async handler(req, h) {
        try {
            let payload = req.payload;


            if (await checkIfArtistExists(payload.name)) {
                return Boom.badData('Artist already exists');
            }

            let res = await db('artists').insert({
                name: payload.name,
                spotify_id: payload.spotify_id
            });

            let spotify_data = await getSpotifyArtist(payload.spotify_id);
            let savedData = []
            if(spotify_data){
                savedData = {
                    spotify_id: spotify_data.id,
                    name: spotify_data.name,
                    uri: spotify_data.uri,
                    image: spotify_data.images[0].url
                }
                await db('spotify_data').insert(savedData);
            }

            
            const data = {
                message: `Artist ${payload.name} created`,
                data: savedData
            }
            console.log(data);
            return h.response(data).code(201);
        } catch (e) {
            console.log(e);

            return req.body;
        }
    }
}

const searchArtist = {
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
            let data = await searchSpotify(payload.name, 'artist');
            console.log(data);
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

const getArtist = {
    validate: {
        params: {
            id: Joi.number().integer().required()
        },
    },
    async handler(req, h) {
        let data = await db.select('*').where('id', req.params.id).from('artists');

        // ADD THE ARTIST
        data = artists.map(async (artist) => {
            let data = await db.select('*').from('spotify_data').where('spotify_id', artist.spotify_id);
            console.log(data);
            artist.data = data;

            return artist;
        });
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
    searchArtist,
    getArtists,
    getArtist
}