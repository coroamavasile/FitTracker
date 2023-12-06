import { ProgressLoggerModel } from '../common';
import db from '../db';

const getProgressByUserId = async (userId: number) => {
  const nutritions = await db('progressLogger as n').select('*').where({ userId });

  return nutritions;
};

const createProgress = async (payload: ProgressLoggerModel) => {
  const { bicepsMeasurement, chestMeasurement, date, hipsMeasurement, userId, waistMeasurement, weight } = payload;

  const [nutrition] = await db('progressLogger')
    .insert({ bicepsMeasurement, chestMeasurement, date, hipsMeasurement, userId, waistMeasurement, weight })
    .returning(['*']);

  return nutrition;
};

const deleteProgress = async (id: number) => {
  const nutrition = await db('progressLogger').delete().where({ id });
  return nutrition;
};

const updateProgress = async (updatedFields: ProgressLoggerModel) => {
  const { id, date, bicepsMeasurement, chestMeasurement, hipsMeasurement, waistMeasurement, weight } = updatedFields;

  const [result] = await db('progressLogger')
    .update({ date, bicepsMeasurement, chestMeasurement, hipsMeasurement, waistMeasurement, weight })
    .where({ id })
    .returning(['*']);

  return result;
};

export default { getProgressByUserId, createProgress, deleteProgress, updateProgress };
