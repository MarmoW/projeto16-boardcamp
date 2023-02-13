import Joi from 'joi';

export const CustomerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().pattern(/^[0-9]+$/).min(10).max(11).required(),
    cpf: Joi.string().pattern(/^[0-9]+$/).length(11).required(),
    birthday: Joi.string().isoDate().required()
});

/*
  name: 'João Alfredo',
  phone: '21998899222',
  cpf: '01234567890',
  birthday: '1992-10-05'
*/