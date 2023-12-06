import express from 'express';

import { createUser, fetchUsers, fetchUser, updateUser } from '../controllers/users-controller';

const usersRouter = express.Router();

usersRouter.get('/', fetchUsers);
usersRouter.get('/:id', fetchUser);
usersRouter.post('/', createUser);
usersRouter.put('/', updateUser);

export default usersRouter;
