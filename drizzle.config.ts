import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    user: "sergeikalugin",
    password: process.env.DATABASE_PASSWORD,
    host: "127.0.0.1",
    port: 5432,
    database: "sergeikalugin",
    ssl: false
  },
  verbose: true,
  strict: true,
});
