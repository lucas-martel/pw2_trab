import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ObjectSchema } from 'joi';

const validate = (schema: ObjectSchema): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json(error.details);
    }
    next();
  };
};

export default validate;
