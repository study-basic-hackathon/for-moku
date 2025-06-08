import { auth } from "@/lib/auth/auth";
import { Room } from "./Room";
import { PARTYKIT_URL } from "@/app/env";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = await params;
  const url = `${PARTYKIT_URL}/parties/main/${roomId}`;

  const session = await auth();
  const req = await fetch(url, {
    method: "POST",
    body: JSON.stringify(session?.user as User),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = (await req.json()) as User;

  return (
    <>
      {/*<img src="https://i.ibb.co/1J4WN36v/room-sampleimage.png" draggable="false"/>*/}
      <Room
        roomId={roomId}
        user={user}
      />
    </>
  )
}
