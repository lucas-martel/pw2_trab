import Joi from 'joi';

const carrinhoSchema = Joi.object().keys({
  id: Joi.string().required(),
  quantidade: Joi.number().required(),
});

export default carrinhoSchema;