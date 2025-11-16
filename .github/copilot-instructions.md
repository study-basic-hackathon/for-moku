# for-moku プロジェクト - Copilot 実装ガイド

## プロジェクト概要

**for-moku**は、もくもく会（勉強会）などのイベント運営を支援するWebアプリケーションです。
イベントの管理、会場レイアウトの編集、当日の参加者の座席管理などをリアルタイムで行えるサービスです。

- **目的**: もくもく会に関わる全ての人（主催者・参加者）のためのイベント管理サービス
- **対象イベント**: プログラミング初心者勉強会などのConnpassイベント
- **GitHub**: `study-basic-hackathon/for-moku`
- **開発ブランチ**: `develop`

---

## 技術スタック

### フロントエンド
- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS 4
- **UIコンポーネント**: shadcn/ui (Radix UI ベース)
- **状態管理**: Jotai
- **フォーム**: React Hook Form + Zod
- **認証**: NextAuth.js v5 (Google OAuth)
- **その他ライブラリ**:
  - FullCalendar (カレンダー表示)
  - Canvas API (会場レイアウト編集)
  - TanStack Table (テーブル表示)

### バックエンド・データベース
- **データベース**: PostgreSQL 14
- **ORM**: Drizzle ORM
- **コンテナ**: Docker Compose

### リアルタイム通信
- **WebSocket**: PartyKit (当日ページのリアルタイム同期用)

### インフラ
- **ホスティング**: Vercel
- **画像アップロード**: Gyazo互換のローカルサーバー

---

## プロジェクト構造

```
for-moku/
├── front/                    # Next.jsフロントエンドアプリケーション
│   ├── src/
│   │   ├── app/              # App Router (ページ・API Routes)
│   │   │   ├── (withsidebar)/ # サイドバー付きレイアウトのページ群
│   │   │   ├── auth/          # 認証関連ページ
│   │   │   ├── event/         # イベント関連ページ
│   │   │   ├── room/          # 当日ページ
│   │   │   └── api/           # API Routes
│   │   ├── actions/          # Server Actions (データ操作)
│   │   │   ├── dashboard/
│   │   │   ├── event/
│   │   │   ├── user/
│   │   │   ├── user_group/
│   │   │   └── venue/
│   │   ├── components/       # UIコンポーネント (Atomic Design)
│   │   │   ├── atoms/        # 最小単位のコンポーネント
│   │   │   ├── molecules/    # atomsの組み合わせ
│   │   │   ├── organisms/    # ドメイン依存の大きなコンポーネント
│   │   │   └── templates/    # ページレイアウト
│   │   ├── hooks/            # カスタムフック
│   │   ├── lib/              # ユーティリティ・ビジネスロジック
│   │   │   ├── db/           # データベース操作
│   │   │   │   └── schema/   # Drizzle ORMスキーマ定義
│   │   │   ├── auth/         # 認証処理
│   │   │   ├── api/          # 外部API連携
│   │   │   └── util/         # 汎用ユーティリティ
│   │   ├── store/            # グローバル状態管理 (Jotai)
│   │   ├── types/            # 型定義
│   │   └── styles/           # スタイル定義
│   ├── drizzle/              # マイグレーションファイル
│   └── scripts/              # スクリプト (seed.tsなど)
├── partykit/                 # WebSocketサーバー (PartyKit)
├── localgyazo/               # 画像アップロード用ローカルサーバー
├── database/                 # データベース初期化スクリプト
├── docs/                     # ドキュメント
│   ├── arch/                 # アーキテクチャ・設計資料
│   └── code/                 # コーディング規約
└── compose.yml               # Docker Compose設定
```

---

## 主要機能とドメイン

### 1. ダッシュボード
- イベント一覧表示
- カレンダー形式でのイベント表示
- 所属グループの管理

### 2. イベント管理
- イベントの作成・編集・削除 (CRUD)
- Connpass連携 (イベント情報のインポート)
- 会場レイアウト（間取り）の編集
- タイムテーブル管理
- イベントのクローズ機能

### 3. 会場エディター
- Canvas APIを使用したタイルマップエディタ
- 席、テーブル、ドア、窓などの配置
- リアルタイムプレビュー

