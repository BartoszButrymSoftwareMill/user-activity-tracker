import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import activitySchema from '@shared/validators/activities.js';
import { createActivity } from 'src/services/activities.js';
import activitiesService from '@shared/services/activities.js';

const activitiesRoute = new Hono();

activitiesRoute.post(
  '/',
  zValidator('json', activitySchema.default),
  async (c) => {
    const validated = c.req.valid('json');
    const { userId, type, description } = validated;
    const newActivity = await createActivity({ userId, type, description });

    return c.json(newActivity);
  }
);

activitiesRoute.get('/', async (c) => {
  const activitiesRecords = await activitiesService.getAllActivitiesWithUser();

  return c.json(activitiesRecords);
});

export default activitiesRoute;
