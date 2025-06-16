# Deployする手順

## PartyKit編

手順：PartyKitのディレクトリで`npx partykit deploy`を実行するだけ

初めてデプロイしているのであればGitHubでのログインが求められる。\
デプロイしたサーバーのURLは以下のフォーマットに従う\
[プロジェクトの名前].[GitHubのユーザ名].partykit.dev\
&nbsp;^ partykit.jsonで設定できる

`npx partykit list`でデプロイされているプロジェクトの一覧が確認できる\
[PartyKit CLIのコマンド一覧](https://docs.partykit.io/reference/partykit-cli/)

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
この時、NODE_ENVはproductionでないとならないので注意。

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
まだです
