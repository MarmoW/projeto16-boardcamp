import Joi from 'joi';

export const GameSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().positive().not(null).required(),
    pricePerDay: Joi.number().positive().not(null).required()

});

/*
{
  id: 1,
  name: 'Banco Imobiliário',
  image: 'http://',
  stockTotal: 3,
  pricePerDay: 1500,
}

*/