import PartySocket from "partysocket";
import { useRef, useState } from "react";
import Draggable, { DraggableData } from "react-draggable";
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/atoms/shadcn/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/atoms/shadcn/tooltip";
import { User } from "lucide-react";
import { UserIcon } from "@/types/room/shared";
import { EditProfileDialog } from "./EditProfileDialog";

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
        onMouseDown={(e) => e.stopPropagation()}
        onStop={(e, data) => handleDragStop(data)}
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
      >
        <div
          ref={nodeRef}
          className="absolute select-none size-12 z-21"
        >
          <Tooltip>
            <TooltipTrigger>
              <Avatar
                className="size-12 outline-3 outline-blue-300"
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
            </TooltipTrigger>
            <TooltipContent
              className="rounded-sm"
            >
              <p>{`${icon.user.name}`}</p>
              <p>{`client id: ${icon.user.id}`}</p>
              <p>{`${icon.user.bio ?? ""}`}</p>
              <p>{`${icon.user.interests ?? ""}`}</p>
            </TooltipContent>
          </Tooltip>
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
