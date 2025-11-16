# Deployする手順

## PartyKit編（Cloudflare Workers）

このプロジェクトでは、Cloudflare版PartyKit（`partyserver`パッケージ）を使用しています。
Cloudflare Workersへのデプロイには**Wrangler CLI**を使用します。

### 前提条件

- Cloudflareアカウントが作成済みであること
- `npx wrangler login` で認証済みであること

### 1. 環境変数の設定

**方法1: wrangler.toml で設定（推奨）**

`partykit/wrangler.toml` のコメントアウトを解除:

```toml
# 環境変数
[vars]
API_BASE_URL = "https://for-moku.vercel.app"  # 本番のVercel URLに変更
```

**方法2: Cloudflare Dashboard で設定**

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) にログイン
2. Workers & Pages → `for-moku-partykit` を選択
3. Settings → Variables → Environment Variables
4. **Add variable** をクリック
5. Variable name: `API_BASE_URL`
6. Value: `https://for-moku.vercel.app`
7. **Save** をクリック

### 2. デプロイ

PartyKitのディレクトリで以下のコマンドを実行:
```bash
cd partykit
npx wrangler deploy
```

初めてデプロイする場合:
1. Cloudflareアカウントでのログインが求められる: `npx wrangler login`
2. ブラウザで認証を完了
3. 再度 `npx wrangler deploy` を実行

### 3. デプロイ先URL

デプロイしたサーバーのURLは以下のフォーマットに従う:
```
https://for-moku-partykit.<your-subdomain>.workers.dev
```

デプロイ成功時にターミナルに表示されます。

### 4. 動作確認

デプロイされたURLをテスト:
```bash
curl https://for-moku-partykit.<your-subdomain>.workers.dev/parties/for-moku-server/test
# 期待結果: []
```

### 便利なコマンド

- **デプロイ済み環境の確認**: `npx wrangler deployments list`
- **ログのリアルタイム確認**: `npx wrangler tail`
- **認証状態の確認**: `npx wrangler whoami`
- **ログアウト**: `npx wrangler logout`

参考: 
- [Wrangler CLI ドキュメント](https://developers.cloudflare.com/workers/wrangler/)
- [Cloudflare Workers 環境変数](https://developers.cloudflare.com/workers/configuration/environment-variables/)
- [移行ガイド](../websocket/cloudflare-partykit-migration.md)

## Google OAuth2編
- [Google Cloud Console](https://console.cloud.google.com/)で新たなプロジェクトを作成
- APIとサービス > OAuth同意画面の設定を行う（User Typeは外部を選択）
- 認証情報 > 承認済みのリダイレクト URIにAPIのコールバックを受け取るURLを追加\
(例: https://for-moku-deploy-test.vercel.app/api/auth/callback/google)

## DB編（Neon）

まずは[Vercel Marketplace](https://vercel.com/01063s-projects/~/integrations/marketplace)からNeonのプロジェクトを作成する

frontのディレクトリで以下のコマンドを実行する
```
npx drizzle-kit generate
npx drizzle-kit migrate
```
以上です

## Vercel編

デプロイするとおそらくeslintがいろんなエラー（主にunused var）を出しますが、\
next.config.tsに`eslint: { ignoreDuringBuilds: true }`を追加することで無視できる

### 環境変数

- **AUTH_SECRET** → `openssl rand -base64 33`で生成できる
- **AUTH_GOOGLE_ID** → Google OAuthのクライアント ID
- **AUTH_GOOGLE_SECRET** → Google OAuthのクライアントシークレット
- **NEXT_PUBLIC_PARTYKIT_HOST** → デプロイしたCloudflare WorkersのURL（例: `for-moku-partykit.<your-subdomain>.workers.dev`）
  - ⚠️ **重要**: プロトコル（`https://`）は不要、ホスト名のみ指定
- **DATABASE_URL** → NeonデータベースのURL

### NEXT_PUBLIC_PARTYKIT_HOST の設定手順

1. PartyKitを `npx wrangler deploy` でデプロイ
2. デプロイ成功時に表示されるURL（`https://for-moku-partykit.XXX.workers.dev`）をコピー
3. Vercel Dashboard → Settings → Environment Variables
4. `NEXT_PUBLIC_PARTYKIT_HOST` に **`for-moku-partykit.XXX.workers.dev`** を設定
   - ⚠️ `https://` を含めない
5. **Production**, **Preview**, **Development** 全ての環境に設定
6. Redeploy

環境変数は編集しても、再デプロイするまで反映されないので注意！

## Gyazo編
Gyazoにログインして、[このページ](https://gyazo.com/oauth/applications)からNew Applicationを作る\
そうすると、アクセストークンが発行できるようになる。

Vercelのプロジェクトに以下の環境変数を追加する
- GYAZO_ACCESS_TOKEN -> その名の通り
- GYAZO_UPLOAD_END_POINT -> https://upload.gyazo.com/api/upload
- GYAZO_DELETE_END_POINT -> https://api.gyazo.com/api/images
- NEXT_PUBLIC_BASE_URL -> デプロイされたサイトのURL
