import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const users = pgTable('users',{
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
});
