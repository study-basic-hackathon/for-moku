import type * as Party from "partykit/server";

export const SINGLETON_ROOM_ID = "list";

export default class Connections implements Party.Server {
  connections?: Record<string, string>;
  constructor(readonly room: Party) {}

  removeUserFromRoom(userId: string) {
    const main = this.room.context.parties.main;
    main.get(this.connections[userId]).fetch({
      method: "DELETE",
      body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  async onRequest(request: Party.Request) {
    this.connections =
      this.connections ?? (await this.room.storage.get("connections")) ?? {};

    if (this.room.id !== SINGLETON_ROOM_ID) {
      return new Response("Not Found", { status: 404 });
    }

    if (request.method === "POST") {
      const { userId, roomId } = await request.json();;

      if (userId in this.connections) {
        if (this.connections[userId] !== roomId) {
          this.removeUserFromRoom(userId);
        }
      }
      this.connections[userId] = roomId;
      await this.room.storage.put("connections", this.connections);

      return new Response(JSON.stringify({ userId: roomId }));

      // save to storage
      // await this.room.storage.put("connections", this.connections);
    }

    if (request.method === "DELETE") {
      const userId = await request.json();

      this.removeUserFromRoom(userId);
      delete this.connections[userId];
      await this.room.storage.put("connections", this.connections);

      return new Response(null, { status: 204 });
    }

    return new Response("Not Found", { status: 404 });
  }
}
