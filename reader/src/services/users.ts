import db from '@shared/db/index.js';
import schema from '@shared/db/schema/index.js';
import type { NewUser } from '@shared/db/schema/users.js';

// Permission denied - user with read-only access
export const createUser = async (user: NewUser) => {
  return await db.default.insert(schema.users).values(user);
};
