import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

const url =
  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.LOCAL_DATABASE_URL;
if (!url)
  throw new Error(
    `Connection string to ${process.env.NODE_ENV ? 'Neon' : 'local'} Postgres not found.`
  );

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema",        // ← schema.ts ではなく schema ディレクトリを指定
  dbCredentials: { url },
  verbose: true,
  strict: true,
} satisfies Config;
