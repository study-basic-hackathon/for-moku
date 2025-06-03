import { Room } from "./Room";
export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {

  const { roomId } = await params;

  return (
    <div>
      <Room
        roomId={roomId}
      />
    </div>
  )
}
