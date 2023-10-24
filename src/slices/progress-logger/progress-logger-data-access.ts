import { fitTrackerApi } from '../../config';
import { IProgressLogger } from '../../interfaces';

export const getProgress = async () => {
  const response = await fitTrackerApi.get(`/progress-logger`);

  return response.data;
};

export const createProgress = async (payload: IProgressLogger) => {
  const response = await fitTrackerApi.post(`/progress-logger`, payload);
  return response.data;
};

export const deleteProgress = async (id: number) => {
  await fitTrackerApi.delete(`/progress-logger/${id}`);
  return id;
};

export const updateProgress = async (payload: IProgressLogger) => {
  const response = await fitTrackerApi.put(`/progress-logger`, payload);
  return response.data;
};
