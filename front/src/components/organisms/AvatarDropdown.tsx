"use client"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/shadcn/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/shadcn/avatar"
import { LogOut, Settings, User } from "lucide-react"
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react"

export function AvatarDropdown(props: {
	user: { 
    name?: string | null,
  	email?: string | null,
  	image?: string | null,
  },
}) {

  if (usePathname().startsWith("/auth")) return;

	return (
		<div className="flex items-center gap-2 text-sm">
      {props.user.email}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={`${props.user.image}`} alt="User Avatar"/>
            <AvatarFallback><User /></AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[7rem] shadow-none">
          <DropdownMenuItem>
            <Link href="/user/edit">
              <User />
              アカウント
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings />
            設定
          </DropdownMenuItem>
          <button
            onClick={() => signOut()}
            className="w-full"
          >
            <DropdownMenuItem variant="destructive">
              <LogOut />
              ログアウト
            </DropdownMenuItem>
          </button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
	)
}