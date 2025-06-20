import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/atoms/shadcn/avatar";
import { User } from "lucide-react";
import { UserIcon } from "@/types/room/shared";
import UserIconTooltip from "./UserIconTooltip";

export default function NonDraggableIcon({
  icon 
} : {
  icon: UserIcon
}) {

  return (
    <div
      className="absolute size-12"
      style={{transform: `translate(${icon.position.x}px, ${icon.position.y}px)`}}
    >
      <UserIconTooltip user={icon.user}>
        <Avatar
          className="size-12"
          onClick={(e) => e.preventDefault()}
          onPointerDown={(e) => e.preventDefault()}
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
  )
}
