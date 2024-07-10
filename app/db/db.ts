// import postgres from "postgres";
//
// const sql = postgres(process.env.DATABASE_URL!);
//
// export default sql;

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/app/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
