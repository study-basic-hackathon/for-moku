import { signIn, signOut } from "@/lib/auth/auth"

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<"button">) {
  return (
    <div className="bg-blue-500 p-2">
      <form
        action={async () => {
          "use server"
          await signIn(provider)
        }}
      >
        <button {...props}>Sign In</button>
      </form>
    </div>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<"button">) {
  return (
    <div className="bg-red-500 p-2">
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button {...props}>Sign Out</button>
      </form>
    </div>
  )
}
