import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { events } from "@/lib/db/schema/event";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type UpdateEvent = Partial<NewEvent>;