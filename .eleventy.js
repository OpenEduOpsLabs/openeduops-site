/**
 * OpenEduOps — Eleventy configuration.
 *
 * The site is plain static HTML. Everything a visitor needs — navigation,
 * catalogue cards, series ordering, guide links — is rendered at build time.
 * Runtime JavaScript is an optional enhancement layer only.
 */

export default function (eleventyConfig) {
  /* ---------------------------------------------------------- passthrough - */
  // Only the directories that are actually served. `assets/css/parts` is
  // deliberately excluded: those partials are concatenated into one stylesheet
  // by src/assets/css/site.css.11ty.js.
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/logo");
  eleventyConfig.addPassthroughCopy("src/assets/social");
  eleventyConfig.addPassthroughCopy("src/assets/js");

  // GitHub Pages plumbing. CNAME keeps the custom domain; .nojekyll stops
  // Pages from running the output through Jekyll.
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });
  eleventyConfig.addPassthroughCopy({ ".nojekyll": ".nojekyll" });

  // Pre-existing repository material that is already reachable on the live
  // site. Copied through so this release removes no published URL.
  eleventyConfig.addPassthroughCopy({ uploads: "uploads" });
  eleventyConfig.addPassthroughCopy({ _ds: "_ds" });

  eleventyConfig.addWatchTarget("src/assets/css/");

  /* --------------------------------------------------------------- filters - */

  /** 2026-06-18T13:07:23-07:00 -> "18 June 2026" (UTC, stable across machines). */
  eleventyConfig.addFilter("humanDate", (value) => {
    if (!value) return "";
    return new Date(value).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC"
    });
  });

  /** 2026-06-18T13:07:23-07:00 -> "2026-06-18" for <time datetime> and sitemap lastmod. */
  eleventyConfig.addFilter("isoDate", (value) => {
    if (!value) return "";
    return new Date(value).toISOString().slice(0, 10);
  });

  /** Join the site base URL and a root-relative path without doubling the slash. */
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

  /** First entry of `list` whose `key` equals `value` (Nunjucks has no dict lookup by field). */
  eleventyConfig.addFilter("findBy", (list, key, value) =>
    (list || []).find((entry) => entry[key] === value)
  );

  /** Serialise a value for embedding inside a <script type="application/ld+json">. */
  eleventyConfig.addFilter("jsonld", (value) =>
    JSON.stringify(value, null, 2).replace(/</g, "\\u003c")
  );

  /* ---------------------------------------------------- structured data --- */
  // Small builders so templates never hand-assemble JSON. Every field below
  // comes from a value that is also visible or linked on the page.

  /** BreadcrumbList from the same crumb list the visible breadcrumbs render. */
  eleventyConfig.addFilter("breadcrumbSchema", (crumbs, base) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: new URL(crumb.url, base).href
    }))
  }));

  /**
   * VideoObject for a watch page.
   * contentUrl, interactionStatistic and chapter markup are deliberately
   * omitted: no public file URL, a count that changes, and no supplied chapters.
   */
  eleventyConfig.addFilter("videoSchema", (tutorial) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: tutorial.title,
    description: tutorial.summary,
    thumbnailUrl: tutorial.thumbnail_url,
    uploadDate: tutorial.upload_date,
    duration: tutorial.duration_iso,
    embedUrl: tutorial.embed_url
  }));

  /**
   * Reduce decorated tutorials to the {title, url} pairs an ItemList needs.
   * The URL is the same destination the visible row links to: the internal
   * watch page where one exists, the exact YouTube video otherwise.
   */
  eleventyConfig.addFilter("collectionItems", (items, base) =>
    items.map((item) => ({
      title: item.title,
      url: item.destination.external
        ? item.destination.url
        : new URL(item.destination.url, base).href
    }))
  );

  /** CollectionPage + ItemList for a platform hub, in learning order. */
  eleventyConfig.addFilter("collectionSchema", (payload) => ({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: payload.name,
    description: payload.description,
    url: payload.url,
    mainEntity: {
      "@type": "ItemList",
      name: payload.listName,
      numberOfItems: payload.items.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: payload.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: item.url
      }))
    }
  }));

  /* -------------------------------------------------------------- settings - */
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "11ty.js"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    // The site is served from a custom apex domain, so paths stay root-relative.
    pathPrefix: "/"
  };
}
