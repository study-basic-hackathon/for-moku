import { selectEventById } from "@/lib/db/event";
import { insertFinishedEventState } from "@/lib/db/finished_event_state";
import { UserIcon } from "@/types/room/shared";
import { NextRequest, NextResponse } from "next/server";
import { convertJSTToUTC } from "@/lib/util/date";

 /**
 * @param roomId: string -> イベントID(PartykitのインスタンスID)
 * @returns レスポンス(Partykit Serverからのレスポンス)
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) {

  const { roomId } = await params;
  const event = await selectEventById(Number(roomId));
  
  // selectEventByIdはJST Dateを返すので、PartyKitサーバー用にUTCに変換
  const endTimeUTC = convertJSTToUTC(event!.endDateTime);
  const message = { endTime: endTimeUTC }

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
