import db from '@shared/db/index';
import { activities } from '@shared/db/schema/index';
import { type NewActivity } from '@shared/db/schema/activities';

export const createActivity = async (activity: NewActivity) => {
  return await db.insert(activities).values(activity);
};
