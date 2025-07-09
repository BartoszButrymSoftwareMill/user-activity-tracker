import db from '@shared/db/index.js';
import schema from '@shared/db/schema/index.js';
import { type NewActivity } from '@shared/db/schema/activities.js';

export const createActivity = async (activity: NewActivity) => {
  return await db.default.insert(schema.activities).values(activity);
};
