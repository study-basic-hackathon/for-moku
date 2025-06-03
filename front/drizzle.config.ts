"use server";
import type { Config } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env" });

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema",        // ← schema.ts ではなく schema ディレクトリを指定
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
} satisfies Config;