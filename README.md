# openeduops.com

The public OpenEduOps website: a discovery layer for the published Moodle and
Open edX infrastructure tutorials.

It is a small static site. Every visitor-facing thing — navigation, catalogue
cards, series ordering, guide links, metadata, structured data — is generated at
build time from one data file. Runtime JavaScript adds the mobile menu, the
catalogue filters, and optional section reveals, and the site is complete
without any of it.

The videos live on YouTube and the companion command guides live as GitHub
Gists. This site links to them; it does not copy them.

---

## Prerequisites

- **Node.js 20 or newer** (CI builds on Node 22). Nothing else — no database, no
  server runtime, no CMS, no YouTube API key.

## Commands

```bash
npm ci            # install exactly what the lockfile pins
npm start         # local preview with live reload at http://localhost:8080
npm run build     # production build into _site/
npm run validate  # structure + internal links + HTML, against the built site
npm test          # build, then validate
```

Individual checks:

```bash
npm run check:structure   # routes, counts, ordering, JSON-LD, sitemap, Pages files
npm run check:links       # every internal href and src resolves, fragments included
npm run check:html        # html-validate over _site/**/*.html
npm run check:external    # network: the 12 videos, 2 playlists, 12 Gists, 3 project links
npm run clean             # remove _site/
```

`check:external` needs network access. YouTube rate-limits automated requests,
so it reports `RATE-LIMITED` separately from `BROKEN` — a throttled URL is
unproven, not proven bad.

Generated output goes to **`_site/`**, which is git-ignored and rebuilt from
source every time.

---

## Structure

```text
src/
  _data/
    site.json            navigation, platforms, external links, locked page metadata
    tutorials.json       THE SOURCE OF TRUTH — one record per published tutorial
    catalogue.js         derived views over tutorials.json (ordering, previous/next)
  _includes/
    layouts/
      base.njk           <head>, header, footer, JSON-LD, script tags
      series.njk         a platform hub, driven entirely by `platformSlug`
      tutorial.njk       a priority watch page
    components/
      header.njk footer.njk breadcrumbs.njk
      tutorial-card.njk series-card.njk series-step.njk guide-row.njk
  assets/
    css/parts/*.css      the stylesheet, authored in numbered sections
    css/site.css.11ty.js concatenates those sections into /assets/css/site.css
    js/site.js           mobile menu, Platforms disclosure, optional reveals
    js/catalogue.js      catalogue filters
    fonts/ logo/ social/ self-hosted assets
  index.njk tutorials/ moodle/ open-edx/ guides/ about/
  404.njk robots.njk sitemap.njk
  tutorial-pages.njk     generates one watch page per `detail_page: true` record
tools/                   validation scripts (plain Node, no framework)
.eleventy.js             passthrough copies, filters, structured-data builders
.github/workflows/pages.yml
```

### Routes

| Route | Source |
| --- | --- |
| `/` | `src/index.njk` |
| `/tutorials/` | `src/tutorials/index.njk` |
| `/moodle/` | `src/moodle/index.njk` → `layouts/series.njk` |
| `/open-edx/` | `src/open-edx/index.njk` → `layouts/series.njk` |
| `/guides/` | `src/guides/index.njk` |
| `/about/` | `src/about/index.njk` |
| `/tutorials/<slug>/` | `src/tutorial-pages.njk` (one per `detail_page` record) |
| `/404.html` `/robots.txt` `/sitemap.xml` | `src/404.njk` `src/robots.njk` `src/sitemap.njk` |

### The stylesheet

Sections live in `src/assets/css/parts/`, numbered so the filename order is the
cascade order. `site.css.11ty.js` concatenates them into a single
`/assets/css/site.css`, so the page still makes one CSS request. **Edit the
partials, never the generated file.** Adding a section means dropping a new
numbered `.css` file into `parts/`.

---

## Adding a published tutorial

> **Rule: nothing goes in until the video is public.** No placeholder records,
> no "coming soon" cards, no scheduled titles. If a video is not live on
> YouTube, it does not exist as far as this site is concerned.

### 1. Add one record to `src/_data/tutorials.json`

That is the whole job for a normal tutorial. Every mandatory field:

| Field | Meaning |
| --- | --- |
| `platform` / `platform_slug` | `Moodle` / `moodle`, or `Open edX` / `open-edx` |
| `series` | the series name shown on the platform hub |
| `sequence` | position in the learning path, 1-based, unique within the platform |
| `responsibility` | exactly `Build`, `Secure`, or `Operate` — drives the catalogue filters |
| `title` | the real YouTube title |
| `slug` | URL-safe, unique; becomes `/tutorials/<slug>/` if it gets a page |
| `summary` | one or two sentences; used as the meta description and the visible intro |
| `outcome` | what the viewer ends up with; shown on cards and series rows |
| `environment` | the versions covered, separated by ` · ` |
| `upload_date` | the real publication timestamp, ISO 8601 with offset |
| `display_duration` | `MM:SS`, as shown to the viewer |
| `duration_iso` | ISO 8601 duration, e.g. `PT27M2S` — used in `VideoObject` |
| `video_id` | the YouTube id |
| `youtube_url` | `https://www.youtube.com/watch?v=<id>` |
| `embed_url` | `https://www.youtube-nocookie.com/embed/<id>` |
| `thumbnail_url` | `https://i.ytimg.com/vi/<id>/maxresdefault.jpg` |
| `guide_url` | the companion Gist |
| `detail_page` | `true` only when the tutorial has its own watch page |

