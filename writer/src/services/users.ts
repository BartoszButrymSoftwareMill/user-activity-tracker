import db from '@shared/db/index.js';
import { type NewUser } from '@shared/db/schema/users.js';
import schema from '@shared/db/schema/index.js';
import utils from '@shared/db/utils.js';

export const createUser = async (user: NewUser) => {
  return await db.default.insert(schema.users).values(user);
};

export const updateUser = async (id: string, user: NewUser) => {
  return await db.default
    .update(schema.users)
    .set(user)
    .where(utils.eq(schema.users.id, id));
};

export const deleteUser = async (id: string) => {
  return await db.default
    .delete(schema.users)
    .where(utils.eq(schema.users.id, id));
};
