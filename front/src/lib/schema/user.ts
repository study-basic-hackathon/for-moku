import {
    pgTable,
    uuid,
    text,
    timestamp,
  } from "drizzle-orm/pg-core";

  export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(), // UUID 主キー
    email: text("email").notNull(),
    name: text("name").notNull(),
    bio: text("bio"),
    interests: text("interests"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
    deactivatedAt: timestamp("deactivated_at"),
  });
