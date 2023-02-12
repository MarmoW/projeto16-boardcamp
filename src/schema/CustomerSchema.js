import Joi from 'joi';

export const CustomerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.number().min(10).required(),
    cpf: Joi.number().min(10).max(11).required(),
    birthday: Joi.string().isoDate().required()
});

/*
  name: 'João Alfredo',
  phone: '21998899222',
  cpf: '01234567890',
  birthday: '1992-10-05'
*/