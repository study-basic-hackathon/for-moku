import { db } from "@/lib/db";
import { events } from "@/lib/db/schema/event";
import { eq, ExtractTablesWithRelations, InferInsertModel, InferSelectModel } from "drizzle-orm";
import { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import { PgTransaction } from "drizzle-orm/pg-core";
import * as schema from '@/lib/db/schema';

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;
export type UpdateEvent = Partial<NewEvent>;

export type Transaction = PgTransaction<NodePgQueryResultHKT, typeof schema, ExtractTablesWithRelations<typeof schema>>;

/**
 * イベントを登録する
 * @param event 登録するイベント情報
 * @returns 登録されたイベント
 */
export async function insertEvent(tx: Transaction, event: NewEvent): Promise<Event> {
  const [createdEvent] = await tx.insert(events).values(event).returning();
  return createdEvent;
}

/**
 * イベントを取得する
 * @param id イベントID
 * @returns イベント情報
 */
export async function selectEventById(id: number): Promise<Event | undefined> {
  const [event] = await db.select().from(events).where(eq(events.id, id));
  return event;
}

/**
 * グループに所属するイベント一覧を取得する
 * @param userGroupId ユーザーグループID
 * @returns イベント一覧
 */
export async function selectEventsByUserGroupId(userGroupId: number): Promise<Event[]> {
  return await db.select().from(events).where(eq(events.userGroupId, userGroupId));
}

/**
 * イベントを更新する
 * @param id イベントID
 * @param event 更新するイベント情報
 * @returns 更新されたイベント
 */
export async function updateEvent(tx: Transaction, id: number, event: UpdateEvent): Promise<Event | undefined> {
  const [updatedEvent] = await tx
    .update(events)
    .set({ ...event, updatedAt: new Date() })
    .where(eq(events.id, id))
    .returning();
  return updatedEvent;
}