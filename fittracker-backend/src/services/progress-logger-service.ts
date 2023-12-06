import { ProgressLoggerModel } from '../common';

import repo from '../repos/progress-logger-repo';

const getProgressByUserId = async (userId: number) => {
  const result = await repo.getProgressByUserId(userId);

  return result;
};

const createProgress = async (payload: ProgressLoggerModel) => {
  const result = await repo.createProgress(payload);

  return result;
};

const deleteProgress = async (id: number) => {
  const result = await repo.deleteProgress(id);

  return result;
};

const updateProgress = async (payload: ProgressLoggerModel) => {
  const result = await repo.updateProgress(payload);

  return result;
};

export default { getProgressByUserId, createProgress, deleteProgress, updateProgress };
