import { Hono } from 'hono';
import activitiesService from '@shared/services/activities.js';

const activitiesRoute = new Hono();

activitiesRoute.get('/', async (c) => {
  const activitiesRecords = await activitiesService.getAllActivitiesWithUser();

  return c.json(activitiesRecords);
});

activitiesRoute.get('/:id', async (c) => {
  const id = c.req.param('id');
  const activityRecord = await activitiesService.getActivityById(id);

  return c.json(activityRecord);
});

export default activitiesRoute;
