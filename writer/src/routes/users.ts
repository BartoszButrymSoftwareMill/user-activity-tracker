import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import userValidators from '@shared/validators/users.js';
import { createUser, deleteUser, updateUser } from 'src/services/users.js';
import usersService from '@shared/services/users.js';

const usersRoute = new Hono();

usersRoute.post(
  '/',
  zValidator('json', userValidators.userSchema),
  async (c) => {
    const validated = c.req.valid('json');
    const { name, age, email } = validated;
    const newUser = await createUser({ name, age, email });

    return c.json(newUser);
  }
);

usersRoute.get('/', async (c) => {
  const usersRecords = await usersService.getAllUsersWithActivities();

  return c.json(usersRecords);
});

usersRoute.put(
  '/:id',
  zValidator('param', userValidators.idParamSchema),
  zValidator('json', userValidators.userSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const validated = c.req.valid('json');
    const { name, age, email } = validated;

    const foundUser = await usersService.getUserById(id);

    if (!foundUser.length) {
      return c.json({ error: 'User not found' }, 404);
    }
    const updatedUser = await updateUser(id, { name, age, email });

    return c.json(updatedUser);
  }
);

usersRoute.delete(
  '/:id',
  zValidator('param', userValidators.idParamSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const foundUser = await usersService.getUserById(id);

    if (!foundUser.length) {
      return c.json({ error: 'User not found' }, 404);
    }

    const deletedUser = await deleteUser(id);

    return c.json(deletedUser);
  }
);

export default usersRoute;
