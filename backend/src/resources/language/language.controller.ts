import { RequestHandler } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const changeLanguage: RequestHandler = (req, res) => {
  const { lang } = req.body;
  res.cookie('lang', lang).status(StatusCodes.OK).json(ReasonPhrases.OK);
};

export default { changeLanguage };
