/**
 * Derived views over the single tutorial source of truth (`tutorials.json`).
 *
 * Nothing here invents content. Every value is either copied from a record or
 * computed from two records that already exist (ordering, previous/next).
 * Adding the next published tutorial means adding one record to tutorials.json.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const read = (file) => JSON.parse(readFileSync(join(here, file), "utf8"));

const tutorials = read("tutorials.json");
const site = read("site.json");

/* ------------------------------------------------------------- helpers --- */

const bySlug = new Map(tutorials.map((t) => [t.slug, t]));
const byVideoUrl = new Map(tutorials.map((t) => [t.youtube_url, t]));

const watchPath = (record) => `/tutorials/${record.slug}/`;

/** Where a catalogue card or series row should send the visitor. */
function destinationFor(record) {
  if (record.detail_page) {
    return {
      url: watchPath(record),
      external: false,
      label: "Watch and follow",
      event: "tutorial_watch"
    };
  }
  return {
    url: record.youtube_url,
    external: true,
    label: "Watch on YouTube",
    event: "tutorial_watch"
  };
}

/**
 * Resolve one end of the previous/next viewer path.
 * A sibling with its own page becomes an internal link; a published sibling
 * without one becomes a clearly labelled YouTube link.
 */
function resolveNeighbour(slug, youtubeUrl, direction) {
  const record = slug ? bySlug.get(slug) : youtubeUrl ? byVideoUrl.get(youtubeUrl) : null;

  if (record && record.detail_page) {
    return {
      url: watchPath(record),
      title: record.title,
      external: false,
      label: direction === "next" ? "Next" : "Previous"
    };
  }

  if (record) {
    return {
      url: record.youtube_url,
      title: record.title,
      external: true,
      label: direction === "next" ? "Next on YouTube" : "Previous on YouTube"
    };
  }

  // A URL with no matching record: link it, but never claim a title we lack.
  if (youtubeUrl) {
    return {
      url: youtubeUrl,
      title: null,
      external: true,
      label: direction === "next" ? "Next on YouTube" : "Previous on YouTube"
    };
  }

  return null;
}

/* ------------------------------------------------------------ decorate --- */

const records = tutorials.map((record) => {
  const platform = site.platforms.find((p) => p.slug === record.platform_slug);

  return {
    ...record,
    path: record.detail_page ? watchPath(record) : null,
    stepLabel: `Step ${String(record.sequence).padStart(2, "0")}`,
    destination: destinationFor(record),
    playlistUrl: platform ? platform.playlistUrl : null,
    previous: resolveNeighbour(record.previous_slug, record.previous_youtube_url, "previous"),
    next: resolveNeighbour(record.next_slug, record.next_youtube_url, "next")
  };
});

/* --------------------------------------------------------------- views --- */

const newestFirst = [...records].sort(
  (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
);

const byPlatform = Object.fromEntries(
  site.platforms.map((platform) => [
    platform.slug,
    records
      .filter((r) => r.platform_slug === platform.slug)
      .sort((a, b) => a.sequence - b.sequence)
  ])
);

const responsibilityCounts = Object.fromEntries(
  site.responsibilities.map((r) => [
    r.name,
    records.filter((t) => t.responsibility === r.name).length
  ])
);

export default {
  /** Every published long-form tutorial, newest first. Catalogue default order. */
  all: newestFirst,

  /** Learning order per platform, keyed by platform slug. */
  byPlatform,

  /** Most recent publication date per platform, for sitemap lastmod. */
  newestByPlatform: Object.fromEntries(
    Object.entries(byPlatform).map(([slug, list]) => [
      slug,
      list.map((r) => r.upload_date).sort().at(-1) || null
    ])
  ),

  /** The records that have their own watch page, in publication order. */
  detailPages: newestFirst.filter((r) => r.detail_page),

  /** Only published tutorials with a companion guide belong in the guide index. */
  guides: newestFirst.filter((r) => r.guide_url),

  newestGuideDate: newestFirst.find((r) => r.guide_url)?.upload_date || null,

  /** The three most recent publications, for the homepage. */
  latest: newestFirst.slice(0, 3),

  /** One genuine beginner starting point per platform. */
  startHere: site.platforms.map((platform) => ({
    platform,
    tutorial: records.find((r) => r.slug === platform.startHereSlug)
  })),

  counts: {
    total: records.length,
    guides: records.filter((r) => r.guide_url).length,
    byPlatform: Object.fromEntries(
      Object.entries(byPlatform).map(([slug, list]) => [slug, list.length])
    ),
    byResponsibility: responsibilityCounts
  }
};
