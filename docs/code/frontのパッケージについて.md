# ディレクトリ構成

```
front/
├── src/                   # ソース
│   ├── app/               # ページ関係 (細かいページ情報はcomponents/templateに書くこと)
│   ├── hook/              # カスタムフック (templateで使う細かいロジックもここに書いていいかも)
│   ├── action/           # サーバーアクション（外部へのアクションはここに記述）
│   ├── component/        # コンポーネント
│   ├── lib/              # その他のコード（drizzleのスキーマもここに入れる）
│   ├── type/             # 型定義
│   └── middleware.ts     # ミドルウェア
│
├── public/               # 静的ファイル
│   ├── images/          # 画像ファイル
│   └── fonts/           # フォントファイル
│
├── .next/               # Next.jsのビルド出力
├── node_modules/        # 依存パッケージ
│
├── package.json         # プロジェクト設定と依存関係
├── package-lock.json    # 依存関係のロックファイル
├── tsconfig.json        # TypeScript設定
├── next.config.ts       # Next.js設定
├── postcss.config.mjs   # PostCSS設定
├── eslint.config.mjs    # ESLint設定
├── next-env.d.ts        # Next.js型定義
└── .gitignore           # Git除外設定
```