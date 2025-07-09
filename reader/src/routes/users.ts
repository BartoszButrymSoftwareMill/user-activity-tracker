import { Hono } from 'hono';
import { createUser } from 'src/services/users.js';
import usersService from '@shared/services/users.js';

const usersRoute = new Hono();

usersRoute.get('/', async (c) => {
  const usersRecords = await usersService.getAllUsersWithActivities();

  return c.json(usersRecords);
});

usersRoute.get('/:id', async (c) => {
  const id = c.req.param('id');
  const userRecord = await usersService.getUserById(id);

  return c.json(userRecord);
});

// Permission denied - user with read-only access
usersRoute.post('/', async (c) => {
  const { name, age, email } = await c.req.json();
  const newUser = await createUser({ name, age, email });

  return c.json(newUser);
});

export default usersRoute;
