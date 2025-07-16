import db from '@shared/db/index';
import { users } from '@shared/db/schema/index';
import type { NewUser } from '@shared/db/schema/users';

// Permission denied - user with read-only access
export const createUser = async (user: NewUser) => {
  return await db.insert(users).values(user);
};
