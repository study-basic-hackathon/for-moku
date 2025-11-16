# PartyKit (Cloudflare版)

WebSocketによるリアルタイム通信に使用しています。

**重要**: このプロジェクトでは、Cloudflareが公式にメンテナンスしている **PartyServer** (`partyserver` パッケージ) を使用しています。元の `partykit/partykit` は2025年10月以降デプロイ不可となっているため、移行済みです。

- **公式ドキュメント**: https://docs.partykit.io/
- **移行ガイド**: [cloudflare-partykit-migration.md](./cloudflare-partykit-migration.md)

## パッケージ情報

- **サーバー**: `partyserver@0.0.75`
- **フロントエンド**: `partysocket@1.1.4`
- **デプロイツール**: Wrangler (Cloudflare Workers CLI)

## アーキテクチャ

```
/parties/:party/:room
         ^^^^^^  ^^^^
         |       └─ ルームID (イベントID)
         └─ Durable Object binding名 (kebab-case変換)

例: /parties/for-moku-server/26
    → ForMokuServer Durable Objectのルーム26
```

**Durable Object**: Cloudflareのステートフルサーバーレス機能。各ルーム（イベント）ごとに独立したインスタンスが起動します。

## ローカル開発

### 環境変数

ローカル開発時は環境変数の設定は不要です。

`API_BASE_URL`が未設定の場合、自動的に`http://host.docker.internal:3000`（Docker Composeから起動した場合にホストマシンのNext.jsにアクセスするURL）を使用します。

**設定方法** (`partykit/wrangler.toml`):
```toml
[vars]
API_BASE_URL = "http://host.docker.internal:3000"
```

### 起動方法

Docker Composeで起動（推奨）:
```bash
docker compose up -d partykit
```

または、ローカルでWranglerを直接実行:
```bash
cd partykit
npm run dev
```

### ログ確認

Docker起動の場合:
```bash
docker logs -f partykit-local
```

Wrangler直接実行の場合:
```bash
# ログはコンソールに表示されます
```

### 動作確認

HTTPエンドポイントのテスト:
```bash
curl http://localhost:1999/parties/for-moku-server/test-room
# 期待結果: [] (空の配列)
```

WebSocket接続は、フロントエンドから `/room/[roomId]` ページにアクセスして確認してください。

## 本番環境

### デプロイ

Cloudflare Workersへのデプロイ（Wrangler使用）:
```bash
cd partykit
npx wrangler login    # 初回のみ
npx wrangler deploy
```

**デプロイ先URL**: `for-moku-partykit.your-subdomain.workers.dev`

詳細なデプロイ手順については [Vercelでデプロイする手順.md](../deploy/Vercelでデプロイする手順.md) を参照してください。

### 環境変数の設定

本番環境では、Cloudflare Dashboardまたはwrangler.tomlで環境変数を設定します。

**wrangler.toml** (推奨):
```toml
[vars]
API_BASE_URL = "https://for-moku.vercel.app"
```

**Cloudflare Dashboard**:
1. Workers & Pages → for-moku-partykit → Settings → Variables
2. `API_BASE_URL` = `https://for-moku.vercel.app` を追加

### フロントエンドの環境変数

Vercelの環境変数に以下を設定:
```env
NEXT_PUBLIC_PARTYKIT_HOST=for-moku-partykit.your-subdomain.workers.dev
```

## トラブルシューティング

### WebSocket接続エラー

**症状**: `WebSocket connection to 'ws://localhost:1999/parties/main/...' failed`

**原因**: party名が間違っている。`for-moku-server`を使用する必要があります。

**解決策**:
- フロントエンド: `usePartySocket({ party: "for-moku-server", ... })`
- URL: `/parties/for-moku-server/${roomId}`

### Docker起動エラー

**症状**: `Error: Cannot find module 'partyserver'`

**原因**: node_modulesがインストールされていない。

**解決策**:
```bash
cd partykit
npm install
docker compose up --build
```

### アラームが早く発火する

**症状**: イベント終了時刻より9時間早くアラームが発火する。

**原因**: タイムゾーン変換の二重適用。

**解決策**: `server.ts`で`fromZonedTime()`を削除し、`new Date(message.endTime)`をそのまま使用。

## 参考リンク

- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Durable Objects ガイド](https://developers.cloudflare.com/durable-objects/)
- [Wrangler CLI リファレンス](https://developers.cloudflare.com/workers/wrangler/)
- [PartyKit公式ドキュメント](https://docs.partykit.io/)