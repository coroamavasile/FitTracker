import { NextFunction, Request, Response } from 'express';
import nutritionLoggerService from '../services/nutrition-logger-service';
import { getUserIdFromToken } from '../common';

const getNutritionsByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromToken(req);

  try {
    let nutritions = await nutritionLoggerService.getNutritionsByUserId(userId);
    res.status(200).json(nutritions);
  } catch (error) {
    next(error);
  }
};

const createNutrition = async (req: Request, res: Response, next: NextFunction) => {
  const userId = getUserIdFromToken(req);

  try {
    const nutrition = await nutritionLoggerService.createNutrition({ ...req.body, userId });
    res.status(200).json(nutrition);
  } catch (error) {
    next(error);
  }
};

const deleteNutrition = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const nutrition = await nutritionLoggerService.deleteNutrition(Number(id));
    res.status(200).json(nutrition);
  } catch (error) {
    next(error);
  }
};

const updateNutrition = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nutrition = await nutritionLoggerService.updateNutrition(req.body);
    console.log('nutrition', nutrition);
    res.status(200).json(nutrition);
  } catch (error) {
    next(error);
  }
};

export { getNutritionsByUserId, createNutrition, deleteNutrition, updateNutrition };
