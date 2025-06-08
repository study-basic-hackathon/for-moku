"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { useRef, useState } from "react";
import Draggable, { DraggableData } from 'react-draggable';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/shadcn/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/shadcn/tooltip";
import { User } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import { WheelEvent } from "react";

export function Room(props: {
  roomId: string;
  user: User;
}) {

  const [userIcons, setUserIcons] = useState<UserIcon[]>([]);

  function handleDragStop(data: DraggableData) {
    const message = {
      type: "move",
      user: user,
      position: { x: data.x, y: data.y },
    }
    socket.send(JSON.stringify(message));
  }

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: props.roomId,

    onOpen() {
      console.log("connected");
    },

    onMessage(event) {
      const message = JSON.parse(event.data);

      if (message.type === "sync") {
        setUserIcons(message.userIcons);
      }
      if (message.type === "new") {
        const userIcon = { user: message.user, position: { x: 0, y: 0 }};
        setUserIcons(prev => [...prev, userIcon])
      }
      if (message.type === "move") {
        const userIcon = { user: message.user, position: message.position }
        setUserIcons(prev =>
          prev.map(icon => icon.user.email === message.user.email ? userIcon : icon)
        )
      }
      if (message.type === "edit") {
        setUserIcons(prev => 
          prev.map(icon => {
            const userIcon = { user: message.user, position: icon.position }
            return icon.user.email === message.user.email ? userIcon : icon;
          })
        )
      }
    },

    onClose() {
      console.log("closed");
    },

    onError(e) {
      console.log("error");
    }
  });

  const nodeRef = useRef<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(props.user);

  const [scale, setScale] = useState(1);

  function onScroll(event: WheelEvent<HTMLDivElement>) {
    const delta = event.deltaY * -0.001;
    setScale(scale + delta);
  }

  return (
    <div className="w-full h-full overflow-hidden" onWheel={onScroll}>
      <div className="w-full h-full flex justify-center items-center" style={{transform: `scale(${scale})`}}>
        <EditProfileDialog
          socket={socket}
          open={open}
          setOpen={setOpen}
          user={user}
          setUser={setUser}
        />
        {userIcons.map((icon, i) => {
          if (icon.user.email !== user.email) {
            return (
              <div
                key={i}
                className="absolute size-12 select-none"
                style={{transform: `translate(${icon.position.x}px, ${icon.position.y}px)`}}
                >
                <Tooltip>
                  <TooltipTrigger
                    onClick={(e) => e.preventDefault()}
                    onPointerDown={(e) => e.preventDefault()}
                  >
                    <Avatar className="size-12">
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
                    onPointerDownOutside={(e) => e.preventDefault()}
                  >
                    <p>{`${icon.user.name}`}</p>
                    <p>{`${icon.user.bio ?? ""}`}</p>
                    <p>{`${icon.user.interests ?? ""}`}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          } else {
            return (
              <Draggable
                key={i}
                bounds="parent"
                defaultPosition={icon.position}
                onStop={(e, data) => handleDragStop(data)}
                nodeRef={nodeRef as React.RefObject<HTMLElement>}// エラーは無視する（React 19で廃止されたfindDOMNodeを使っているため）
              >
                <Avatar 
                  ref={nodeRef}
                  className="absolute size-12 select-none z-1"
                  onDoubleClick={() => setOpen(true)}
                >
                  <AvatarImage 
                    src={`${user.image}`}
                    draggable="false"
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              </Draggable>
            )
          }
        })}
      </div>
    </div>
  )
};
