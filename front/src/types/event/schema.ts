import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { events } from "@/lib/db/schema/event";
import { Role } from "@/types/event/role";

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type UpdateEvent = Partial<NewEvent>;

/**
 * DBからクエリする際のイベントの型
 * 
 * 会場情報は除外している。
 * また、ユーザーの権限も取得している。
 * 
 */
export type EventWithoutVenueJson = Omit<Event, 'imageJson'>;

/**
 * イベント検索結果の型
 * 
 * select文で取得するフィールドに対応
 */
export type EventSearchResult = {
  id: number;
  name: string;
  description: string | null;
  startDateTime: Date;
  endDateTime: Date;
  userGroupName: string;
  role: Role;
};