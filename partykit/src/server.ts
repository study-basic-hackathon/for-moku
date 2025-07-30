import type * as Party from "partykit/server";

import { toZonedTime, fromZonedTime } from 'date-fns-tz';

const BASE_URL = "https://for-moku-deploy-test.vercel.app/api/room/"

type User = {
  id: string,
  name: string,
  email: string,
  image: string,
  bio?: string,
  interests?: string,
}

type UserIcon = {
  user: User,
  position: { x: number, y: number },
}

export default class Server implements Party.Server {
  userIcons?: UserIcon[];
  constructor(readonly room: Party.Room) {}

  async ensureLoadUserIcons() {
    if (!this.userIcons) {
      this.userIcons = (await this.room.storage.get<UserIcon[]>("userIcons")) ?? [];
    }
    return this.userIcons;
  }

  async onStart() { 
    await this.room.storage.put<string>("roomId", this.room.id);

    const response = await fetch(`${BASE_URL}${this.room.id}`);
    const { message } = await response.json();
    const endTime = new Date(message.endTime);

    if (endTime.getTime() > Date.now()) {
      const alarm = fromZonedTime(endTime, 'Asia/Tokyo');
      await this.room.storage.setAlarm(alarm);
    }
  }

  async onAlarm() {
    const roomId = await this.room.storage.get<string>("roomId");
    const userIcons = await this.ensureLoadUserIcons();

    await fetch(`${BASE_URL}${roomId}`, {
      method: "POST",
      body: JSON.stringify(userIcons),
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.room.broadcast(JSON.stringify({ type: "close" }))
  }

  async onRequest(request: Party.Request) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 200, headers: corsHeaders });
    }

    const userIcons = await this.ensureLoadUserIcons();

    if (request.method === "GET") {
      return new Response(JSON.stringify(userIcons), { headers: corsHeaders });
    }

    if (request.method === "POST") {
      const user = (await request.json()) as User;
      const userIcon = userIcons.find((icon) => {
        return icon.user.id === user.id;
      })

      if (!userIcon) {
        this.room.broadcast(JSON.stringify({ type: "new", user }));
        this.userIcons!.push({ user: user, position: { x: 0, y: 0 }});
        await this.room.storage.put("userIcons", this.userIcons);
      }

      return new Response(JSON.stringify(user.id), { headers: corsHeaders });
    }

    if (request.method === "DELETE") {
      const userId = await request.json();

      this.room.broadcast(JSON.stringify({ type: "delete", userId }))
      this.userIcons = userIcons!.filter((icon) => {
        return icon.user.id !== userId;
      });
      await this.room.storage.put("userIcons", this.userIcons);

      return new Response(null, { status: 204, headers: corsHeaders });
    }

    return new Response("Not Found", { status: 404, headers: corsHeaders });
  }

  async onConnect(conn: Party.Connection, _ctx: Party.ConnectionContext) {
    const userIcons = await this.ensureLoadUserIcons();
    conn.send(JSON.stringify({ type: "sync", userIcons }));
  }

  async onMessage(messageString: string, _sender: Party.Connection) {
    const message = JSON.parse(messageString);

    if (message.type === "move") {
      const userIcon = { user: message.user, position: message.position }
      this.room.broadcast(JSON.stringify({ type: "move", ...userIcon }));
      this.userIcons = this.userIcons!.map((icon) =>
        icon.user.id === message.user.id ? userIcon : icon
      );
    }

    if (message.type === "edit") {
      this.room.broadcast(JSON.stringify({ type: "edit", user: message.user }));
      this.userIcons = this.userIcons!.map((icon) => {
        const userIcon = { user: message.user, position: icon.position }
        return icon.user.id === message.user.id ? userIcon : icon
      });
    }

    await this.room.storage.put("userIcons", this.userIcons);
  }
}

Server satisfies Party.Worker;
