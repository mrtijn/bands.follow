import Joi from '@hapi/joi';
export const createArtist = {
    spotify_id: Joi.string().required()
}

export const searchArtist = {
    searchQuery: Joi.string().required()
}