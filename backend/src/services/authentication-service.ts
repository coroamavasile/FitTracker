import { INVALID_CREDENTIALS, UserModel } from '../common';
import userService from './user-service';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const authenticate = async (email: string, password: string) => {
  const user: UserModel = await userService.getUserByEmail(email);

  if (!user) {
    throw new Error(INVALID_CREDENTIALS);
  }

  const { id, role, name, profileImage } = user;
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    /**TODO
     * Verify process.env
     */
    const jwtResult = jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
      expiresIn: '14d',
      jwtid: randomUUID(),
    });

    return {
      token: jwtResult,
      role,
      id,
      name,
      email,
      profileImage,
    };
  }

  throw new Error(INVALID_CREDENTIALS);
};

export default { authenticate };
