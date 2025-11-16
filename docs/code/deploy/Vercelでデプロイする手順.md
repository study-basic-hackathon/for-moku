# Deployする手順

## PartyKit編

### 1. 環境変数の設定

PartyKitに環境変数を設定（初回のみ）:
```bash
cd partykit
npx partykit env add API_BASE_URL
```

プロンプトが表示されたら `https://for-moku.vercel.app` を入力してEnterキーを押す。

※ `npx partykit env add`は`partykit.json`があるディレクトリで実行する必要があります。

### 2. デプロイ

PartyKitのディレクトリで以下のコマンドを実行:
```bash
npx partykit deploy
```

初めてデプロイする場合はGitHubでのログインが求められる。

### 3. デプロイ先URL

デプロイしたサーバーのURLは以下のフォーマットに従う:
```
[プロジェクトの名前].[GitHubのユーザ名].partykit.dev
```
※ プロジェクト名は `partykit.json` で設定できる

### 便利なコマンド

- デプロイ済みプロジェクト一覧: `npx partykit list`
- 環境変数確認: `npx partykit env list`
- 環境変数削除: `npx partykit env remove API_BASE_URL`
- 環境変数の再設定: `npx partykit env add API_BASE_URL` (既存の値を上書き)

参考: [PartyKit CLIのコマンド一覧](https://docs.partykit.io/reference/partykit-cli/)、[環境変数の管理方法](https://docs.partykit.io/guides/managing-environment-variables/)

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

環境変数
- AUTH_SECRET -> `openssl rand -base64 33`で生成できる
- AUTH_GOOGLE_ID -> Google OAuthのクライアント ID
- AUTH_GOOGLE_SECRET -> Google OAuthのクライントシークレット
- NEXT_PUBLIC_PARTYKIT_HOST -> デプロイしたPartyKitサーバーのURL
- DATABASE_URL -> その名の通り

環境変数は編集しても、再デプロイするまで反映されないので注意！

## Gyazo編
Gyazoにログインして、[このページ](https://gyazo.com/oauth/applications)からNew Applicationを作る\
そうすると、アクセストークンが発行できるようになる。

Vercelのプロジェクトに以下の環境変数を追加する
- GYAZO_ACCESS_TOKEN -> その名の通り
- GYAZO_UPLOAD_END_POINT -> https://upload.gyazo.com/api/upload
- GYAZO_DELETE_END_POINT -> https://api.gyazo.com/api/images
- NEXT_PUBLIC_BASE_URL -> デプロイされたサイトのURL
