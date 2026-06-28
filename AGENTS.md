# AGENTS.md

## Cursor Cloud specific instructions

### このリポジトリについて（概要）

- 本リポジトリは Vite + React 18 製のポートフォリオ用シングルページアプリケーションです。
- **重要（非自明）**: アプリのコードと `package.json` はリポジトリ直下ではなく `portfolio/` サブディレクトリにあります。npm コマンドはすべて `portfolio/` 内で実行してください（例: `cd portfolio && npm run dev`）。
- パッケージマネージャは npm を使用します（`portfolio/package-lock.json` が存在するため）。Node.js 22 系で動作確認済みです。

### 開発・確認コマンド（すべて `portfolio/` で実行）

標準コマンドは `portfolio/package.json` の `scripts` に定義されています。重複記載は避け、要点のみ記します。

- 開発サーバ起動: `npm run dev`（Vite。既定ポートは `5173`）。VM 外やプレビューから到達したい場合は `npm run dev -- --host` を使用してください。
- ビルド: `npm run build`
- Lint: `npm run lint`
- ビルド成果物のプレビュー: `npm run preview`

### 注意点（ハマりどころ）

- `npm run lint` は現状、既存コードに起因する `react/prop-types` の指摘が複数件出ます（環境不備ではありません）。Lint ツール自体は正常に動作します。
- `GoogleCloudVision` コンポーネントは Google Cloud Vision API を利用する想定です。API キーが未設定でも画面の描画自体は失敗しませんが、ラベル検出機能を実際に試す場合は別途キーが必要です。
