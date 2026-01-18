import { routePartykitRequest } from "partyserver";
import ForMokuServer from "./server";
import type { DurableObjectNamespace } from "@cloudflare/workers-types";

// Env型: Durable Objectバインディングと環境変数を定義
type Env = {
  ForMokuServer: DurableObjectNamespace; // DurableObjectNamespace type (対応するURLパス: /parties/for-moku-server/...)
  API_BASE_URL?: string;
};

// Export the Durable Object class for binding
export { ForMokuServer };

// Default export: Cloudflare Workers fetch handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Route requests to PartyServer
    // routePartykitRequest は /parties/:party/:room 形式のURLを処理
    const response = await routePartykitRequest(request, env);
    
    // If routePartykitRequest handled it, return the response
    if (response) {
      return response;
    }
    
    // Otherwise return 404
    return new Response("Not Found", { status: 404 });
  },
};
