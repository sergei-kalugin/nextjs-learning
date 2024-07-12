import bcrypt from 'bcrypt';
import {customers, invoices, revenue, users} from '../lib/placeholder-data';
import {sql} from "drizzle-orm";
import {db} from "@/app/db/db";
import {User} from "@/app/lib/definitions";

async function seedUsers() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);

  return Promise.all(
      users.map((user: User) => {
        // const hashedPassword = await bcrypt.hash(user.password, 10);
        return db.execute(sql`
            INSERT INTO users (id, name, email, password)
            VALUES (${user.id}, ${user.name}, ${user.email}, ${'foooooo'}) ON CONFLICT (id) DO NOTHING;
        `);
      }),
  );
}

async function seedInvoices() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS invoices (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      amount INT NOT NULL,
      status VARCHAR(255) NOT NULL,
      date DATE NOT NULL
    );
  `);

  return Promise.all(
      invoices.map((invoice) => {
        return db.execute(sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date} ON CONFLICT (id) DO NOTHING;
        `)
      }),
  );
}

async function seedCustomers() {
  await db.execute(sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS customers (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `);

  return await Promise.all(
      customers.map(
          (customer) => db.execute(sql`
              INSERT INTO customers (id, name, email, image_url)
              VALUES (${customer.id}, ${customer.name}, ${customer.email},
                      ${customer.image_url}) ON CONFLICT (id) DO NOTHING;
          `),
      ),
  );
}

async function seedRevenue() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `);

  return await Promise.all(
      revenue.map((rev) => db.execute(sql`
              INSERT INTO revenue (month, revenue)
              VALUES (${rev.month}, ${rev.revenue}) ON CONFLICT (month) DO NOTHING;
          `),
      ),
  );
}

export async function GET() {
  try {
    await db.execute(sql`BEGIN`);
    // await seedUsers();
    await seedInvoices();
    // await seedCustomers();
    // await seedRevenue();
    await db.execute(sql`COMMIT`);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await db.execute(sql`ROLLBACK`);
    return Response.json({ error }, { status: 500 });
  }
}
