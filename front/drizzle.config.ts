import type { Config } from "drizzle-kit";

let url = "postgresql://postgres:postgres@localhost:5432/postgres";

if (process.env.NODE_ENV === 'production') {
  url = process.env.DATABASE_URL!;
  if (!url) throw new Error(
    "DATABASE_URL environment variable not found."
  );
}

export default {
  dialect: "postgresql",
  schema: "./src/lib/db/schema",        // ← schema.ts ではなく schema ディレクトリを指定
  dbCredentials: { url },
  verbose: true,
  strict: true,
} satisfies Config;
