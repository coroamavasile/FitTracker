import { fitTrackerApi } from '../../config';
import { ILoginRequestDto, IRegisterRequestDto } from '../../interfaces';

export const register = async (dto: IRegisterRequestDto) => {
  const response = await fitTrackerApi.post('/users', dto);

  return response.data;
};

export const login = async (dto: ILoginRequestDto) => {
  const response = await fitTrackerApi.post('/auth', dto);
  return response.data;
};
