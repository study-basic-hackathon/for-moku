import { selectEventById } from "@/lib/db/event";
import { NextRequest, NextResponse } from "next/server";

 /**
 * @param req リクエスト(画像データ)
 * @returns レスポンス(Gyazo APIからのレスポンス)
 */
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) {
  const { roomId } = await params;
  const event = await selectEventById(Number(roomId));
  console.log(roomId, event);
  return NextResponse.json({ message: event });
}

 /**
 * @param req リクエスト(画像データ)
 * @returns レスポンス(Gyazo APIからのレスポンス)
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ roomId: string }> },
) {

  console.log("post request");
  const test = await req.json();
  console.log(test);
  return NextResponse.json({ message: "post request success", status: 201 });
}
