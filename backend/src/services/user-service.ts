import { UserModel } from '../common';
import userRepo from '../repos/user-repo';
import bcrypt from 'bcrypt';

const getUsers = async () => {
  const users = await userRepo.getUsers();
  return users;
};

const createUser = async (email: string, password: string, name: string, role: number) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const registrationDate = new Date().toISOString();

  const user = await userRepo.createUser(email, name, hashedPassword, role, registrationDate);

  return user;
};

const getUserByEmail = async (email: string) => {
  const user = await userRepo.getUserByEmail(email);
  return user;
};

const getUserById = async (id: number) => {
  const user = await userRepo.getUserById(id);
  return user;
};

const updateUser = async (user: UserModel) => {
  const userResponse = await userRepo.updateUser(user, user.id);
  return userResponse;
};

export default { getUsers, createUser, getUserByEmail, getUserById, updateUser };
