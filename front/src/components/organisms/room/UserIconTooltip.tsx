import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/atoms/shadcn/tooltip";
import { User } from "@/types/room/shared";

export default function ZoomPanContainer({
  user,
  children,
}: Readonly<{
  user: User,
  children: React.ReactNode,
}>) {

  return (
    <Tooltip>
      <TooltipTrigger>
        {children}
      </TooltipTrigger>
      <TooltipContent
        className="rounded-sm"
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <div className="max-w-48 flex flex-col gap-4 text-xs/4 text-wrap break-all">
          <p className="text-center">{`${user.name}`}</p>
          {user.bio && <p className="text-justify whitespace-pre-wrap ">{`${user.bio}`}</p>}
          {user.interests && <p>{`${user.interests ?? ""}`}</p>}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
