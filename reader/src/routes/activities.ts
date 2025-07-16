import { Hono } from 'hono';
import {
  getAllActivitiesWithUser,
  getActivityById,
} from '@shared/services/activities';

const activitiesRoute = new Hono();

activitiesRoute.get('/', async (c) => {
  const activitiesRecords = await getAllActivitiesWithUser();

  return c.json(activitiesRecords);
});

activitiesRoute.get('/:id', async (c) => {
  const id = c.req.param('id');
  const activityRecord = await getActivityById(id);

  return c.json(activityRecord);
});

export default activitiesRoute;
