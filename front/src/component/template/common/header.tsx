import { SignIn, SignOut } from "@/component/organism/auth/authComponents";
import { auth } from "@/lib/auth/auth";

export default async function Header() {
  const session = await auth();
  return (
    <div className="flex flex-col justify-center items-center">
    {session ? <SignOut /> : <SignIn />}
    <span>email: {session?.user?.email}</span>
  </div>
  )
}