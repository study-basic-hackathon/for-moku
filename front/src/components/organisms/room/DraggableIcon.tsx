import PartySocket from "partysocket";
import { useRef, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/atoms/shadcn/avatar";
import { User } from "lucide-react";
import { UserIcon } from "@/types/room/shared";
import EditProfileDialog from "./EditProfileDialog";
import UserIconTooltip from "./UserIconTooltip";

export default function DraggableIcon({
  socket,
  icon,
  scale,
}: {
  socket: PartySocket,
  icon: UserIcon,
  scale: number,
}) {

  const nodeRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  function handleDragStop(data: DraggableData) {
    const message = {
      type: "move",
      user: icon.user,
      position: { x: data.x, y: data.y },
    }
    socket.send(JSON.stringify(message));
  }

  return (
    <>
      <Draggable
        defaultPosition={icon.position}
        scale={scale}
        handle=".handle"
        onMouseDown={(e) => e.stopPropagation()}
        onStop={(e, data) => handleDragStop(data)}
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
      >
        <div
          ref={nodeRef}
          className="absolute select-none size-12 z-1"
        >
          <UserIconTooltip user={icon.user}>
            <Avatar
              className="size-12 outline-3 outline-blue-300 hover:cursor-move handle"
              onDoubleClick={(e) => {
                setOpen(true)
              }}  
            >
              <AvatarImage
                src={`${icon.user.image}`}
                draggable="false"
                referrerPolicy="no-referrer"
              />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>
          </UserIconTooltip>
        </div>
      </Draggable>
      <EditProfileDialog
        socket={socket}
        open={open}
        setOpen={setOpen}
        user={icon.user}
      />
    </>
  )
}
