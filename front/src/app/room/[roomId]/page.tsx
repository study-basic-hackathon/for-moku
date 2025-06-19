import { auth, GUEST_EMAIL } from "@/lib/auth/auth";
import { PARTYKIT_URL } from "@/app/env";
import { SessionProvider } from "next-auth/react";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { eq, and } from 'drizzle-orm';
import { selectEventById } from "@/lib/db/event";
import { selectUserByEmail } from '@/lib/db/user';
import { users, userGroupAssignments } from "@/lib/db/schema";
import Link from "next/link";
import { User, UserIcon } from "@/types/room/shared";
import ActiveEventTemplate from "@/components/templates/room/ActiveEventTemplate";
import ClosedEventTemplate from "@/components/templates/room/ClosedEventTemplate";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {

  const { roomId } = await params;
  if (roomId === "undefined") return null;

  const eventId = Number(roomId);
  if (isNaN(eventId)) notFound();

  const event = await selectEventById(Number(roomId));
  if (!event) notFound();

  const currDateTime = new Date();
  if (currDateTime < event.startDateTime) {
    return eventNotStarted();
  }
  if (currDateTime > event.endDateTime) {
    const url = `${PARTYKIT_URL}/parties/main/${roomId}`;
    const req = await fetch(url);
    const userIcons = (await req.json()) as UserIcon[];

    return (
      <ClosedEventTemplate
        userIcons={userIcons}
        imgUrl={event?.imageUrl}
      />
    )
  }

  const session = await auth();
  if (!session?.user) return null;
  const user = { ...session.user } as User;

  if (user.email !== GUEST_EMAIL) {
    const res = await selectUserByEmail(user.email);

    if (res) {
      user.name = res.name;
      user.bio = res.bio ?? "";
      user.interests = res.interests ?? "";

      const userId = res.id, userGroupId = event.userGroupId;
      if (!(await memberAssignmentExists(userId, userGroupId))) {
        await insertMemberAssignment(userId, userGroupId);
      }
    } else {
      user.name = "New User";

      const userId = await insertNewUser(user.email);
      await insertMemberAssignment(userId, event.userGroupId);
    }
  }

  if (session.roomId && session.roomId !== roomId) {
    removeUserFromRoom(user.id, session.roomId);
  }

  addUserToRoom(user, roomId);

  return (
    <SessionProvider>
      <ActiveEventTemplate
        roomId={roomId}
        userId={user.id}
        imgUrl={event?.imageUrl}
      />
    </SessionProvider>
  )
}

function eventNotStarted() {
  return (
    <div className="size-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl">このイベントはまだ開始されていない</h1>
      <Link href="/" prefetch={false}>
        <p className="text-base hover:underline">イベント詳細ページへ</p>
      </Link>
    </div>  
  )
}

async function memberAssignmentExists(
  userId: number,
  userGroupId: number
) {
  const res = 
    await db.select().from(userGroupAssignments).where(
      and(
        eq(userGroupAssignments.userGroupId, userGroupId),
        eq(userGroupAssignments.userId, userId)
      )
    )
  return res.length !== 0;
}

async function insertMemberAssignment(
  userId: number, 
  userGroupId: number
) {
  await db.insert(userGroupAssignments).values({
    userId,
    userGroupId,
    role: "member",
  });
}

async function insertNewUser(email: string) {
  return (await db.insert(users).values({
    email: email,
    name: "New User",
    bio: "",
    interests: "",
  }).returning())[0].id;
}

function removeUserFromRoom(userId: string, roomId: string) {
  fetch(`${PARTYKIT_URL}/parties/main/${roomId}`, {
    method: "DELETE",
    body: JSON.stringify(userId),
    headers: {
      "Content-Type": "application/json",
    },
  })
}

function addUserToRoom(user: User, roomId: string) {
  fetch(`${PARTYKIT_URL}/parties/main/${roomId}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
