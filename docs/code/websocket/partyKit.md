# PartyKit

WebSocketによるリアルタイム通信に使用しています。

https://docs.partykit.io/

## ローカル開発

### 環境変数の設定

`partykit/.env` ファイルで環境変数を管理:
```bash
# partykit/.env
API_BASE_URL=http://host.docker.internal:3000
```

PartyKitは自動的に `.env` ファイルを読み込むため、追加の設定は不要です。

Docker Composeでコンテナから起動する場合、`host.docker.internal` を使用することで、ホストマシンで動作しているNext.js（ポート3000）にアクセスできます。

### 起動方法

```bash
docker compose up -d partykit
```

### ログ確認

```bash
docker logs -f partykit-local
```

## 本番環境

デプロイ手順については [Vercelでデプロイする手順.md](../deploy/Vercelでデプロイする手順.md) を参照してください。

## 参考リンク

- [PartyKit CLIのコマンド一覧](https://docs.partykit.io/reference/partykit-cli/)
- [環境変数の管理方法](https://docs.partykit.io/guides/managing-environment-variables/)