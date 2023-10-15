import { fitTrackerApi } from '../../config';

export const getNutritions = async () => {
  const response = await fitTrackerApi.get(`/nutrition-logger`);

  return response.data;
};
