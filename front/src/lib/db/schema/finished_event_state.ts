import {
  pgTable,
  bigint,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

export const finishedEventState = pgTable("finished_event_state", {
  id: bigint("id", { mode: "number" }).primaryKey().generatedAlwaysAsIdentity(),
  eventId: bigint("event_id", { mode: "number" }).unique().notNull(),
  userIcons: jsonb("user_icons").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});
