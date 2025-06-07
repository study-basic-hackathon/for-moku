import {
    pgTable,
    bigint,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";

  export const userGroups = pgTable("user_groups", {
    id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
    name: text("name").notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  });
