import { NutritionLoggerModel } from '../common';
import db from '../db';

const getNutritionsByUserId = async (userId: number) => {
  const nutritions = await db('nutritionLogger as n')
    .select('n.id', 'n.name', 'n.date', 'n.calories', 'n.proteins', 'n.fats', 'n.carbohydrates')
    .where({ userId });

  return nutritions;
};

const createNutrition = async (nutritionDto: NutritionLoggerModel) => {
  const { name, date, userId, calories, carbohydrates, fats, proteins } = nutritionDto;

  const [nutrition] = await db('nutritionLogger')
    .insert({ name, date, userId, calories, carbohydrates, fats, proteins })
    .returning(['*']);

  return nutrition;
};

const deleteNutrition = async (id: number) => {
  const nutrition = await db('nutritionLogger').delete().where({ id });
  return nutrition;
};

const updateNutrition = async (updatedFields: NutritionLoggerModel) => {
  const { id, name, date, calories, carbohydrates, fats, proteins } = updatedFields;

  const [result] = await db('nutritionLogger')
    .update({ name, date, calories, carbohydrates, fats, proteins })
    .where({ id })
    .returning(['*']);

  return result;
};

export default { getNutritionsByUserId, createNutrition, deleteNutrition, updateNutrition };
