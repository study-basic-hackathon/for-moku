import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/lib/db/schema";
import { DATABASE_URL } from "@/app/env";

import { config } from "dotenv";
config({ path: ".env" });

const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema });
