"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { useEffect, useRef, useState } from "react";
import Draggable, { DraggableData } from 'react-draggable';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/shadcn/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/shadcn/tooltip";
import { User } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import { WheelEvent } from "react";
import PartySocket from "partysocket";
import { useSession } from "next-auth/react";

export function Room({
  roomId,
  userId,
}: {
  roomId: string;
  userId: string;
}) {

  const [userIcons, setUserIcons] = useState<UserIcon[]>([]);

  const { data: session, status, update } = useSession();
  useEffect(() => {
    if (session && session.roomId !== roomId) {
      update({
        roomId: roomId,
      });
    }
  }, [status]);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: roomId,
    id: userId,

    onMessage(event) {
      const message = JSON.parse(event.data);

      if (message.type === "sync") {
        setUserIcons(message.userIcons);
      }

      if (message.type === "new") {
        const userIcon = { user: message.user, position: { x: 0, y: 0 } };
        setUserIcons(prev => [...prev, userIcon])
      }

      if (message.type === "move") {
        const userIcon = { user: message.user, position: message.position }
        setUserIcons(prev =>
          prev.map(icon => icon.user.id === message.user.id ? userIcon : icon)
        )
      }

      if (message.type === "edit") {
        setUserIcons(prev => 
          prev.map(icon => {
            const userIcon = { user: message.user, position: icon.position }
            return icon.user.id === message.user.id ? userIcon : icon;
          })
        )
      }

      if (message.type === "delete") {
        setUserIcons(prev =>
          prev.filter(icon => icon.user.id !== message.userId)
        )
      }
    },
  });

  const [scale, setScale] = useState(1);

  function onScroll(event: WheelEvent<HTMLDivElement>) {
    const delta = event.deltaY * -0.001;
    const newScale = scale + delta;
    if (newScale >= 0.5 && newScale <= 2) {
      setScale(newScale);
    }
  }

  return (
    <div className="w-full h-full overflow-hidden" onWheel={onScroll}>
      <div className="w-full h-full flex justify-center items-center" style={{transform: `scale(${scale})`}}>
        {userIcons.map((icon, i) => {
          if (icon.user.id !== userId) {
            return (
              <div
                key={i}
                className="absolute select-none size-12"
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
                    <p>{`client id: ${icon.user.id}`}</p>
                    <p>{`${icon.user.bio ?? ""}`}</p>
                    <p>{`${icon.user.interests ?? ""}`}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )
          } else {
            return (
              <DraggableIcon
                key={i}
                socket={socket}
                icon={icon}
                scale={scale}
              />
            )
          }
        })}
      </div>
    </div>
  )
};

function DraggableIcon({
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
        bounds="parent"
        defaultPosition={icon.position}
        scale={scale}
        onStop={(e, data) => handleDragStop(data)}
        nodeRef={nodeRef as React.RefObject<HTMLElement>}
      >
        <div
          ref={nodeRef}
          className="absolute select-none size-12 z-1"
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
