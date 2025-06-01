# Drizzle ORM の運用方法

本プロジェクトでは、Drizzle ORM を用いてデータベースとのやり取りを行っています。
以下は、スキーマの追加〜マイグレーション実行までの基本的な運用ルールを記載したドキュメントです。

---

## 📁 フォルダ構成（Drizzle関連のみ抜粋）

```
front/
├── drizzle.config.ts             # ← drizzle-kit の設定ファイル
├── scripts/
│   └── seed.ts                   # ← 初期データ投入用スクリプト（任意）
├── src/
│   ├── lib/
│   │   ├── db.ts                 # ← drizzle クライアント生成用
│   │   └── schema/              # ← テーブルスキーマ（モデル）を定義
│   │       ├── index.ts         # ← スキーマの一括エクスポート
│   │       └── user.ts          # ← 各テーブルの定義（例：users テーブル）
```

---

## 🚀 初期セットアップコマンド

開発開始時に以下のコマンドを実行してください。

```bash
cd front
npm install               # 依存パッケージのインストール
```

`.env` ファイルには以下のように DB 接続情報を記述します：

```env
DATABASE_URL=postgres://formoku:formoku@localhost:5432/formoku
```

---

## 🏗 既存のスキーマをDBに反映する（初回マイグレーション）

既に `src/lib/schema/` に定義されているモデル（例：users テーブル）を、初めて DB に反映する場合は以下のコマンドを実行してください。

```bash
npx drizzle-kit push
```
- 既存のDBに反映されていないモデルはこの操作でテーブル作成されます。

## 🧱 モデル（スキーマ）の追加手順

### 1. スキーマファイルを追加

`src/lib/schema/` に新しいファイルを作成し、テーブル定義を記述します。

`src/lib/schema/user.ts`を参考に作成ください。


### 2. `index.ts` に追記

```ts
// src/lib/schema/index.ts
export * from "./user";
export * from "./event"; // ← 追加の例
```

---

### 🧬 マイグレーションの生成と実行（差分反映）

以下のコマンドで、スキーマとデータベースの差分をもとに、直接データベースへ変更を適用します。

```bash
npx drizzle-kit push
```


---

## 🌱 初期データの投入（任意）

必要に応じて `scripts/seed.ts` に初期データを記述し、以下で実行可能です：

```bash
npx tsx scripts/seed.ts
```

---

## 🔗 参考リンク

- [Drizzle ORM 公式ドキュメント](https://orm.drizzle.team/)
