import Joi from '@hapi/joi';
export const createUserDto = Joi.object().keys({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).required(),
});