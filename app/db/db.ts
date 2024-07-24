import {Client} from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/app/db/schema";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

await client.connect();

export const db = drizzle(client, { schema });
