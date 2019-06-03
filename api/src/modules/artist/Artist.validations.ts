import Joi from '@hapi/joi';
export const createArtist = {
    name: Joi.string().min(3).max(10).required(),
    spotify_id: Joi.string().min(22).max(22).required()
}