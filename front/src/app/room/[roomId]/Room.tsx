"use client";
import usePartySocket from "partysocket/react";
import { PARTYKIT_HOST } from "@/app/env";

export function Room(props: { roomId: string }) {
  const { roomId } = props;

  const ws = usePartySocket({
    host: PARTYKIT_HOST,
    room: roomId,

    onOpen() {
      console.log("connected");
    },
    onMessage(e) {
      console.log("message", e.data);
    },
    onClose() {
      console.log("closed");
    },
    onError(e) {
      console.log("error");
    }
  });

  return (
    <>
      Room
    </>
  )
};