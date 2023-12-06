import { NOT_FOUND, UserModel } from '../common';
import db from '../db';

const getUsers = async () => {
  const users = await db('Users as ud').select('ud.id', 'ud.email', 'ud.name', 'role');

  return users;
};

const createUser = async (email: string, name: string, password: string, role: number, registrationDate: string) => {
  const [user] = await db('users').insert({ email, name, password, role, registrationDate }).returning(['*']);

  return user;
};

const getUserByEmail = async (email: string) => {
  const [user] = await db('users').where({ email }).returning(['*']);

  return user;
};

const getUserById = async (id: number) => {
  const [user] = await db('users').where({ id }).returning(['*']);

  if (!user) {
    throw Error(NOT_FOUND);
  }

  return user;
};

const updateUser = async (updatedFields: UserModel, id: number) => {
  const { name, phone, profession, description, profileImage } = updatedFields;

  getUserById(id);

  await db('users').update({ name, phone, profession, description, profileImage }).where({ id }).returning(['*']);

  const updatedUser = await getUserById(id);

  // if (updatedUser.length === 0) throw new Error(NOT_FOUND);

  return updatedUser;
};

export default { getUsers, createUser, getUserByEmail, getUserById, updateUser };
