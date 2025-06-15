import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema",        // ← schema.ts ではなく schema ディレクトリを指定
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;