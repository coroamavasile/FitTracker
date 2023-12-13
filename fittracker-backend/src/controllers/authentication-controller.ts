import { NextFunction, Request, Response } from 'express';
import authenticationService from '../services/authentication-service';

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  try {
    const result = await authenticationService.authenticate(email, password);
    return res.json(result);
  } catch (e) {
    next(e);
  }
};

export { authenticate };
