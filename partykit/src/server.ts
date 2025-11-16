import type * as Party from "partyserver";
import { Server } from "partyserver";

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

export default class ForMokuServer extends Server<unknown> {
  userIcons?: UserIcon[];
  
  // @ts-expect-error - DurableObject has ctx but TypeScript doesn't recognize it  
  declare ctx: DurableObjectState;

  async ensureLoadUserIcons() {
    if (!this.userIcons) {
      // Server extends DurableObject, so we use this.ctx.storage
      this.userIcons = (await this.ctx.storage.get<UserIcon[]>("userIcons")) ?? [];
    }
    return this.userIcons;
  }

  async onStart() { 
    await this.ctx.storage.put<string>("roomId", this.name);

    const response = await fetch(`${BASE_URL}${this.name}`);
    const { message } = await response.json();
    const endTime = new Date(message.endTime);

    if (endTime.getTime() > Date.now()) {
      const alarm = fromZonedTime(endTime, 'Asia/Tokyo');
      await this.ctx.storage.setAlarm(alarm);
    }
  }

  async onAlarm() {
    const roomId = await this.ctx.storage.get<string>("roomId");
    const userIcons = await this.ensureLoadUserIcons();

    await fetch(`${BASE_URL}${roomId}`, {
      method: "POST",
      body: JSON.stringify(userIcons),
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.broadcast(JSON.stringify({ type: "close" }))
  }

  async onRequest(request: Request) {
    const userIcons = await this.ensureLoadUserIcons();

    if (request.method === "GET") {
      return new Response(JSON.stringify(userIcons));
    }

    if (request.method === "POST") {
      const user = (await request.json()) as User;
      const userIcon = userIcons?.find((icon) => {
        return icon.user.id === user.id;
      })

      if (!userIcon) {
        this.broadcast(JSON.stringify({ type: "new", user }));
        this.userIcons!.push({ user: user, position: { x: 0, y: 0 }});
        await this.ctx.storage.put("userIcons", this.userIcons);
      }

      return new Response(JSON.stringify(user.id));
    }

    if (request.method === "DELETE") {
      const userId = await request.json();

      this.broadcast(JSON.stringify({ type: "delete", userId }))
      this.userIcons = userIcons!.filter((icon) => {
        return icon.user.id !== userId;
      });
      await this.ctx.storage.put("userIcons", this.userIcons);

      return new Response(null, { status: 204 });
    }

    return new Response("Not Found", { status: 404 });
  }

  async onConnect(conn: Party.Connection, _ctx: Party.ConnectionContext) {
    const userIcons = await this.ensureLoadUserIcons();
    conn.send(JSON.stringify({ type: "sync", userIcons }));
  }

  async onMessage(connection: Party.Connection, messageString: Party.WSMessage) {
    if (typeof messageString !== "string") {
      console.warn("Received non-string message");
      return;
    }
    
    const message = JSON.parse(messageString);

    if (message.type === "move") {
      const userIcon = { user: message.user, position: message.position }
      this.broadcast(JSON.stringify({ type: "move", ...userIcon }));
      this.userIcons = this.userIcons!.map((icon) =>
        icon.user.id === message.user.id ? userIcon : icon
      );
    }

    if (message.type === "edit") {
      this.broadcast(JSON.stringify({ type: "edit", user: message.user }));
      this.userIcons = this.userIcons!.map((icon) => {
        const userIcon = { user: message.user, position: icon.position }
        return icon.user.id === message.user.id ? userIcon : icon
      });
    }

    await this.ctx.storage.put("userIcons", this.userIcons);
  }
}
