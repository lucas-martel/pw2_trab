import { RequestHandler } from 'express';

const setCookieLang: RequestHandler = (req, res, next) => {
  if (!('lang' in req.cookies)) {
    res.cookie('lang', process.env.DEFAULT_LANG);
  }
  next();
};

export default setCookieLang;
