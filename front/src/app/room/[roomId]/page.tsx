import { auth, GUEST_EMAIL } from "@/lib/auth/auth";
import { Room } from "./Room";
import { PARTYKIT_URL } from "@/app/env";
import { SessionProvider } from "next-auth/react";
import { selectUserByEmail } from '@/lib/db/user';
import { selectEventById } from "@/lib/db/event";
import { notFound } from "next/navigation";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = await params;
  if (roomId === "undefined") return null;

  const event = await selectEventById(Number(roomId));
  if (!event) notFound();

  const currDateTime = new Date();
  console.log(event.startDateTime, event.endDateTime);
  if (currDateTime < event.startDateTime) {
    console.log("too early");
  }
  if (currDateTime > event.endDateTime) {
    console.log("too late");
  }

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
      <Room
        roomId={roomId}
        userId={userId}
        imgUrl={event?.imageUrl}
      />
    </SessionProvider>
  )
}
