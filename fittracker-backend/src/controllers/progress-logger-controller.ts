import { NextFunction, Request, Response } from 'express';
import progressLoggerService from '../services/progress-logger-service';
import { getUserIdFromToken } from '../common';

const getProgressByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromToken(req);

  try {
    let result = await progressLoggerService.getProgressByUserId(userId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const createProgress = async (req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromToken(req);

  try {
    const result = await progressLoggerService.createProgress({ ...req.body, userId });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteProgress = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const result = await progressLoggerService.deleteProgress(Number(id));
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const updateProgress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await progressLoggerService.updateProgress(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { createProgress, updateProgress, deleteProgress, getProgressByUserId };
