import db from '@shared/db/index';
import { type NewUser } from '@shared/db/schema/users';
import { users } from '@shared/db/schema/index';
import * as utils from '@shared/db/utils';

export const createUser = async (user: NewUser) => {
  return await db.insert(users).values(user);
};

export const updateUser = async (id: string, user: NewUser) => {
  return await db.update(users).set(user).where(utils.eq(users.id, id));
};

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(utils.eq(users.id, id));
};