Rebuild. The record now appears in the catalogue (sorted by `upload_date`
descending), on its platform hub (sorted by `sequence`), on the guides index,
and — if it is one of the three newest — in **Latest tutorials** on the
homepage. The counts on the homepage, catalogue and guides pages all come from
the same data, so none of them need editing.

### 2. How `detail_page` changes the destination

`detail_page` is the single switch that decides where a card sends the visitor:

- **`false`** — every card, series row and guide row links straight to
  `youtube_url` and is labelled **Watch on YouTube**.
- **`true`** — a watch page is generated at `/tutorials/<slug>/` and the same
  links point there, labelled **Watch and follow**. The page is added to
  `sitemap.xml` automatically.

Nothing else in the templates changes. This is why the first release can ship
four watch pages and still list all twelve tutorials honestly.

### 3. Adding a watch page

Only after the video is public:

1. Set `"detail_page": true` on the record.
2. Add the page-specific metadata to `watchPageMeta` in `src/_data/site.json`,
   keyed by slug:

   ```json
   "your-slug": {
     "title": "Short page title | OpenEduOps",
     "heading": "The h1 as a visitor should read it"
   }
   ```

   Both are required. The `title` is the `<title>` element; the `heading` is the
   `h1` and the last breadcrumb. Keeping them separate means the browser tab and
   the on-page heading can each be phrased properly.

3. Rebuild and run `npm run validate`.

### 4. Updating previous/next

Previous and next are declared on the record, and resolved against the other
records at build time:

- `previous_slug` / `next_slug` — the slug of a sibling. If that sibling has a
  watch page the control links internally and is labelled `Previous` / `Next`.
  If it does not, the control links to that sibling's YouTube video and is
  labelled `Previous on YouTube` / `Next on YouTube` — the visitor is never
  misled about where a link goes.
- `next_youtube_url` — use when the next published step has no page yet. The
  title is looked up from whichever record owns that URL, so it stays accurate.
- Omit both, or set `next_slug` to `null`, when no published next step exists.
  The control is then left out entirely rather than rendered as a dead end.

When you give an existing tutorial its own page, check the record before it: a
`next_youtube_url` there should usually become `next_slug`.

---

## Metadata and structured data

Generated from the same data the page renders, so they cannot drift apart:

- **Canonical URL** on every indexable page. `/404.html` is `noindex, follow`
  and has no canonical.
- **Open Graph and Twitter** on every page. Generic pages use the OpenEduOps
  social image; watch pages use that video's verified YouTube thumbnail.
- **`WebSite` + `Organization`** on the homepage — name, URL, logo and the
  YouTube/GitHub/X links, and nothing that is not visible or linked on the site.
- **`BreadcrumbList`** on every internal page, built from the same crumb list
  the visible breadcrumbs render.
- **`CollectionPage` + `ItemList`** on each platform hub, in learning order.
- **`VideoObject`** on each watch page: `name`, `description`, `thumbnailUrl`,
  `uploadDate`, `duration`, `embedUrl`. `contentUrl` (no public file URL),
  `interactionStatistic` (a count that changes) and chapter markup (no chapters
  supplied) are deliberately omitted.

`sitemap.xml` lists canonical public HTML pages only — no query URLs, no
external URLs, no 404. `lastmod` is set only where a real source value exists
(the publication date of the newest tutorial a page renders); `/about/` has no
such source and therefore carries no `lastmod`.

---

## Deployment

`.github/workflows/pages.yml`:

- **Pull requests** run build + validation only, with read-only permissions.
- **Pushes to `main`** and **manual runs** build, upload `_site/` as the Pages
  artifact, and deploy through the `github-pages` environment. `pages: write`
  and `id-token: write` are granted to the deploy job alone.
- Official actions are pinned to commit SHAs with the version in a comment.

### One manual step, once

> In GitHub → Settings → Pages → Build and deployment → **Source**, select
> **GitHub Actions**.

Until that is done the workflow will build but the deployment will not publish.

### Custom domain

The site is served from the apex domain **openeduops.com**.

- `CNAME` is copied into `_site/` on every build. Do not delete it — GitHub
  Pages reads it from the published output, and losing it drops the custom
  domain.
- `.nojekyll` is copied too, so Pages serves the output as-is.
- All internal links are **root-relative** (`/tutorials/`). Never add a
  repository-name path prefix: there is a custom domain, so there is no
  `/openeduops-site/` base path.

---

## Things this site deliberately does not do

No analytics, cookie banner, newsletter, accounts, comments, search service,
CMS, or YouTube API synchronisation. No third-party scripts at all. Principal
outbound links carry stable `data-event` attributes — `tutorial_watch`,
`companion_guide_open`, `series_continue`, `playlist_open` — so analytics can be
attached later without rewriting the templates, but that is a separate decision
and nothing is attached today.

---

## Other directories

`_ds/` holds the OpenEduOps design-system bundle and `uploads/` holds the
original logo artwork. Neither is part of the site build, but both are already
reachable on the live domain, so they are copied through to `_site/` unchanged
rather than dropped. Nothing links to them.
