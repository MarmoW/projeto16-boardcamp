import Joi from 'joi';

export const CustomerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
    birthday: Joi.string().isoDate().required()
});

