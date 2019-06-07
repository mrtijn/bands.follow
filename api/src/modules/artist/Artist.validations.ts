import Joi from '@hapi/joi';
export const createArtist = {
    name: Joi.string().required(),
    spotify_id: Joi.string().required()
}

export const searchArtist = {
    searchQuery: Joi.string().required()
}