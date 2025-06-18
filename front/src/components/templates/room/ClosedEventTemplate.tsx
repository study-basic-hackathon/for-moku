"use client";
import { useState } from "react";
import { UserIcon } from "@/types/room/shared";
import ZoomPanContainer from "@/components/organisms/room/ZoomPanContainer";
import NonDraggableIcon from "@/components/organisms/room/NonDraggableIcon";

export default function ActiveEventTemplate({
  userIcons,
  imgUrl,
}: {
  userIcons: UserIcon[],
  imgUrl?: string | null,
}) {

  const [scale, setScale] = useState(1);

  return (
    <ZoomPanContainer scale={scale} setScale={setScale}>
      {imgUrl && <img src={imgUrl} draggable="false"/>}
      {userIcons.map((icon, i) => {
        return <NonDraggableIcon key={i} icon={icon}/>
      })}
    </ZoomPanContainer>
  )
};
