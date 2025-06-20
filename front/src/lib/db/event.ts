import { db } from "@/lib/db";
import { events } from "@/lib/db/schema/event";
import { asc, eq, and } from "drizzle-orm";
import { Event, EventSearchResult, EventWithoutVenueJson, NewEvent, UpdateEvent, EventEditViewInfo } from "@/types/event/schema";
import { users } from "@/lib/db/schema/user";
import { userGroupAssignments } from "@/lib/db/schema/user_group_assignment";
import { Transaction } from "@/types/db";
import { userGroups } from "@/lib/db/schema/user_group";

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

/**
 * ユーザーのメールアドレスに基づいてイベント一覧を取得する
 * 
 * 見つからなければ、空のリストを返却する
 * @param email ユーザーのメールアドレス
 * @returns イベント一覧(会場情報は除外している)
 */
export async function selectEventsByUserEmail(email: string): Promise<EventWithoutVenueJson[]> {
  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,
      userGroupId: events.userGroupId,
      startDateTime: events.startDateTime,
      endDateTime: events.endDateTime,
      eventUrl: events.eventUrl,
      createdAt: events.createdAt,
      updatedAt: events.updatedAt,
      imageUrl: events.imageUrl,
      venueUrl: events.venueUrl,
    })
    .from(events)
    .innerJoin(userGroupAssignments, eq(events.userGroupId, userGroupAssignments.userGroupId))
    .innerJoin(users, eq(userGroupAssignments.userId, users.id))
    .where(eq(users.email, email))
    .orderBy(asc(events.startDateTime));
  
  return result;
}
/**
 * 
 * ユーザーのメールアドレスに基づいてイベント一覧を取得する
 * 
 * 見つからなければ、空のリストを返却する
 * 取得する項目は以下に限定している。
 * 
 * - id: イベントID
 * - name: イベント名
 * - description: イベント説明
 * - startDateTime: イベント開始日時
 * - endDateTime: イベント終了日時
 * - userGroupName: ユーザーグループ名
 * - role: ユーザーの権限
 * 
 * @param email ユーザーのメールアドレス
 * 
 * @returns イベント一覧(会場情報は除外している)
 */
export async function selectEventsSearchResultByUserEmail(email: string): Promise<EventSearchResult[]> {
  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,
      startDateTime: events.startDateTime,
      endDateTime: events.endDateTime,
      userGroupName: userGroups.name,
      role: userGroupAssignments.role,
    })
    .from(events)
    .innerJoin(userGroupAssignments, eq(events.userGroupId, userGroupAssignments.userGroupId))
    .innerJoin(users, eq(userGroupAssignments.userId, users.id))
    .innerJoin(userGroups, eq(userGroupAssignments.userGroupId, userGroups.id))
    .where(eq(users.email, email))
    .orderBy(asc(events.startDateTime));
  
  return result;
}


/**
 * ユーザーのメールアドレスとイベントIDに基づいて、イベント編集画面で使うビュー情報を取得する
 * 
 * @param email ユーザーのメールアドレス
 * @param eventId イベントID
 * @returns イベント詳細画面で使うビュー情報
 */
export async function selectEventEditViewInfoByUserEmailAndEventId(email: string, eventId: number): Promise<EventEditViewInfo | null> {
  const result = await db
    .select({
      id: events.id,
      name: events.name,
      description: events.description,
      startDateTime: events.startDateTime,
      endDateTime: events.endDateTime,
      eventUrl: events.eventUrl,
      venueUrl: events.venueUrl,
    })
    .from(events)
    .innerJoin(userGroupAssignments, eq(events.userGroupId, userGroupAssignments.userGroupId))
    .innerJoin(users, eq(userGroupAssignments.userId, users.id))
    .innerJoin(userGroups,eq(userGroupAssignments.userGroupId, userGroups.id) )
    .where(and(eq(events.id, eventId), eq(users.email, email), eq(userGroupAssignments.role, 'admin')))
    .limit(1);
  
  return result[0] ?? null;
}