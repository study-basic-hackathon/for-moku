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

`partykit/src/server.ts` のインポート文を変更:

**変更前:**
```typescript
import type * as Party from "partykit/server";
```

**変更後:**
```typescript
import type * as Party from "partyserver";
```

その他のコードは基本的に互換性があるため変更不要。

### 3. 設定ファイルの更新

#### partykit/package.json
```json
{
  "scripts": {
    "dev": "partykit dev",
    "deploy": "partykit deploy"
  },
  "dependencies": {
    "partyserver": "^0.0.75",
    "date-fns-tz": "^3.2.0"
  }
}
```

**注意**: `partyserver` が最新バージョンです（2025年11月時点で v0.0.75）。

#### partykit/partykit.json
基本的に変更不要。ただし、Cloudflare Workers固有の設定が追加可能:

```json
{
  "$schema": "https://partykit.io/schema.json",
  "name": "for-moku",
  "main": "src/server.ts",
  "compatibilityDate": "2025-06-02",
  "compatibility_flags": []
}
```

### 4. Wrangler設定 (オプション)

Cloudflare Workersへのデプロイには `wrangler.toml` が必要になる場合があります。

`partykit/wrangler.toml` を作成:

```toml
name = "for-moku-partykit"
main = "src/server.ts"
compatibility_date = "2025-06-02"

[durable_objects]
bindings = [
  { name = "parties", class_name = "Server" }
]
```

### 5. フロントエンドコードの確認

フロントエンド側の `partysocket` ライブラリは互換性があるため、基本的に変更不要です。

ただし、接続先URLがCloudflare Workersのエンドポイントに変わる可能性があります。

**現在の接続例** (`ActiveEventTemplate.tsx`):
```typescript
const socket = usePartySocket({
  host: process.env.NEXT_PUBLIC_PARTYKIT_HOST,
  room: event.id,
  // ...
});
```

**Cloudflare版の接続先**:
- 開発: `localhost:1999` (デフォルト)
- 本番: `your-worker-name.your-subdomain.workers.dev` または カスタムドメイン

### 6. 環境変数の更新

`.env` または Vercelの環境変数設定で、PartyKitのホストを更新:

```env
NEXT_PUBLIC_PARTYKIT_HOST=your-worker-name.your-subdomain.workers.dev
```

### 7. Cloudflareアカウントへのログイン

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

### 8. Durable Objectsの設定

Cloudflare WorkersでDurable Objectsを使用するには、`wrangler.toml` で明示的に設定が必要です。

`partykit/wrangler.toml` を作成（または更新）:

```toml
name = "for-moku-partykit"
main = "src/server.ts"
compatibility_date = "2025-11-01"
compatibility_flags = []

# Durable Objects設定
[[durable_objects.bindings]]
name = "Server"           # バインディング名
class_name = "Server"     # server.tsでexportしているクラス名

# マイグレーション設定（初回デプロイ時）
[[migrations]]
tag = "v1"
new_classes = ["Server"]
```

**重要**: クラス名は `server.ts` で `export default class Server` としてエクスポートしているクラス名と一致させる必要があります。

### 9. ローカル開発環境のテスト

デプロイ前に、ローカルでの動作確認を推奨します。

```bash
cd partykit
npm run dev
# または
npx wrangler dev
```

- デフォルトでは `http://localhost:1999` で起動
- フロントエンドの環境変数を `NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999` に設定
- フロントエンドを起動して接続テスト

### 10. 本番環境へのデプロイ

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

### 11. フロントエンドの環境変数を更新

Vercelまたは `.env` ファイルで、PartyKitのホストを更新:

**開発環境** (`.env.local`):
```env
NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999
```

**本番環境** (Vercel):
```env
NEXT_PUBLIC_PARTYKIT_HOST=for-moku-partykit.<your-subdomain>.workers.dev
```

Vercelの環境変数設定:
1. Vercelダッシュボード → プロジェクト → Settings → Environment Variables
2. `NEXT_PUBLIC_PARTYKIT_HOST` を更新
3. Redeploy

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

### 接続エラー
```
WebSocket connection failed
```
**解決策**:
1. 環境変数 `NEXT_PUBLIC_PARTYKIT_HOST` が正しく設定されているか確認
2. Cloudflare Workersがデプロイされているか確認: `npx wrangler deployments list`
3. CORSポリシーを確認 (必要に応じて `onRequest` で設定)

### ローカル開発で接続できない
**解決策**:
- `partykit dev` が起動しているか確認
- ポート1999が開いているか確認
- `NEXT_PUBLIC_PARTYKIT_HOST=localhost:1999` (プロトコルなし) を設定

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

### コード変更
- [ ] `partykit` パッケージをアンインストール
- [ ] `partyserver` をインストール（`@cloudflare/partykit-server`ではない！）
- [ ] `server.ts` のインポート文を `partykit/server` から `partyserver` に変更
- [ ] `package.json` のdependenciesを更新
- [ ] `wrangler.toml` を作成してDurable Objects設定を追加

### デプロイ
- [ ] `npx wrangler login` でCloudflareアカウントにログイン
- [ ] `npx wrangler whoami` で認証確認
- [ ] ローカル開発環境で動作確認 (`npm run dev`)
- [ ] 本番環境へデプロイ (`npm run deploy`)
- [ ] デプロイされたURLを確認

### フロントエンド設定
- [ ] 開発環境の `.env.local` を更新 (`localhost:1999`)
- [ ] Vercelの本番環境変数を更新 (`NEXT_PUBLIC_PARTYKIT_HOST`)
- [ ] Vercelで再デプロイ

### テスト
- [ ] フロントエンドから接続テスト
- [ ] リアルタイム機能の動作確認（座席移動、ユーザー追加/削除）
- [ ] イベント終了時のAlarm動作確認
- [ ] Cloudflareダッシュボードでログ確認

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
