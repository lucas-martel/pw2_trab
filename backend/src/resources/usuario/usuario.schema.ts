import Joi from 'joi';
import { TiposUsuario } from '../../resources/tipoUsuario/tipoUsuario.constants';

const usuarioSchema = Joi.object().keys({
  nome: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().required(),
  tipoUsuarioId: Joi.valid(TiposUsuario.Admin , TiposUsuario.CLIENT)
});

export default usuarioSchema;
