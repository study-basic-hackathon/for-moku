import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/shadcn/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/shadcn/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import { auth, signOut } from "@/lib/auth/auth"

export async function TopNav() {
  const session = await auth();

  if (!session?.user) return null

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-sidebar border-b">
      <div className="flex items-center justify-between h-14 px-8">
        <div className="flex justify-center w-48">
          <Link href="#" prefetch={false}>
            <h1 className="text-2xl font-bold">forもく</h1>
          </Link>
        </div>
        <div className="flex items-center gap-2 text-sm">
          {session.user.email}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={`${session.user.image}`} alt="User Avatar"/>
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
              <form
                action={async () => {
                  "use server"
                  await signOut()
                }}
              >
                <button type="submit" className="w-full">
                  <DropdownMenuItem variant="destructive">
                    <LogOut />
                    ログアウト
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
