# LP Astro Template

静的ランディングページ用 Astro + Vite テンプレート

他社サイトへの組み込みを前提とした、スコープ化されたCSS/JSを持つLPテンプレートです。

## 特徴

- **スコープ化されたCSS**: `#project-name` コンテナ内でスタイルを制限し、既存サイトとの競合を防止
- **IIFE形式のJS**: グローバルスコープを汚染しない即時実行関数形式でバンドル
- **高速な開発環境**: Vite HMRによる即座のフィードバック
- **Tailwind CSS**: ユーティリティファーストのスタイリング
- **TypeScript対応**: 型安全なJavaScript開発
- **Cloudflare Pages対応**: Basic認証付きステージング環境

## 前提条件

- Node.js 18以上
- npm または yarn

## セットアップ

### 1. テンプレートからリポジトリを作成

GitHub CLIを使用:

```bash
gh repo create my-landing-page --template your-org/lp-astro-template --private --clone
cd my-landing-page
```

### 2. プロジェクトの初期化

```bash
npm install
```

プロジェクト名（URLパスとして使用される）を入力してください。例: `client-a`

このスクリプトは以下を実行します:
- 設定ファイル内の `project-name` を実際のプロジェクト名に置換
- ディレクトリ名をプロジェクト名に変更

### 3. 開発サーバーを起動

```bash
npm run dev
```

ブラウザで `http://localhost:4321/project-name/` を開いてください。

## コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動 (HMR有効) |
| `npm run build` | 本番用ビルド (Astro + Vite + Prettier) |
| `npm run preview` | ビルドしたサイトをプレビュー |

## プロジェクト構造

```
lp-astro-template/
├── functions/
│   └── _middleware.js       # Cloudflare Basic認証
├── public/
│   └── {project-name}/      # 静的アセット (画像等)
│       └── assets/
│           └── images/
├── src/
│   ├── components/          # Astroコンポーネント
│   │   └── common/          # 共通コンポーネント (Header, Footer)
│   ├── css/
│   │   └── style.css        # Tailwindエントリーポイント
│   ├── layouts/
│   │   └── Layout.astro     # 基本レイアウト
│   ├── pages/
│   │   └── {project-name}/  # ページ (URLパスと一致)
│   │       └── index.astro
│   └── scripts/
│       └── main.ts          # JSエントリーポイント (IIFE)
├── util/
│   ├── assets.ts            # アセットパス生成ヘルパー
│   └── settings.ts          # 環境判定ユーティリティ
├── astro.config.mjs         # Astro設定
├── vite.config.ts           # Vite設定 (IIFE出力)
├── tailwind.config.js       # Tailwind設定
├── postcss.config.js        # PostCSS設定
└── package.json
```

## 開発ガイド

### アセットパスの使用

`util/assets.ts` のヘルパー関数を使用してアセットパスを生成します:

```typescript
import { img, css, js } from '../../util/assets';

// 画像
<img src={img('hero.png')} alt="Hero" />
// → /project-name/assets/images/hero.png

// CSS
<link rel="stylesheet" href={css('style.css')} />
// → /project-name/assets/style.css

// JavaScript
<script src={js('main.js')}></script>
// → /project-name/assets/main.js
```

### 環境の判定

Astroコンポーネント内で環境を判定:

```astro
---
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;
---

{isDev && <p>開発モード</p>}
{isProd && <p>本番モード</p>}
```

### CSSスコープ

すべてのスタイルは `#project-name` (またはプロジェクト名) コンテナ内でスコープ化されます:

```css
#project-name {
  /* すべてのスタイルをここに */
  .my-class {
    /* ... */
  }
}
```

### JavaScriptのスコープ

JavaScriptはIIFE形式でバンドルされ、グローバルスコープを汚染しません:

```typescript
// src/scripts/main.ts
function init() {
  // 初期化処理
}

init();
```

ビルド後:
```javascript
(function() {
  // バンドルされたコード
  function init() { /* ... */ }
  init();
})();
```

## ビルドとデプロイ

### ビルド

```bash
npm run build
```

ビルド成果物は `dist/` ディレクトリに生成されます:

```
dist/
└── {project-name}/
    ├── index.html
    └── assets/
        ├── style.css
        └── main.js
```

### Cloudflare Pagesへのデプロイ

1. Cloudflare Pagesで新しいプロジェクトを作成
2. ビルド設定:
   - ビルドコマンド: `npm run build`
   - ビルド出力ディレクトリ: `dist`
   - Node.js バージョン: 18以上
3. デプロイ

#### Basic認証

ステージング環境用のBasic認証は `functions/_middleware.js` で設定されています:

- デフォルトユーザー名: `test`
- デフォルトパスワード: `test`

**本番環境では必ず変更してください！**

## 既存サイトへの組み込み

ビルド成果物 (`dist/{project-name}/`) を既存サイトにコピーし、HTMLに以下を追加:

```html
<!-- CSS -->
<link rel="stylesheet" href="/{project-name}/assets/style.css" />

<!-- JS -->
<script defer src="/{project-name}/assets/main.js"></script>

<!-- コンテンツ -->
<div id="{project-name}">
  <!-- ここにLPのHTMLをコピー -->
</div>
```

### 既存サイトとの競合を防ぐために

- CSSは `#{project-name}` でスコープ化されているため、既存のスタイルと競合しません
- JavaScriptはIIFE形式のため、グローバル変数を汚染しません
- アセットパスはすべて `/{project-name}/` プレフィックス付きです

## カスタマイズ

### プロジェクト名の変更

プロジェクト名を変更する必要がある場合は、以下のファイルを更新してください:

- `util/assets.ts` - `BASE_PATH` 変数
- `vite.config.ts` - `outDir` パス
- `package.json` - `name` フィールド
- `src/layouts/Layout.astro` - コンテナID、title、description、OGP画像パス
- `src/components/common/Header.astro` - タイトル
- `src/components/common/Footer.astro` - コピーライト
- `src/scripts/main.ts` - `projectName` 変数

### Tailwind設定

`tailwind.config.js` でカラー、フォント、その他のスタイル設定をカスタマイズできます:

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3490dc',
        secondary: '#ffed4e',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
};
```

### Google Tag Manager

`src/layouts/Layout.astro` のコメントアウトされたGTMコードを有効化し、GTM IDを設定してください。

## トラブルシューティング

### ビルドエラー

TypeScriptエラーがある場合:
```bash
npm run build
```

### 開発サーバーが起動しない

ポート4321が使用中の場合、別のポートを指定:
```bash
npm run dev -- --port 3000
```

### CSSが適用されない

ブラウザのキャッシュをクリアするか、ハードリロード（Cmd+Shift+R / Ctrl+Shift+R）を試してください。

## ライセンス

MIT

## サポート

問題が発生した場合は、リポジトリのIssueセクションで報告してください。
