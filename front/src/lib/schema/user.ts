import {
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(), // 自動採番される整数ID
  email: text("email").notNull(),
  name: text("name").notNull(),
  bio: text("bio"),
  interests: text("interests"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
  deactivatedAt: timestamp("deactivated_at", { mode: "date" }),
});
