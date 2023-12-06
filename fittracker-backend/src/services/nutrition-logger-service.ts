import { NutritionLoggerModel } from '../common';

import nutritionLoggerRepo from '../repos/nutrition-logger-repo';

const getNutritionsByUserId = async (userId: number) => {
  const result = await nutritionLoggerRepo.getNutritionsByUserId(userId);

  return result;
};

const createNutrition = async (nutrition: NutritionLoggerModel) => {
  const result = await nutritionLoggerRepo.createNutrition(nutrition);

  return result;
};

const deleteNutrition = async (id: number) => {
  const nutrition = await nutritionLoggerRepo.deleteNutrition(id);

  return nutrition;
};

const updateNutrition = async (dto: NutritionLoggerModel) => {
  const nutrition = await nutritionLoggerRepo.updateNutrition(dto);

  return nutrition;
};

export default { getNutritionsByUserId, createNutrition, deleteNutrition, updateNutrition };
