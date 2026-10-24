# 作業記録

## 2026-10-24 脆弱性の点検と継続検出の設定

[www の docs/security-runbook.md](https://github.com/kusanaginoturugi/www/blob/main/docs/security-runbook.md) の手順で実施した。

### 構成と対象外の節

- Cloudflare Pages の `wisdomking` プロジェクト。ビルドコマンドも出力先も設定されておらず、repo のルートをそのまま配信している。
- Hugo、テーマ、npm 依存がないため、runbook の 2〜4 節 (npm、Hugo 本体、テーマ) は対象外。`HUGO_VERSION` などの Pages の環境変数も設定されておらず、変更していない。
- repo のルートを配信しているため、`README.md`、`docs/`、`.github/` も公開 URL から取得できる。秘密情報は含まれていない。

### コードの点検

- `js/app.js` の `innerHTML` と `insertAdjacentHTML` には固定の文字列だけを渡しており、外部からの入力は入らない。
- 外部リンクには `rel="noopener noreferrer"` が付いている。
- inline script とイベントハンドラ属性はない。
- シークレットのパターン検索の結果は 0 件。

### セキュリティヘッダー

repo ルートに `_headers` を追加した。

- CSP: `script-src 'self'`。Google Fonts 用に `style-src` に `fonts.googleapis.com`、`font-src` に `fonts.gstatic.com` を許可した。`style=` 属性がないので `'unsafe-inline'` は付けていない。
- 死活監視の `fetch` (`mode: 'no-cors'`) も `connect-src` の対象なので、`js/app.js` にあるサービスのホストを列挙した。毎日集計、荷物番号検索、道具一括注文は未ログインだと `auth.showway.biz` へリダイレクトし、その先も `connect-src` で検査されるため、`auth.showway.biz` も入れた。入れないとこの 3 件が「オフライン」と表示される。
- `X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、`Referrer-Policy`、`Permissions-Policy`、`Strict-Transport-Security: max-age=31536000` (`includeSubDomains` と `preload` は付けていない)。

### GitHub の設定

- CI (`.github/workflows/ci.yml`): `js/app.js` の構文、`_headers` の CSP、inline script がないこと、`js/app.js` のサービスのホストがすべて `connect-src` にあることを確認する。サービスを追加したときに `_headers` への追加漏れを検出するため。
- CodeQL (`actions`、`javascript-typescript`、`security-extended`)、Dependency Review、Dependabot (`github-actions` のみ)。Actions は commit SHA で固定した。
- Dependabot 脆弱性アラートを有効にした (PUT と GET で 204 を確認)。open なアラートは 0 件。
- Secret scanning と push protection は以前から有効。Dependabot security updates と main の保護設定は変更していない。

### 検証

- ローカル: `wrangler pages dev` で `_headers` が付くことを確認した。headless Chromium で CSP 違反 0 件、9 サービスすべて「稼働中」、Web フォントの読み込みを確認した。
- push 後: CI、CodeQL、Cloudflare Pages、Dependabot がすべて成功した。本番 (`https://wisdomking.pages.dev/`) でヘッダーが付き、CSP 違反 0 件、9 サービスすべて「稼働中」であることを確認した。CodeQL の open なアラートは 0 件。
