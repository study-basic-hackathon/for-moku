import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/shadcn/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"

export function TopNav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-sidebar border-b">
      <div className="flex items-center justify-between h-14 px-8">
        <div className="flex justify-center w-48">
          <Link href="#" prefetch={false}>
            <h1 className="text-2xl font-bold">forもく</h1>
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm">
            YasunariIguchi
            <Avatar>
              <AvatarImage src="https://avatars.githubusercontent.com/u/39820920" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <User />
              アカウント
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              設定
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <LogOut />
              ログアウト
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
