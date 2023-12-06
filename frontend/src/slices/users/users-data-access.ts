import { fitTrackerApi } from '../../config';
import { IUser } from '../../interfaces';

export const getUserById = async (userId: number) => {
  const response = await fitTrackerApi.get(`/users/${userId}`);

  return response.data;
};

export const updateUser = async (user: IUser) => {
  const response = await fitTrackerApi.put(`/users`, user);

  return response.data;
};
