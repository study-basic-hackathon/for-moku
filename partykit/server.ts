import type * as Party from "partykit/server";

type User = { name: string, email: string, image: string }

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

  async onRequest(request: Party.Request) {
    const userIcons = await this.ensureLoadUserIcons();

    if (request.method === "POST") {
      const user = (await request.json()) as User;

      if (!userIcons.some(e => e.user.email === user.email)) {
        this.room.broadcast(JSON.stringify({ type: "new", user }));
        this.userIcons!.push({ user: user, position: { x: 0, y: 0 }});
      }
      return new Response("OK");
    }

    return new Response("Not found", { status: 404 });
  }

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    const userIcons = await this.ensureLoadUserIcons();

    const message = {
      type: "sync",
      userIcons,
    }
    conn.send(JSON.stringify(message));
  }

  onMessage(messageString: string, sender: Party.Connection) {
    const message = JSON.parse(messageString);

    if (message.type === "move") {
      const userIcon = { user: message.user, position: message.position }
      this.room.broadcast(JSON.stringify({ type: "move", ...userIcon }), [sender.id]);
      this.userIcons = this.userIcons!.map((icon) =>
        icon.user.email === message.user.email ? userIcon : icon
      );
    }
  }
}

Server satisfies Party.Worker;
