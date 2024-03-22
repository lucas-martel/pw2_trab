import { RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { TiposUsuario } from '../resources/tipoUsuario/tipoUsuario.constants';

const isAdmin: RequestHandler = (req, res, next) => {
  if (
    !req.session.tipoUsuarioId ||
    req.session.tipoUsuarioId === TiposUsuario.CLIENT
  ) {
    return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  }
  next();
};

export default isAdmin;
