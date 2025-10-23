import type * as Party from "partykit/server";

import { toZonedTime, fromZonedTime } from 'date-fns-tz';

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

  getApiBaseUrl(): string {
    const baseUrl = this.room.env.API_BASE_URL as string | undefined;
    // ローカル開発時はデフォルトでhost.docker.internalを使用
    return baseUrl || 'http://host.docker.internal:3000';
  }

  async onStart() { 
    await this.room.storage.put<string>("roomId", this.room.id);

    const baseUrl = this.getApiBaseUrl();
    
    try {
      const response = await fetch(`${baseUrl}/api/room/${this.room.id}`);
      
      if (!response.ok) {
        console.error(`[onStart] API error: ${response.status}`);
        return;
      }
      
      const { message } = await response.json();
      const endTime = new Date(message.endTime);

      if (endTime.getTime() > Date.now()) {
        await this.room.storage.setAlarm(endTime.getTime());
        console.log(`[onStart] Room ${this.room.id}: Alarm set for ${endTime.toISOString()}`);
      }
    } catch (error) {
      console.error(`[onStart] Error:`, error);
    }
  }

  async onAlarm() {
    console.log(`[onAlarm] Starting alarm handler at ${new Date().toISOString()}`);
    const roomId = await this.room.storage.get<string>("roomId");
    const userIcons = await this.ensureLoadUserIcons();
    const baseUrl = this.getApiBaseUrl();
    
    try {
      const response = await fetch(`${baseUrl}/api/room/${roomId}`, {
        method: "POST",
        body: JSON.stringify(userIcons),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (!response.ok) {
        console.error(`[onAlarm] Failed to save state: ${response.status}`);
        return;
      }
      
      console.log(`[onAlarm] Room ${roomId}: Event state saved (${userIcons.length} users)`);
    } catch (error) {
      console.error(`[onAlarm] Error:`, error);
    }

    this.room.broadcast(JSON.stringify({ type: "close" }));
  }

  async onRequest(request: Party.Request) {
    const userIcons = await this.ensureLoadUserIcons();

    if (request.method === "GET") {
      return new Response(JSON.stringify(userIcons));
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

      return new Response(JSON.stringify(user.id));
    }

    if (request.method === "DELETE") {
      const userId = await request.json();

      this.room.broadcast(JSON.stringify({ type: "delete", userId }))
      this.userIcons = userIcons!.filter((icon) => {
        return icon.user.id !== userId;
      });
      await this.room.storage.put("userIcons", this.userIcons);

      return new Response(null, { status: 204 });
    }

    return new Response("Not Found", { status: 404 });
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