### 4. 当日ページ (room)
- 参加者の座席リアルタイム表示
- WebSocket (PartyKit) による同期
- 誰がどこに座っているかを可視化

### 5. ユーザー管理
- ユーザー情報の登録・編集
- プロフィール (自己紹介、興味のある分野)
- Google OAuth認証

### 6. ユーザーグループ管理
- グループの作成・編集
- メンバーの招待・権限管理 (admin/member)
- グループ単位でのイベント管理

---

## データベース設計

### 主要テーブル

#### users
- ユーザー情報
- `id`, `email`, `name`, `bio`, `interests`, `created_at`, `updated_at`, `deactivated_at`

#### events
- イベント情報
- `id`, `user_group_id`, `name`, `description`, `start_date_time`, `end_date_time`, `event_url`, `venue_url`, `image_json` (会場レイアウトJSON), `image_url`, `created_at`, `updated_at`

#### user_event_participations
- ユーザーのイベント参加情報
- `id`, `user_id`, `event_id`, `created_at`, `updated_at`

#### user_groups
- ユーザーグループ
- `id`, `name`

#### user_group_assignments
- グループとユーザーの紐付け
- `id`, `user_id`, `user_group_id`, `role` (admin/member), `created_at`, `updated_at`

#### finished_event_state
- イベント終了状態の管理
- イベントクローズ後は編集不可にする

### ORM: Drizzle
- スキーマ定義: `front/src/lib/db/schema/`
- マイグレーション: `npm run db:push` (drizzle-kit push)

**重要**: 既存のスキーマファイルを参考に、型安全なクエリを記述すること。

---

## コーディング規約

### 1. Atomic Design
コンポーネントは以下の階層に分類:
- **atoms**: 最小単位 (ボタン、入力フィールドなど)。shadcn/uiコンポーネントもここに配置。
- **molecules**: atomsの組み合わせ (検索フォームなど)。汎用的で再利用可能。
- **organisms**: ドメインロジックを含む大きなコンポーネント (ヘッダー、サイドバー、フォームセクションなど)。
- **templates**: ページレイアウト。`layout.tsx`から呼ばれる。

**原則**:
- 単一責任: 各コンポーネントは1つの責務のみ
- 再利用性: propsで柔軟にカスタマイズ可能にする
- `className`をpropsで受け取り、スタイルの拡張を可能にする

詳細: `docs/code/frontend/atomicデザインの規約.md`

### 2. ファイル命名
- コンポーネント: PascalCase (例: `EventCard.tsx`)
- ユーティリティ: camelCase (例: `formatDate.ts`)
- ディレクトリ: kebab-case または機能名

### 3. 環境変数
- **必ず** `front/src/app/env.ts` から参照する
- `process.env.XXX` を直接使用しない
- エディタでの参照追跡を可能にするため

詳細: `docs/code/環境変数について.md`

### 4. Drizzle ORM の運用
- スキーマ追加: `front/src/lib/db/schema/` に新規ファイル作成
- `index.ts` にエクスポート追加
- マイグレーション: `npm run db:push`

詳細: `docs/code/Drizzleの運用方法.md`

### 5. 認証
- NextAuth.js v5 を使用
- 認証設定: `front/src/lib/auth/auth.ts`
- Google OAuth + デバッグ用のCredentialsプロバイダー
- ミドルウェアで認証チェック: `front/src/middleware.ts`

### 6. Server Actions
- `front/src/actions/` 配下にドメインごとに配置
- `"use server"` ディレクティブを使用
- データ操作は必ずServer Actionsで行う

---

## ブランチ戦略

### ブランチ運用
- **メインブランチ**: `develop`
- **作業ブランチ**: `feature/#[タスク番号]`

### ワークフロー
1. `develop` から `feature/#123` を作成
2. 作業コミット (コミットメッセージは自由)
3. `develop` へプルリクエスト作成
4. レビュー後、**Squash Merge**
5. マージ時のコミットメッセージ形式:
   ```
   ${タスク名} #${タスク番号}
   
   - 変更内容1
   - 変更内容2
   ```

詳細: `docs/code/branch運用.md`

---

## 開発環境セットアップ

