"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { useState } from "react";
import Draggable, { DraggableData } from 'react-draggable';
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/shadcn/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/atoms/shadcn/tooltip";
import { User } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/atoms/shadcn/dialog";
import { Button } from "@/components/atoms/shadcn/button";
import { Label } from "@/components/atoms/shadcn/label";
import { Input } from "@/components/atoms/shadcn/input";

type User = {
  name: string,
  email: string,
  image: string,
  bio?: string,
  interests?: string
}

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
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="rounded-sm p-0">
          <DialogTitle className="sr-only"/>
          <div className="p-3 border-b">
            ユーザー情報編集
          </div>
          <div className="grid gap-4 px-6 py-3">
            <div className="grid gap-3">
              <Label htmlFor="name-1">表示名</Label>
              <Input id="name-1" name="name" defaultValue={user.name}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="bio-1">自己紹介</Label>
              <Input id="bio-1" name="bio" defaultValue={user.bio}/>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="interests-1">興味のある分野</Label>
              <Input id="interests-1" name="interests" defaultValue={user.interests}/>
            </div>
          </div>
          <div className="flex justify-between px-6 pb-6">
            <Button>キャンセル</Button>
            <Button type="submit">適用</Button>
          </div>
        </DialogContent>
      </Dialog>
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
                  onPointerDown={(event) => event.preventDefault()}
                >
                  <Avatar className="size-12 pointer-events-none">
                    <AvatarImage 
                      src={`${icon.user.image}`}
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
              nodeRef={nodeRef}// エラーは無視する（React 19で廃止されたfindDOMNodeを使っているため）
            >
              <Avatar 
                ref={nodeRef} 
                className="absolute size-12 select-none z-1"
                onDoubleClick={() => setOpen(true)}
              >
                <AvatarImage 
                  src={`${user.image}`}
                  className="pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
            </Draggable>
          )
        }
      })}
    </>  
  )
};
