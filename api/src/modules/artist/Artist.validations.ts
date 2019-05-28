import Joi from '@hapi/joi';
export const createArtist = {
    name: Joi.string().min(3).max(10).required(),
    genre: Joi.string().max(20).required()
}