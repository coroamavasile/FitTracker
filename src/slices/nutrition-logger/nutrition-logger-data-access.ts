import { fitTrackerApi } from '../../config';
import { INutritionLogger } from '../../interfaces';

export const getNutritions = async () => {
  const response = await fitTrackerApi.get(`/nutrition-logger`);

  return response.data;
};

export const createNutrition = async (nutrition: INutritionLogger) => {
  const response = await fitTrackerApi.post(`/nutrition-logger`, nutrition);
  return response.data;
};

export const deleteNutrition = async (id: number) => {
  await fitTrackerApi.delete(`/nutrition-logger/${id}`);
  return id;
};
