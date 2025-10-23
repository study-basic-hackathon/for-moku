# PartyKit

WebSocketによるリアルタイム通信に使用しています。

https://docs.partykit.io/

## ローカル開発

### 環境変数

ローカル開発時は環境変数の設定は不要です。

`API_BASE_URL`が未設定の場合、自動的に`http://host.docker.internal:3000`（Docker Composeから起動した場合にホストマシンのNext.jsにアクセスするURL）を使用します。

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