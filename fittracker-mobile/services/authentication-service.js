import { fitTrackerApi } from '../configurations/api.configuration';

export const login = async (email, password) => {
  const response = await fitTrackerApi.post('/auth', { email, password });
  return response.data;
};
