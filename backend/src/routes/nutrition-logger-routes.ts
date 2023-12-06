import express from 'express';
import {
  createNutrition,
  deleteNutrition,
  getNutritionsByUserId,
  updateNutrition,
} from '../controllers/nutrition-logger-controller';

const nutritionLoggerRouter = express.Router();

nutritionLoggerRouter.post('/', createNutrition);
nutritionLoggerRouter.get('/', getNutritionsByUserId);
nutritionLoggerRouter.delete('/:id', deleteNutrition);
nutritionLoggerRouter.put('/', updateNutrition);

export default nutritionLoggerRouter;
