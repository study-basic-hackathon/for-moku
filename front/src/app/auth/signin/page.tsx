import { signIn } from "@/lib/auth/auth"
import { Button } from "@/components/atoms/shadcn/button"


function isRoomPath(callbackUrl: string) {
  const path = new URL(callbackUrl).pathname;
  return path.match("^/room/[0-9]*$");
}

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {

  const { searchParams } = await props;
  const { callbackUrl } = await searchParams;

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex flex-col w-92 gap-2 p-6 m-8 bg-white rounded-sm border">
        <div className="flex justify-center items-center h-32 py-6">
          <img src="https://authjs.dev/img/logo-sm.png" alt="Logo" className="w-18 h-20 object-contain"/>
        </div>
        <form
          action={async () => {
            "use server"
            try {
              await signIn("google", {
                redirectTo: callbackUrl ?? "",
              })
            } catch (error) {
              throw error
            }
          }}
        >
          <Button className="rounded-s, h-12 w-full text-base font-light" type="submit">
            <span>Sign in with Google</span>
          </Button>
        </form>
        {callbackUrl && isRoomPath(callbackUrl) && (
          <>
            <div className="flex gap-2 items-center my-4">
              <div className="flex-1 bg-neutral-300 h-[1px]" />
              <span className="text-xs leading-4 uppercase text-neutral-500">
                or
              </span>
              <div className="flex-1 bg-neutral-300 h-[1px]" />
            </div>
            <form
              action={async () => {
                "use server"
                try {
                  await signIn("credentials", {
                    redirectTo: callbackUrl ?? "",
                  })
                } catch (error) {
                  throw error
                }
              }}
            >
              <Button className="rounded-sm h-12 w-full text-base font-light" type="submit">
                <span>Continue as Guest User</span>
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
