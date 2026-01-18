# Cloudflare版PartyKitへの移行ガイド

## 背景

2025年10月以降、元の `partykit/partykit` リポジトリでデプロイが504エラーで失敗する問題が発生しています。
PartyKitチームは修正が難しいと表明しており、実質的にメンテナンスが停止している状態です。

**参考**: [GitHub Issue #971](https://github.com/partykit/partykit/issues/971)

Cloudflareが公式にフォークした **`cloudflare/partykit`** が新しく積極的にメンテナンスされているリポジトリとして推奨されています。

## 移行の理由

1. **元のPartyKitはデプロイ不可**: `api.partykit.io` が解決できず、マネージドプラットフォームへのデプロイが不可能
2. **積極的なメンテナンス**: Cloudflare版は活発に開発されている
3. **インフラの利点**: Cloudflare Workersの可視性、ログ、パフォーマンス最適化などの恩恵
4. **将来性**: Cloudflareのエコシステムとの統合

## 現在の構成

### パッケージバージョン
- **PartyKitサーバー**: `partykit@0.0.115` (partykit/package.json)
- **フロントエンド**: `partysocket@1.1.4` (front/package.json)

### 使用箇所
- `partykit/src/server.ts`: WebSocketサーバー実装
- `front/src/components/templates/room/ActiveEventTemplate.tsx`: `usePartySocket` フック
- `front/src/components/organisms/room/DraggableIcon.tsx`: `PartySocket` インスタンス
- `front/src/components/organisms/room/EditProfileDialog.tsx`: `PartySocket` インスタンス

### 主な機能
- イベント参加者のリアルタイム座席管理
- ユーザーアイコンの位置情報同期
- イベント終了時の自動クローズ (Alarm API使用)
- ストレージを使った状態永続化

## 前提条件

### Cloudflareアカウントの準備

Cloudflare Workersを使用するため、事前にCloudflareアカウントが必要です。

1. **Cloudflareアカウント作成**
   - [Cloudflare](https://dash.cloudflare.com/sign-up) にアクセス
   - メールアドレスとパスワードで無料アカウントを作成
   - メール認証を完了

2. **Workersプランの確認**
   - 無料プラン（Free）: 1日あたり100,000リクエスト
   - 有料プラン（Workers Paid）: $5/月〜、追加リクエスト可能
   - [料金プラン詳細](https://developers.cloudflare.com/workers/platform/pricing/)

3. **API Tokenの準備（任意）**
   - ダッシュボード → My Profile → API Tokens
   - デプロイ時に `wrangler login` で自動的に認証可能
   - CI/CDで使用する場合はAPI Tokenを発行

### 必要なツール

- **Node.js**: v18以上推奨
- **npm**: v9以上推奨
- **Wrangler CLI**: Cloudflare Workers用デプロイツール（自動インストールされる）

## 移行手順

### 1. Cloudflare版PartyKitのインストール

**重要**: Cloudflare版PartyKitは、元のPartyKitとは**パッケージ名が異なります**。

#### サーバー側 (partykit/)
```bash
cd partykit
npm uninstall partykit
npm install partyserver
```

#### フロントエンド側 (front/)
```bash
cd front
npm install partysocket  # バージョンは互換性があるため変更不要
```

### 2. サーバーコードの修正

`partykit/src/server.ts` のインポート文と基底クラスを変更:

**変更前:**
```typescript
import type * as Party from "partykit/server";
import Server from "partykit/server";

export default class ForMokuServer extends Server {
  // ...
}
```

**変更後:**
```typescript
import type * as Party from "partyserver";
import { Server } from "partyserver";

export default class ForMokuServer extends Server<Env> {
  // 型パラメータで環境変数の型を指定
  declare env: Env;   // DurableObjectのenv propertyを使用するための宣言
  declare ctx: DurableObjectState;  // storageアクセス用

  // ...
}
```

**重要な変更点**:
1. `partyserver`からの`Server`インポートは名前付きエクスポート（`{}`が必要）
2. `Server<Env>`で型パラメータを指定（環境変数の型安全性向上）
3. `this.ctx`（DurableObjectState）と`this.env`（環境変数）は`declare`で宣言が必要
   - これらはDurableObjectの親クラスが提供するプロパティだが、TypeScript型定義には含まれていない

### 3. Entry Point（index.ts）の作成

Cloudflare Workers/Wranglerでは、明示的なエントリーポイントファイルが必要です。

`partykit/src/index.ts` を新規作成:

```typescript
import { routePartykitRequest } from "partyserver";
import ForMokuServer from "./server";

// 環境変数とDurable Objectバインディングの型定義
type Env = {
  ForMokuServer: any;  // DurableObjectNamespace
  API_BASE_URL?: string;
};

// Durable Objectクラスをexport（バインディング用）
export { ForMokuServer };

// Cloudflare Workers fetch handler
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // PartyServerのルーティング処理
    // /parties/:party/:room 形式のURLを処理
    const response = await routePartykitRequest(request, env);
    
    if (response) {
      return response;
    }
    
    // ルーティングにマッチしなかった場合は404
    return new Response("Not Found", { status: 404 });
  },
};
```

**ポイント**:
- `routePartykitRequest`: PartyServerのURLルーティング処理
- `/parties/:party/:room` の`:party`はDurable Object binding名（kebab-case変換される）
- `ForMokuServer`バインディング → `/parties/for-moku-server/:room`

### 4. 設定ファイルの更新

### 4. 設定ファイルの更新

#### partykit/package.json
```json
{
  "scripts": {
    "dev": "wrangler dev src/index.ts --local --ip 0.0.0.0 --port 1999",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "partyserver": "^0.0.75",
    "date-fns-tz": "^3.2.0"
  },
  "devDependencies": {
    "wrangler": "^3.94.0"
  }
}
```

**注意**: 
- `partyserver` が最新バージョンです（2025年11月時点で v0.0.75）
- `dev`スクリプトは`wrangler dev`を使用（`partykit dev`ではない）
- エントリーポイントは`src/index.ts`

#### partykit/wrangler.toml を作成

Cloudflare Workers設定ファイル（**新規作成**）:

```toml
name = "for-moku-partykit"
main = "src/index.ts"
compatibility_date = "2025-11-01"
compatibility_flags = []

# Durable Objects設定
[[durable_objects.bindings]]
name = "ForMokuServer"           # バインディング名（URL: /parties/for-moku-server/...）
class_name = "ForMokuServer"     # src/server.tsでexportしているクラス名

# マイグレーション設定（初回デプロイ時）
[[migrations]]
tag = "v1"
new_classes = ["ForMokuServer"]

# 環境変数（オプション）
[vars]
# API_BASE_URL = "https://for-moku.vercel.app"  # 本番用
```

**重要なポイント**:
1. `main = "src/index.ts"` - エントリーポイントを指定
2. `name` - Durable Objectのバインディング名は**kebab-caseに変換**される
   - `ForMokuServer` → URLの`for-moku-server`
3. `class_name` - `src/server.ts`の`export default class ForMokuServer`と一致させる
4. `migrations` - 初回デプロイ時に新しいDurable Objectクラスを登録

#### partykit/partykit.json（削除可能）

**重要**: `wrangler.toml`を使用する場合、`partykit.json`は不要です。
Cloudflare Workers環境では`wrangler.toml`が優先されます。

削除しても問題ありませんが、残しておいても害はありません。

### 5. フロントエンドコードの確認・修正

フロントエンド側の `partysocket` ライブラリは互換性がありますが、**party名の指定**が必要です。

#### 重要: Party名の指定

PartyServerのルーティングは `/parties/:party/:room` 形式です。
`:party`はDurable Object binding名（kebab-case）と一致させる必要があります。

**修正が必要なファイル**:

1. **`front/src/components/templates/room/ActiveEventTemplate.tsx`**:
```typescript
const socket = usePartySocket({
  host: PARTYKIT_HOST,
  party: "for-moku-server",  // ← 追加: binding名をkebab-caseに変換
  room: roomId,
  id: userId,
  onMessage(event) { /* ... */ }
});
```

2. **`front/src/app/room/[roomId]/page.tsx`**:
```typescript
// 全てのfetch URLを修正
const url = `${PARTYKIT_URL}/parties/for-moku-server/${roomId}`;

// GET: イベント終了後の状態取得
const req = await fetch(`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`);

// POST: ユーザー追加
await fetch(`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`, {
  method: "POST",
  // ...
});

// DELETE: ユーザー削除
await fetch(`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`, {
  method: "DELETE",
  // ...
});
```

3. **`front/src/lib/auth/auth.ts`**:
```typescript
// ログアウト時のクリーンアップ
await fetch(`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`, {
  method: "DELETE",
  // ...
});
```

**接続先URL**:
- 開発: `http://localhost:1999/parties/for-moku-server/:room`
- 本番: `https://your-worker-name.your-subdomain.workers.dev/parties/for-moku-server/:room`

### 6. 環境変数の更新

`.env` または Vercelの環境変数設定で、PartyKitのホストを更新:

**ローカル開発** (`front/.env` または `.env.local`):
```env
NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999
```

**注意**: 
- プロトコル（`http://`）は不要
- `127.0.0.1`ではなく`localhost`を使用（Next.js SSRのIPv6問題を回避）
- 引用符不要

**本番環境** (Vercel):
```env
NEXT_PUBLIC_PARTYKIT_HOST=your-worker-name.your-subdomain.workers.dev
```

### 7. Docker環境の設定（このプロジェクトの場合）

このプロジェクトではDockerを使用してPartyKitを起動します。

#### Dockerfile
`partykit/Dockerfile`:
```dockerfile
FROM node:22-bookworm  # GLIBC 2.36対応

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
```

**重要**: `node:22-bookworm`を使用（Wrangler 3.x系はGLIBC 2.36が必要）

#### compose.yml
```yaml
services:
  partykit:
    build: ./partykit
    ports:
      - "1999:1999"
    container_name: partykit-local
    # 環境変数はwrangler.tomlで設定
```

#### 起動方法
```bash
docker compose up -d partykit
```

#### ログ確認
```bash
docker logs -f partykit-local
```

### 8. タイムゾーン処理の修正

**重要なバグ修正**: イベント終了時刻のアラーム設定で9時間のズレが発生する問題があります。

#### 問題のコード
```typescript
// ❌ 間違い: fromZonedTimeを使うと9時間早くアラームが発火
const endTime = new Date(message.endTime);
const alarm = fromZonedTime(endTime, 'Asia/Tokyo');
await this.ctx.storage.setAlarm(alarm);
```

#### 修正後のコード
`partykit/src/server.ts`:
```typescript
// ✅ 正しい: endTimeは既にUTC時刻なのでそのまま使用
const endTime = new Date(message.endTime);
await this.ctx.storage.setAlarm(endTime);
```

**理由**:
- フロントエンドのAPI (`/api/room/[roomId]`) が返す`endTime`は、`convertUTCToJST()`で変換されたDateオブジェクト
- JSONシリアライズ時に**UTCのISO8601文字列**になる（例: `"2025-11-17T11:00:00.000Z"`）
- `new Date(message.endTime)`で得られるDateオブジェクトは既に正しいUTC時刻
- `fromZonedTime()`を使うと9時間戻ってしまう

**import文も修正**:
```typescript
// date-fns-tzのimportは不要
import type * as Party from "partyserver";
import { Server } from "partyserver";
```

初回のみ、Cloudflareアカウントとの認証が必要です。

```bash
cd partykit
npx wrangler login
```

ブラウザが開き、Cloudflareダッシュボードでの認証を求められます。
認証が完了すると、ローカルに認証情報が保存されます。

**確認コマンド**:
```bash
npx wrangler whoami
```

### 9. Cloudflareアカウントへのログイン

初回のみ、Cloudflareアカウントとの認証が必要です。

```bash
cd partykit
npx wrangler login
```

ブラウザが開き、Cloudflareダッシュボードでの認証を求められます。
認証が完了すると、ローカルに認証情報が保存されます。

**確認コマンド**:
```bash
npx wrangler whoami
```

### 10. ローカル開発環境のテスト

デプロイ前に、ローカルでの動作確認を推奨します。

#### Docker環境の場合（推奨）:
```bash
docker compose up -d partykit
docker logs -f partykit-local

# 動作確認
curl http://localhost:1999/parties/for-moku-server/test-room
# 期待結果: [] (空の配列)
```

#### Wrangler直接実行の場合:
```bash
cd partykit
npm run dev
```

**フロントエンドの起動**:
```bash
cd front
npm run dev
```

**動作確認**:
1. ブラウザで `http://localhost:3000/room/[イベントID]` にアクセス
2. WebSocket接続が成功することを確認
3. 複数ブラウザでアクセスし、リアルタイム同期を確認

### 11. 本番環境へのデプロイ

#### 初回デプロイ
```bash
cd partykit
npm run deploy
# または
npx wrangler deploy
```

成功すると、以下のようなメッセージが表示されます:
```
Deployed for-moku-partykit
  https://for-moku-partykit.<your-subdomain>.workers.dev
```

#### デプロイURLの確認
```bash
npx wrangler deployments list
```

### 11. 本番環境へのデプロイ

#### 初回デプロイ
```bash
cd partykit
npx wrangler deploy
```

成功すると、以下のようなメッセージが表示されます:
```
Deployed for-moku-partykit
  https://for-moku-partykit.<your-subdomain>.workers.dev
```

#### デプロイURLの確認
```bash
npx wrangler deployments list
```

#### 環境変数の設定（本番）

**方法1: wrangler.toml に追記**
```toml
[vars]
API_BASE_URL = "https://for-moku.vercel.app"
```

再デプロイが必要:
```bash
npx wrangler deploy
```

**方法2: Cloudflare Dashboard**
1. Cloudflare Dashboard → Workers & Pages
2. `for-moku-partykit` を選択
3. Settings → Variables → Environment Variables
4. `API_BASE_URL` = `https://for-moku.vercel.app` を追加
5. Deploy

**推奨**: 機密情報以外は`wrangler.toml`で管理、機密情報のみDashboardで設定

### 12. フロントエンドの環境変数を更新

Vercelの環境変数に以下を設定:

1. Vercelダッシュボード → プロジェクト → Settings → Environment Variables
2. `NEXT_PUBLIC_PARTYKIT_HOST` を更新:
   ```
   for-moku-partykit.<your-subdomain>.workers.dev
   ```
3. **Production**, **Preview**, **Development** 全てに設定
4. Redeploy

**本番環境での動作確認**:
```bash
curl https://for-moku-partykit.<your-subdomain>.workers.dev/parties/for-moku-server/test
# 期待結果: []
```

## 主な変更点・注意事項

### 互換性
- **Party.Server インターフェース**: 完全互換
- **Party.Room API**: 完全互換
- **Alarm API**: 完全互換
- **Storage API**: 完全互換
- **WebSocket API**: 完全互換

### デプロイ先の変更
- **旧**: `*.partykit.dev` (マネージドプラットフォーム)
- **新**: `*.workers.dev` (Cloudflare Workers) またはカスタムドメイン

### Cloudflare固有の利点
1. **ダッシュボード**: Cloudflareダッシュボードでログ、メトリクス、トレースを確認可能
2. **カスタムドメイン**: 簡単にカスタムドメインを設定可能
3. **グローバルエッジネットワーク**: Cloudflareのグローバルネットワークでレイテンシ削減
4. **Durable Objects**: CloudflareのDurable Objects技術を直接利用

### 既知の制限
- Cloudflare Workersの制限に準拠:
  - CPU時間: 50ms (無料プラン) / 50ms (有料プラン、延長可能)
  - メモリ: 128MB
  - WebSocket接続数: アカウントプランに依存

## トラブルシューティング

### WebSocket接続エラー

#### `WebSocket connection to 'ws://localhost:1999/parties/main/...' failed`
**原因**: party名が間違っている。デフォルトの`main`ではなく`for-moku-server`を使用する必要がある。

**解決策**:
1. **usePartySocket に party パラメータを追加**:
```typescript
usePartySocket({
  host: PARTYKIT_HOST,
  party: "for-moku-server",  // ← 追加
  room: roomId,
  // ...
});
```

2. **全てのfetch URLを修正**:
```typescript
// ❌ 間違い
`${PARTYKIT_URL}/parties/main/${roomId}`

// ✅ 正しい
`${PARTYKIT_URL}/parties/for-moku-server/${roomId}`
```

#### `TypeError: Cannot read properties of undefined (reading 'idFromName')`
**原因**: 指定されたparty名に対応するDurable Object bindingが存在しない。

**解決策**:
1. `wrangler.toml` の binding名を確認:
```toml
[[durable_objects.bindings]]
name = "ForMokuServer"  # これがfor-moku-serverに変換される
```

2. Docker環境を再起動:
```bash
docker compose restart partykit
```

### Docker起動エラー

#### `Error: Cannot find module 'partyserver'`
**原因**: node_modulesがインストールされていない。

**解決策**:
```bash
cd partykit
npm install
docker compose up --build
```

#### `Error: The package "wrangler" wasn't found`
**原因**: devDependenciesがインストールされていない。

**解決策**:
```bash
cd partykit
npm install --include=dev
```

### タイムゾーン・アラーム関連

#### イベント終了時刻より9時間早くアラームが発火する
**原因**: `fromZonedTime()`の二重適用。

**解決策**: `partykit/src/server.ts` を修正:
```typescript
// ❌ 間違い
const endTime = new Date(message.endTime);
const alarm = fromZonedTime(endTime, 'Asia/Tokyo');
await this.ctx.storage.setAlarm(alarm);

// ✅ 正しい
const endTime = new Date(message.endTime);
await this.ctx.storage.setAlarm(endTime);  // fromZonedTime不要
```

`date-fns-tz`のimportも削除:
```typescript
// ❌ 削除
import { fromZonedTime } from 'date-fns-tz';
```

### デプロイエラー

#### `Error: No account_id found`
**原因**: Cloudflareアカウントにログインしていない

**解決策**: 
```bash
npx wrangler login
```

#### `Error: A request to the Cloudflare API failed`
**原因**: 
- ネットワーク接続の問題
- API Tokenの権限不足
- アカウントの制限

**解決策**:
1. インターネット接続を確認
2. `npx wrangler whoami` で認証状態を確認
3. 必要に応じて再ログイン: `npx wrangler logout` → `npx wrangler login`

#### `Error: You must enable Durable Objects on your account`
**原因**: CloudflareアカウントでDurable Objectsが有効化されていない

**解決策**:
1. Cloudflareダッシュボード → Workers & Pages
2. Durable Objectsタブを開く
3. 有料プラン（Workers Paid）へのアップグレードが必要な場合あり
4. 無料プランでも利用可能だが、制限あり

### 接続エラー（環境変数）

#### Next.jsでIPv6エラー: `ECONNREFUSED ::1`
**原因**: `127.0.0.1`をホストに指定すると、Next.js SSRがIPv6 (`::1`) として解釈する。

**解決策**: 
```env
# ❌ 間違い
NEXT_PUBLIC_PARTYKIT_HOST=127.0.0.1:1999

# ✅ 正しい
NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999
```

`front/src/app/env.ts` も修正:
```typescript
export const PROTOCOL = PARTYKIT_HOST.startsWith("127.0.0.1") || PARTYKIT_HOST.startsWith("localhost")
  ? "http"
  : "https";
```

### データベースクエリエラー

#### `TypeError: Cannot read properties of undefined (reading 'userIcons')`
**原因**: `finished_event_state`テーブルにレコードが存在しない場合のnullチェック不足。

**解決策**: `front/src/lib/db/finished_event_state.ts`:
```typescript
// ❌ 間違い
return res[0].userIcons as UserIcon[] ?? null;

// ✅ 正しい
return res[0]?.userIcons as UserIcon[] ?? null;
```

## 重要な注意点

### パッケージ名の違い

| 元のPartyKit | Cloudflare版 |
|-------------|------------|
| `partykit` (サーバー) | `partyserver` |
| `partysocket` (クライアント) | `partysocket` (同じ) |

**混同しないように注意**: 
- リポジトリ名: `cloudflare/partykit`
- サーバーパッケージ名: `partyserver` (NOT `partykit`)
- クライアントパッケージ名: `partysocket` (変更なし)

### インポート文の変更まとめ

```typescript
// 旧: partykit/partykit
import type * as Party from "partykit/server";

// 新: cloudflare/partykit
import type * as Party from "partyserver";
```

## 移行チェックリスト

### 準備
- [ ] Cloudflareアカウントを作成
- [ ] Node.js v18以上がインストールされているか確認
- [ ] Docker環境が起動可能か確認

### コード変更
- [ ] `partykit` パッケージをアンインストール
- [ ] `partyserver@0.0.75` をインストール
- [ ] `server.ts` のインポート文を `partyserver` に変更
- [ ] `Server<Env>` で型パラメータを追加
- [ ] `declare env: Env` と `declare ctx: DurableObjectState` を追加
- [ ] `src/index.ts` を新規作成（エントリーポイント）
- [ ] `wrangler.toml` を作成してDurable Objects設定を追加
- [ ] `package.json` の`dev`/`deploy`スクリプトを更新
- [ ] タイムゾーン処理を修正（`fromZonedTime()`削除）

### フロントエンド変更
- [ ] `usePartySocket` に `party: "for-moku-server"` を追加
- [ ] 全てのfetch URLを `/parties/for-moku-server/` に変更
- [ ] `.env` で `NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999` を設定
- [ ] `env.ts` のPROTOCOL判定に`localhost`チェックを追加
- [ ] Optional chaining追加（`res[0]?.userIcons`）

### Docker環境
- [ ] `Dockerfile` で `node:22-bookworm` を使用
- [ ] `compose.yml` でポート1999をマッピング
- [ ] Docker環境を再ビルド: `docker compose up --build`
- [ ] ログ確認: `docker logs -f partykit-local`

### ローカルテスト
- [ ] Docker起動: `docker compose up -d partykit`
- [ ] HTTP接続確認: `curl http://localhost:1999/parties/for-moku-server/test`
- [ ] フロントエンド起動: `cd front && npm run dev`
- [ ] ブラウザで `/room/[eventId]` にアクセス
- [ ] WebSocket接続成功を確認
- [ ] リアルタイム同期動作確認（座席移動など）

### デプロイ
- [ ] `npx wrangler login` でCloudflareアカウントにログイン
- [ ] `npx wrangler whoami` で認証確認
- [ ] 本番環境変数を設定（`wrangler.toml` または Dashboard）
- [ ] 本番環境へデプロイ: `npx wrangler deploy`
- [ ] デプロイされたURLを確認: `npx wrangler deployments list`

### フロントエンド本番設定
- [ ] Vercelの環境変数 `NEXT_PUBLIC_PARTYKIT_HOST` を更新
- [ ] Vercelで再デプロイ
- [ ] 本番環境で動作確認

### 最終テスト
- [ ] 本番環境でイベント作成
- [ ] WebSocket接続確認
- [ ] 複数ユーザーでリアルタイム同期確認
- [ ] イベント終了時のAlarm動作確認
- [ ] Cloudflareダッシュボードでログ・メトリクス確認

## よくある質問 (FAQ)

### Q1: Cloudflareアカウントは有料プランが必要ですか？
A: 無料プランでも利用可能です。ただし、Durable Objectsには以下の制限があります：
- 無料プラン: 1日あたり100,000リクエスト、最大30のDurable Objectsインスタンス
- 詳細: [Cloudflare Workers 料金](https://developers.cloudflare.com/workers/platform/pricing/)

### Q2: カスタムドメインを使用できますか？
A: はい、可能です。Cloudflareダッシュボードから設定できます。
1. Workers & Pages → 該当のWorker → Settings → Domains & Routes
2. Custom Domainを追加

### Q3: 既存のデータは移行されますか？
A: いいえ、自動的には移行されません。元のPartyKitのストレージデータは別環境です。
必要に応じて、元のPartyKitからデータをエクスポートし、新しい環境で初期化が必要です。

### Q4: 開発環境とステージング環境を分けられますか？
A: はい、`wrangler.toml` で複数環境を設定可能です：
```toml
[env.production]
name = "for-moku-partykit"

[env.staging]
name = "for-moku-partykit-staging"
```

デプロイ時に環境を指定:
```bash
npx wrangler deploy --env staging
```

### Q5: ログはどこで確認できますか？
A: Cloudflareダッシュボードで確認できます：
1. Workers & Pages → 該当のWorker → Logs
2. リアルタイムログストリームまたは過去のログを参照可能

## 参考リンク

### 公式ドキュメント
- [Cloudflare PartyKit GitHub](https://github.com/cloudflare/partykit)
- [PartyServer パッケージ README](https://github.com/cloudflare/partykit/tree/main/packages/partyserver)
- [PartySocket パッケージ README](https://github.com/cloudflare/partykit/tree/main/packages/partysocket)
- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [Cloudflare Durable Objects](https://developers.cloudflare.com/durable-objects/)
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)

### サンプル・チュートリアル
- [PartyServer Fixtures (Examples)](https://github.com/cloudflare/partykit/tree/main/fixtures)
- [Cloudflare Workers Examples](https://developers.cloudflare.com/workers/examples/)

### 関連情報
- [元のPartyKitの問題 (Issue #971)](https://github.com/partykit/partykit/issues/971)
- [Cloudflare Workers 料金プラン](https://developers.cloudflare.com/workers/platform/pricing/)

## まとめ

Cloudflare版PartyKitへの移行は、コード変更が最小限で済み、インフラの信頼性とパフォーマンスが向上します。
元のPartyKitがメンテナンス停止状態である以上、早期の移行を強く推奨します。

移行作業は基本的にインポート文の変更とデプロイ先の切り替えのみで、既存のコードロジックはほぼそのまま使用できます。
