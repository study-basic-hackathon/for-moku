import { auth } from "@/lib/auth/auth";
import { Room } from "./Room";
import { PARTYKIT_URL } from "@/app/env";

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {

  const { roomId } = await params;
  const url = `${PARTYKIT_URL}/parties/main/${roomId}`;

  const session = await auth();
  const user = session?.user as { name: string, email: string, image: string }

  await fetch(url, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
      <Room
        roomId={roomId}
        user={user}
      />
    </div>
  )
}
