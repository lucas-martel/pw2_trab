import { RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const isAuth: RequestHandler = (req, res, next) => {
  if (!req.session.uid) {
    return res.status(StatusCodes.FORBIDDEN).json(ReasonPhrases.FORBIDDEN);
  }
  next();
};

export default isAuth;
