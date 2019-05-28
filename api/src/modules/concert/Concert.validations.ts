import Joi from '@hapi/joi';
export const createConcertDto = Joi.object().keys({
    name: Joi.string().required(),
    location_id: Joi.string().required(),
    artists: Joi.array().required()
});