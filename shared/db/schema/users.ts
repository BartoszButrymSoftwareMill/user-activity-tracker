import {
  pgTable,
  uuid,
  integer,
  uniqueIndex,
  check,
  varchar,
} from 'drizzle-orm/pg-core';
import {
  relations,
  sql,
  InferInsertModel,
  InferSelectModel,
} from 'drizzle-orm';
import activities from './activities';

const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    age: integer('age').notNull(),
    email: varchar('email', { length: 255 }).notNull(),
  },
  (table) => [
    uniqueIndex('email_idx').on(table.email),
    check('age_check', sql`age > 0`),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  activities: many(activities),
}));

export default users;

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UpdateUser = Omit<InferInsertModel<typeof users>, 'email'>;
