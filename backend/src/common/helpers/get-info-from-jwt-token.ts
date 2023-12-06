import { Request } from 'express';
import { UNAUTHORIZED } from '../constants';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const getUserIdFromToken = (req: Request) => {
  const { headers } = req;
  const { authorization } = headers;

  const token = authorization?.split(' ')[1];

  if (!token) {
    throw Error(UNAUTHORIZED);
  }

  const result = jwt.decode(token);

  if (!result || typeof result == 'string') {
    throw Error(UNAUTHORIZED);
  }

  return result.id;
};
