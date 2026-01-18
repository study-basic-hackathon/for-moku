import { selectEventById } from "@/lib/db/event";
import { insertFinishedEventState } from "@/lib/db/finished_event_state";
import { UserIcon } from "@/types/room/shared";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

 /**
 * @param roomId: string -> イベントID(PartykitのインスタンスID)
 * @returns レスポンス(Partykit Serverからのレスポンス)
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) {

  const { roomId } = await params;
  // PartyKit用にはUTCが必要なので、DBから直接UTC Dateを取得
  const [event] = await db.select().from(events).where(eq(events.id, Number(roomId))).limit(1);
  
  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }
  
  // DBから取得したendDateTimeはすでにUTC Dateなのでそのまま使用
  const message = { endTime: event.endDateTime }

  return NextResponse.json({ message });
}

 /**
 * @param roomId: string -> イベントID(PartykitのインスタンスID)
 * @returns レスポンス(Partykit Serverからのレスポンス)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) {

  const { roomId } = await params;
  const eventId = Number(roomId);
  const userIcons = (await req.json()) as UserIcon[];
  const res = await insertFinishedEventState(eventId, userIcons);

  return NextResponse.json({ message: res, status: 201 });
}
