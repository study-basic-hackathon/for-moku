import { auth, GUEST_EMAIL } from "@/lib/auth/auth";
import { Room } from "./Room";
import { PARTYKIT_URL } from "@/app/env";
import { SessionProvider } from "next-auth/react";
import { selectUserByEmail } from '@/lib/db/user';

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = await params;
  if (roomId === "undefined") return null;

  const session = await auth();
  if (!session?.user) return null;

  if (session.roomId && session.roomId !== roomId) {
    const { user, roomId } = session;
    fetch(`${PARTYKIT_URL}/parties/main/${roomId}`, {
      method: "DELETE",
      body: JSON.stringify(user.id),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  const user = { ...session.user } as User;

  if (user.email !== GUEST_EMAIL) {
    const res = await selectUserByEmail(user.email);
    if (res) {
      user.name = res.name;
      user.bio = res.bio ?? "";
      user.interests = res.interests ?? "";
    }
  }

  const url = `${PARTYKIT_URL}/parties/main/${roomId}`;
  const req = await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
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
