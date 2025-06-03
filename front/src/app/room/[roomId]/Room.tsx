"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { useState } from "react";
import Draggable, { DraggableData } from 'react-draggable';
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/shadcn/avatar";
import { User } from "lucide-react";

type User = { name: string, email: string, image: string }

type UserIcon = {
  user: User,
  position: { x: number, y: number },
}

export function Room({
  roomId,
  user,
}: {
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
    room: roomId,

    onOpen() {
      console.log("connected");
    },

    onMessage(event) {
      const message = JSON.parse(event.data);

      if (message.type === "sync") setUserIcons(message.userIcons);
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
    },

    onClose() {
      console.log("closed");
    },

    onError(e) {
      console.log("error");
    }
  });

  const nodeRef = React.useRef(null);
  return (
    <>
      {userIcons.map((icon, i) => {
        if (icon.user.email !== user.email) {
          return (
            <div
              key={i}
              className="absolute size-fit select-none"
              style={{transform: `translate(${icon.position.x}px, ${icon.position.y}px)`}}
              >
              <Avatar className="size-12 pointer-events-none">
                <AvatarImage src={`${icon.user.image}`} alt="User Icon"/>
                <AvatarFallback><User /></AvatarFallback> 
              </Avatar>
            </div>
          )
        } else {
          return (
            <Draggable
              key={i}
              bounds="parent"
              defaultPosition={icon.position}
              onStop={(e, data) => handleDragStop(data)}
              nodeRef={nodeRef}// エラーは無視する（React 19で廃止されたfindDOMNodeを使っているため）
            >
              <Avatar ref={nodeRef} className="absolute size-12 select-none z-1">
                <AvatarImage src={`${user.image}`} alt="User Icon" className="pointer-events-none"/>
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            </Draggable>
          )
        }
      })}
    </>  
  )
};
