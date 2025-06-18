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
}
