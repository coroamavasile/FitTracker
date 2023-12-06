import { NextFunction, Request, Response } from 'express';

import userService from '../services/user-service';

import { UserRole } from '../common';

const fetchUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let users = await userService.getUsers();
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const user = await userService.createUser(email, password, name, UserRole.RegularUser);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const fetchUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    let users = await userService.getUserById(Number(id));
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let users = await userService.updateUser(req.body);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export { fetchUsers, createUser, fetchUser, updateUser };
