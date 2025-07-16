import { eq } from 'drizzle-orm';
import db from '../db';
import { activities } from '../db/schema';

export const getAllActivitiesWithUser = async () => {
  return await db.query.activities.findMany({
    with: {
      user: true,
    },
  });
};

export const getActivityById = async (id: string) => {
  return await db.query.activities.findFirst({
    where: eq(activities.id, id),
  });
};
