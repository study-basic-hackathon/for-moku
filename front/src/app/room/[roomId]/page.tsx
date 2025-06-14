import { auth } from "@/lib/auth/auth";
import { Room } from "./Room";
import { PARTYKIT_URL } from "@/app/env";
import { SessionProvider } from "next-auth/react";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = await params;
  if (roomId === "undefined") return null;

  const session = await auth();
  if (
    session?.user && session.roomId
    && session.roomId !== roomId
  ) {
    const { user, roomId } = session;
    fetch(`${PARTYKIT_URL}/parties/main/${roomId}`, {
      method: "DELETE",
      body: JSON.stringify(user.id),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const url = `${PARTYKIT_URL}/parties/main/${roomId}`;
  const req = await fetch(url, {
    method: "POST",
    body: JSON.stringify(session?.user as User),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const userId = await req.json();

  return (
    <SessionProvider>
      {/*<img src="https://i.ibb.co/1J4WN36v/room-sampleimage.png" draggable="false"/>*/}
      <Room
        roomId={roomId}
        userId={userId}
      />
    </SessionProvider>
  )
}
