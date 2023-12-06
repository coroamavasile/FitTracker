import { NextFunction, Request, Response } from 'express';
import { INVALID_CREDENTIALS, NOT_FOUND, UNAUTHORIZED } from '../common';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  switch (err.message) {
    case INVALID_CREDENTIALS:
      res.status(401);
      break;
    case NOT_FOUND:
      res.status(404);
      break;
    case UNAUTHORIZED:
      res.status(401);
      break;
    default:
      res.status(500);
  }

  res.json({
    message: err.message,
    stack: process.env.NODE_ENVIRONMENT !== 'production' && err.stack,
  });
};