### 1. 依存関係のインストール
```bash
cd front
npm install
```

### 2. 環境変数の設定
`.env` ファイルを作成し、以下を記述:
```env
DATABASE_URL=postgres://formoku:formoku@localhost:5432/formoku
```

### 3. データベース起動
```bash
docker-compose up -d
```

### 4. マイグレーション実行
```bash
npm run db:push
```

### 5. 開発サーバー起動
```bash
npm run dev
```

---

## 実装時の注意事項

### 新しい機能を追加する場合
1. **要件を確認**: `docs/arch/usecase.md` や該当ドキュメントを確認
2. **データモデル確認**: `docs/arch/db/table案.md` でテーブル構造を確認
3. **画面設計確認**: `docs/arch/view/` 配下のドキュメントを参照
4. **既存コードを参照**: 似た機能の実装を探して参考にする

### コンポーネント作成時
- まず動くものを作る
- その後、Atomic Designのガイドラインに従ってリファクタリング
- 再利用可能性を意識する

### データベース操作
- `front/src/lib/db/` 配下の既存関数を参照
- 型安全性を保つため、Drizzle ORMの型推論を活用
- トランザクションが必要な場合は `Transaction` 型を使用 (`front/src/types/db.ts`)

### エラーハンドリング
- ユーザーに適切なエラーメッセージを表示
- サーバーサイドではログを出力
- 認証エラーは適切にリダイレクト

### パフォーマンス
- 不必要なデータ取得を避ける
- 可能な限りサーバーコンポーネントを使用
- クライアントコンポーネントは必要な箇所のみに限定

---

## リアルタイム機能 (PartyKit)

### 当日ページ (room)
- WebSocketを使用して参加者の座席情報をリアルタイム同期
- PartyKitサーバー: `partykit/src/server.ts`
- クライアント: `partysocket` ライブラリを使用

**注意**: Vercelではコネクション制限があるため、WebSocketは外部サービス (PartyKit) を利用。

詳細: `docs/code/websocket/partyKit.md`

---

## 外部API連携

### Connpass API
- イベント情報のインポート機能で使用
- API利用申請が必要

### Gyazo互換サーバー
- 画像アップロード用のローカルサーバー
- `localgyazo/` ディレクトリで実装
- Docker Composeで起動

---

## デプロイ

### Vercelへのデプロイ
詳細: `docs/code/deploy/Vercelでデプロイする手順.md`

---

## 参考ドキュメント

### アーキテクチャ
- `docs/arch/usecase.md`: 全体のユースケース
- `docs/arch/機能分類について.md`: 機能遷移図
- `docs/arch/db/table案.md`: データベース設計

### コーディング
- `docs/code/frontend/atomicデザインの規約.md`: コンポーネント設計
- `docs/code/Drizzleの運用方法.md`: ORM運用
- `docs/code/環境変数について.md`: 環境変数の扱い
- `docs/code/branch運用.md`: Git運用

### 画面設計
- `docs/arch/view/common/`: 共通画面 (ダッシュボード、サイドメニュー)
- `docs/arch/view/event/`: イベント関連画面
- `docs/arch/view/user/`: ユーザー情報画面
- `docs/arch/view/user_group/`: グループ管理画面

---

## トラブルシューティング

### データベース接続エラー
- Docker Composeが起動しているか確認: `docker ps`
- ポート5432が使用されているか確認

### マイグレーションエラー
- スキーマ定義を確認
- `npm run db:push` を再実行

### 認証エラー
- 環境変数が正しく設定されているか確認
- NextAuth.jsのデバッグモードを有効化 (`AUTH_DEBUG=true`)

---

## 実装のベストプラクティス

1. **型安全性を重視**: TypeScriptの型推論を最大限活用
2. **コンポーネントの分割**: 大きくなりすぎたら分割を検討
3. **既存コードを参照**: 似た実装を探してパターンを踏襲
4. **ドキュメントを確認**: 迷ったら `docs/` 配下を参照
5. **段階的な実装**: まず動くものを作り、その後リファクタリング
6. **レビューを活用**: プルリクエストで積極的にフィードバックを求める

---

このドキュメントを参照しながら、一貫性のある高品質なコードを実装してください。
