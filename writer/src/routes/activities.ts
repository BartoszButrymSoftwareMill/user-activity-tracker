import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import activitySchema from '@shared/validators/activities';
import { getAllActivitiesWithUser } from '@shared/services/activities';
import { createActivity } from 'src/services/activities';

const activitiesRoute = new Hono();

activitiesRoute.post('/', zValidator('json', activitySchema), async (c) => {
  const validated = c.req.valid('json');
  const { userId, type, description } = validated;
  const newActivity = await createActivity({ userId, type, description });

  return c.json(newActivity);
});

activitiesRoute.get('/', async (c) => {
  const activitiesRecords = await getAllActivitiesWithUser();

  return c.json(activitiesRecords);
});

export default activitiesRoute;
