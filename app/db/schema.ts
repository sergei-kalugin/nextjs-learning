import {pgTable, text, timestamp, uuid} from "drizzle-orm/pg-core";

export const users = pgTable('users',{
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const invoices = pgTable('invoices',{
  id: uuid('id').defaultRandom().primaryKey(),
  customer_id: uuid('customer_id').notNull(),
  amount: text('amount').notNull(),
  status: text('status').notNull(),
  date: timestamp('date').notNull(),
});
