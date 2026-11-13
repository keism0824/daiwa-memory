# EmDash Blog Template (Cloudflare)

A clean, minimal blog built with [EmDash](https://github.com/emdash-cms/emdash) and deployed on Cloudflare Workers with D1 and R2.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/emdash-cms/templates/tree/main/blog-cloudflare)

![Blog template homepage](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-desktop.jpg)

## What's Included

- Featured post hero on the homepage
- Post archive with reading time estimates
- Category and tag archives
- Full-text search
- RSS feed
- SEO metadata and JSON-LD
- Fixed light reading theme

## Pages

| Page | Route |
|---|---|
| Homepage | `/` |
| All posts | `/posts` |
| Single post | `/posts/:slug` |
| Category archive | `/category/:slug` |
| Tag archive | `/tag/:slug` |
| Search | `/search` |
| Static pages | `/pages/:slug` |
| 404 | fallback |

## Screenshots

| | Desktop | Mobile |
|---|---|---|
| Light | ![homepage light desktop](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-desktop.jpg) | ![homepage light mobile](https://raw.githubusercontent.com/emdash-cms/emdash/main/assets/templates/blog/latest/homepage-light-mobile.jpg) |

## Infrastructure

- **Runtime:** Cloudflare Workers
- **Database:** D1
- **Storage:** R2
- **Framework:** Astro with `@astrojs/cloudflare`

## Local Development

```bash
pnpm install
pnpm dev
```

Open http://localhost:4321/_emdash/admin and complete the setup wizard. EmDash runs database migrations and applies the blog seed during setup. The site is available at http://localhost:4321.

## Deploying

### Cache and image descriptions

Public pages use Cloudflare Workers Cache. Article pages expire after 60 seconds;
lists and pages expire after one hour (with up to 60 seconds of stale revalidation).
EmDash invalidates the registered content/taxonomy/menu/widget tags on supported
writes. Search, preview/authenticated responses, and errors are not shared.
`astro dev` does not cache; verify cache hits and invalidation after deployment.
See [EmDash route caching](https://docs.emdashcms.com/deployment/route-caching/).

アイキャッチを登録するときは、管理画面で画像の代替テキスト（alt）に
「何が写っているか」を簡潔に入力してください。撮影場所・年代は確認できた
場合のみ記載します。表示時は入力済みの alt を優先し、空欄ならキャプション、
それもなければ「『記事名』の記録写真」という文言で補完します。
この補完は写真そのものの説明の代わりにはならないため、公開前に確認してください。

Local development responses include `X-Robots-Tag: noindex`. Production builds
leave indexing to EmDash's SEO settings. For a staging build, set
`SITE_NOINDEX=true` when running the build (for example in the build environment
or `.env.production`). This flag is evaluated at build time; changing it requires
a new build. Existing EmDash robots directives are preserved.

```bash
pnpm wrangler login
pnpm deploy
```

The first deployment provisions the named D1 database and R2 bucket from `wrangler.jsonc`. See [Deploy to Cloudflare](https://docs.emdashcms.com/deployment/cloudflare/) for production setup, or use the deploy button above.

## See Also

- [Node.js variant](../blog) -- same template using SQLite and local file storage
- [All templates](../)
- [EmDash documentation](https://docs.emdashcms.com/)
