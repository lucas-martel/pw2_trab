import { RequestHandler } from 'express';
import { LoginDto, SignupDto } from './auth.types';
import { createUsuario } from '../../resources/usuario/usuario.service';
import { TiposUsuario } from '../../resources/tipoUsuario/tipoUsuario.constants';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { checkCredentials } from './auth.service';

const signup: RequestHandler = async (req, res) => {
  const usuario = req.body as SignupDto;
  try {
    const novoUsuario = await createUsuario({
      ...usuario,
      tipoUsuarioId:
        usuario.tipoUsuarioId === 'client'
          ? TiposUsuario.CLIENT
          : TiposUsuario.Admin,
    });
    res.status(StatusCodes.CREATED).json(novoUsuario);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const login: RequestHandler = async (req, res) => {
  const credential = req.body as LoginDto;
  try {
    const usuario = await checkCredentials(credential);
    if (!usuario) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json(ReasonPhrases.UNAUTHORIZED);
    }
    req.session.uid = usuario.id;
    req.session.tipoUsuarioId = usuario.tipoUsuarioId;
    return res.status(StatusCodes.OK).json({
      nome: usuario.nome,
      tipoUsuario: usuario.tipoUsuarioId,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const logout: RequestHandler = (req, res) => {
  if (!req.session.uid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json(ReasonPhrases.UNAUTHORIZED);
  }
  req.session.destroy(err => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
    }
    return res.status(StatusCodes.OK).json(ReasonPhrases.OK);
  });
};

export default { signup, login, logout };
