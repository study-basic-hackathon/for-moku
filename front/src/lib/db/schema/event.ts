import {
  pgTable,
  bigint,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const events = pgTable("events", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  userGroupId: bigint("user_group_id", { mode: "number" }).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  startDateTime: timestamp("start_date_time", { mode: "date", withTimezone: true }).notNull(),
  endDateTime: timestamp("end_date_time", { mode: "date", withTimezone: true }).notNull(),
  eventUrl: text("event_url"),
  venueUrl: text("venue_url"),
  imageJson: jsonb("image_json"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true }).notNull().defaultNow(),
});
