import express from 'express';
import {
  createProgress,
  deleteProgress,
  getProgressByUserId,
  updateProgress,
} from '../controllers/progress-logger-controller';

const progressLoggerRouter = express.Router();

progressLoggerRouter.post('/', createProgress);
progressLoggerRouter.get('/', getProgressByUserId);
progressLoggerRouter.delete('/:id', deleteProgress);
progressLoggerRouter.put('/', updateProgress);

export default progressLoggerRouter;
