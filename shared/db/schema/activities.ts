import { pgEnum, pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { InferInsertModel, InferSelectModel, relations } from 'drizzle-orm';
import users from './users';

export const activityTypeEnum = pgEnum('activity_type', [
  'LOGIN',
  'LOGOUT',
  'VIEW_PAGE',
  'CLICK',
]);

const activities = pgTable('activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  type: activityTypeEnum('type').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export default activities;

export type Activity = InferSelectModel<typeof activities>;
export type NewActivity = InferInsertModel<typeof activities>;
