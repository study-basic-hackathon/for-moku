import type * as Party from "partyserver";
import { Server } from "partyserver";

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

type Env = {
  API_BASE_URL?: string;
}

export default class ForMokuServer extends Server<Env> {
  userIcons?: UserIcon[];
  
  // DurableObject has ctx and env properties but TypeScript doesn't expose them
  // @ts-expect-error - DurableObjectState type not available in partyserver
  declare ctx: DurableObjectState;
  // Env is passed to constructor and stored by parent DurableObject class
  declare env: Env;

  async ensureLoadUserIcons() {
    if (!this.userIcons) {
      // Server extends DurableObject, so we use this.ctx.storage
      this.userIcons = (await this.ctx.storage.get<UserIcon[]>("userIcons")) ?? [];
    }
    return this.userIcons;
  }

  getApiBaseUrl(): string {
    // Docker環境では環境変数 API_BASE_URL を設定可能
    // wrangler.toml の [vars] セクションで定義できる
    // 例: API_BASE_URL = "https://for-moku-deploy-test.vercel.app"
    
    // 本番環境（Cloudflare Workers）: wrangler.toml の vars または Cloudflare Dashboard で設定
    // DurableObject のコンストラクタで env が渡され、親クラスに保存されている
    if (this.env?.API_BASE_URL) {
      return this.env.API_BASE_URL;
    }
    
    // ローカル開発（Docker）: host.docker.internal でホストマシンの localhost にアクセス
    // フロントエンドが localhost:3000 で動作している前提
    return 'http://host.docker.internal:3000';
  }

  async onStart() { 
    // remember room id
    await this.ctx.storage.put<string>("roomId", this.name);

    const baseUrl = this.getApiBaseUrl();
    try {
      const response = await fetch(`${baseUrl}/api/room/${this.name}`);
      if (!response.ok) {
        console.error(`[onStart] API error: ${response.status}`);
        return;
      }
      const { message } = await response.json();
      const endTime = new Date(message.endTime);

      if (endTime.getTime() > Date.now()) {
        // endTimeは既にUTCのISO8601文字列なので、fromZonedTimeは不要
        await this.ctx.storage.setAlarm(endTime);
        console.log(`[onStart] Room ${this.name}: Alarm set for ${endTime.toISOString()}`);
      }
    } catch (error) {
      console.error(`[onStart] Error fetching room metadata:`, error);
    }
  }

  async onAlarm() {
    console.log(`[onAlarm] Starting alarm handler at ${new Date().toISOString()}`);
    const roomId = await this.ctx.storage.get<string>("roomId");
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
      } else {
        console.log(`[onAlarm] Room ${roomId}: Event state saved (${userIcons?.length ?? 0} users)`);
      }
    } catch (error) {
      console.error(`[onAlarm] Error saving event state:`, error);
    }

    // broadcast close to connected clients
    try {
      this.broadcast(JSON.stringify({ type: "close" }));
    } catch (e) {
      console.error("[onAlarm] Failed to broadcast close:", e);
    }
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
