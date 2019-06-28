import Joi from '@hapi/joi';
export const createConcertDto = Joi.object().keys({
    name: Joi.string().required(),
    location: Joi.number().required(),
    artists: Joi.array().required(),
    date: Joi.date().required(),
    instagram_photo_id: Joi.string()
});