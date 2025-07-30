"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserIcon } from "@/types/room/shared";
import ZoomPanContainer from "@/components/organisms/room/ZoomPanContainer";
import DraggableIcon from "@/components/organisms/room/DraggableIcon";
import NonDraggableIcon from "@/components/organisms/room/NonDraggableIcon";
import VenueImage from "@/components/organisms/room/VenueImage";

export default function ActiveEventTemplate({
  roomId,
  userId,
  imgUrl,
}: {
  roomId: string,
  userId: string,
  imgUrl?: string | null,
}) {

  const { data: session, status, update } = useSession();
  useEffect(() => {
    if (session && session.roomId !== roomId) {
      update({
        roomId: roomId,
      });
    }
  }, [status]);

  const [userIcons, setUserIcons] = useState<UserIcon[]>([]);

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

      if (message.type === "close") {
        window.location.reload();
      }
    },
  });

  const [scale, setScale] = useState(1);

  return (
    <ZoomPanContainer scale={scale} setScale={setScale}>
      {imgUrl && <VenueImage imgUrl={imgUrl}/>}
      {userIcons.map((icon, i) => {
        if (icon.user.id !== userId) {
          return <NonDraggableIcon key={i} icon={icon} roomId={roomId}/>
        } else {
          return <DraggableIcon key={i} socket={socket} icon={icon} scale={scale}/>
        }
      })}
    </ZoomPanContainer>
  )
};
