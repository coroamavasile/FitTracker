import express from 'express';
import {authenticate} from '../controllers/authentication-controller';

const authRouter = express.Router();

authRouter.post('/', authenticate);

export default authRouter;
