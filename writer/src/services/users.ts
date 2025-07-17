import db from '@shared/db/index';
import type { NewUser, UpdateUser } from '@shared/db/schema/users';
import { activities, users } from '@shared/db/schema/index';
import * as utils from '@shared/db/utils';

export const createUser = async (user: NewUser) => {
  return await db.transaction(async (tx) => {
    const [newUser] = await tx.insert(users).values(user).returning();

    await tx.transaction(async (tx2) => {
      if (user.age >= 40) {
        await tx2.insert(activities).values({
          userId: newUser.id,
          type: 'LONGEVITY_BADGE',
          description: `🏅 ${newUser.name} has been awarded a longevity badge!`,
        });
      }
    });

    return newUser;
  });
};

export const updateUser = async (id: string, user: NewUser) => {
  return await db.update(users).set(user).where(utils.eq(users.id, id));
};

export const deleteUser = async (id: string) => {
  return await db.delete(users).where(utils.eq(users.id, id));
};

export const updateUserAndActivities = async (id: string, user: UpdateUser) => {
  return await db.transaction(async (tx) => {
    await tx
      .update(users)
      .set({
        name: user.name,
        age: user.age,
      })
      .where(utils.eq(users.id, id));

    await tx.insert(activities).values({
      userId: id,
      type: 'UPDATE',
      description: 'User has been updated',
    });
  });
};
