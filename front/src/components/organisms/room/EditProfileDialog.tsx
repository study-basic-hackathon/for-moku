"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/atoms/shadcn/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/shadcn/form";
import { Input } from "@/components/atoms/shadcn/input";
import { Textarea } from "@/components/atoms/shadcn/textarea";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/atoms/shadcn/dialog";
import { Dispatch, SetStateAction } from "react";
import PartySocket from "partysocket";
import { User } from "@/types/room/shared";

const formSchema = z.object({
	name: z.string(),
	bio: z.string(),
	interests: z.string(),
})

export function EditProfileDialog({
  socket,
  open,
  setOpen,
  user,
}: {
  socket: PartySocket,
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  user: User,
}) {

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: user.name,
			bio: user.bio ?? "",
			interests: user.interests ?? "",
		},
	})

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newUser = {
      id: user.id,
      name: values.name,
      email: user.email,
      image: user.image,
      bio: values.bio,
      interests: values.interests,
    }
    socket.send(JSON.stringify({ type: "edit", user: newUser }));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="rounded-sm p-0"
        aria-describedby={undefined}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <DialogTitle className="text-base px-6 py-5 border-b">
          ユーザー情報編集
        </DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>表示名</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>自己紹介</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder=""
                        rows={4}
                        className="resize-none field-sizing-fixed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage　/>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>興味のある分野</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between gap-2 p-2 pt-4">
              <Button
                variant="ghost"
                className="flex-1 rounded-sm"
                onClick={() => setOpen(false)}
              >
                キャンセル
              </Button>
              <div className="flex-1"/>
              <Button
                variant="ghost" 
                className="flex-1 rounded-sm"
                onClick={() => setOpen(false)}
                type="submit"
              >
                適用
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
