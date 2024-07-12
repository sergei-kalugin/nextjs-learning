import {pgTable, text, timestamp, uuid, varchar, integer} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm";
import bcrypt from "bcrypt";

export const users = pgTable('users',{
  id: uuid('id').default(sql`uuid_generate_v4()`).primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export const invoices = pgTable('invoices',{
  // id: uuid('id').defaultRandom().primaryKey(),
  customer_id: uuid('customer_id').notNull(),
  amount: text('amount').notNull(),
  status: text('status').notNull(),
  date: timestamp('date').notNull(),
});

export const customers = pgTable('customers',{
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  image_url: varchar('image_url', {
    length: 255
  }).notNull(),
});

export const revenues = pgTable('revenues',{
  // id: uuid('id').defaultRandom().primaryKey(),
  month: varchar('month').notNull(),
  revenue: integer('revenue').notNull(),
});

