import {
  pgTable,
  bigint,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(), // 自動採番される整数ID
  email: text("email").notNull(),
  name: text("name").notNull(),
  bio: text("bio"),
  interests: text("interests"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  deactivatedAt: timestamp("deactivated_at", { mode: "date", withTimezone: true }),
});
