import { Config } from "drizzle-kit";

export default {
  schema: "app/db/schema",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  verbose: true,
  strict: true,
} satisfies Config;
