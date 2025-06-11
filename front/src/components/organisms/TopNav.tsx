import Link from "next/link"
import { auth } from "@/lib/auth/auth"
import { AvatarDropdown } from "@/components/organisms/AvatarDropdown"

export async function TopNav() {
  const session = await auth();

  return (
    <nav className="fixed inset-x-0 top-0 z-50 bg-sidebar border-b">
      <div className="flex items-center justify-between h-14 px-8">
        <div className="flex justify-center w-48">
          <Link href="/" prefetch={false}>
            <h1 className="text-2xl font-bold">forもく</h1>
          </Link>
        </div>
        {session?.user && <AvatarDropdown user={session.user}/>}
      </div>
    </nav>
  )
}
