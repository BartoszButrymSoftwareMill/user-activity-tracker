import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import {
  userSchema,
  idParamSchema,
  userUpdateSchema,
} from '@shared/validators/users';
import { getAllUsersWithActivities, getUserById } from '@shared/services/users';
import {
  createUser,
  deleteUser,
  updateUser,
  updateUserAndActivities,
} from 'src/services/users';

const usersRoute = new Hono();

usersRoute.post('/', zValidator('json', userSchema), async (c) => {
  const validated = c.req.valid('json');
  const { name, age, email } = validated;

  try {
    const newUser = await createUser({ name, age, email });
    return c.json(newUser);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

usersRoute.get('/', async (c) => {
  const usersRecords = await getAllUsersWithActivities();

  return c.json(usersRecords);
});

usersRoute.put(
  '/:id',
  zValidator('param', idParamSchema),
  zValidator('json', userSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const validated = c.req.valid('json');
    const { name, age, email } = validated;

    const foundUser = await getUserById(id);

    if (!foundUser.length) {
      return c.json({ error: 'User not found' }, 404);
    }
    const updatedUser = await updateUser(id, { name, age, email });

    return c.json(updatedUser);
  }
);

usersRoute.patch(
  '/:id',
  zValidator('param', idParamSchema),
  zValidator('json', userUpdateSchema),
  async (c) => {
    const { id } = c.req.valid('param');
    const validated = c.req.valid('json');
    const { name, age } = validated;

    const foundUser = await getUserById(id);

    if (!foundUser.length) {
      return c.json({ error: 'User not found' }, 404);
    }

    try {
      await updateUserAndActivities(id, { name, age });
      return c.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error(error);
      return c.json({ error: 'Failed to update user' }, 500);
    }
  }
);

usersRoute.delete('/:id', zValidator('param', idParamSchema), async (c) => {
  const { id } = c.req.valid('param');
  const foundUser = await getUserById(id);

  if (!foundUser.length) {
    return c.json({ error: 'User not found' }, 404);
  }

  const deletedUser = await deleteUser(id);

  return c.json(deletedUser);
});

export default usersRoute;
