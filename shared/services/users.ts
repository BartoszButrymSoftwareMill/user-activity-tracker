import { eq } from 'drizzle-orm';
import db from '../db';
import { activities, users } from '../db/schema';

export const getAllUsersWithActivities = async () => {
  const prepared = db
    .select()
    .from(users)
    .leftJoin(activities, eq(users.id, activities.userId))
    .prepare('get-all-users-with-activities');

  return await prepared.execute();
};

export const getUserById = async (id: string) => {
  return await db.select().from(users).where(eq(users.id, id));
};

export default {
  getAllUsersWithActivities,
  getUserById,
};
