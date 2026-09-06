/**
 * Structural checks over the built site.
 *
 * Answers the questions that matter for this release and nothing else:
 * do the Pages files exist, does every published record actually render,
 * are the two series complete and in order, does every companion guide link
 * appear, and is every JSON-LD block and the sitemap machine-readable?
 *
 * Run with: npm run check:structure   (after npm run build)
 */

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { XMLValidator, XMLParser } from "fast-xml-parser";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "_site");
const tutorials = JSON.parse(readFileSync(join(root, "src/_data/tutorials.json"), "utf8"));

let failures = 0;
let checks = 0;

function check(label, ok, detail = "") {
  checks += 1;
  if (ok) {
    console.log(`  ok    ${label}`);
  } else {
    failures += 1;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ""}`);
  }
}

function read(relative) {
  const path = join(site, relative);
  return existsSync(path) ? readFileSync(path, "utf8") : null;
}

function countOf(haystack, needle) {
  return haystack.split(needle).length - 1;
}

/** Same escaping Nunjucks autoescape applies, so titles can be found in output. */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SITE_URL = "https://openeduops.com";

/* ------------------------------------------------- 1. GitHub Pages files - */
console.log("\nGitHub Pages output");
for (const file of ["robots.txt", "sitemap.xml", "404.html", "CNAME", ".nojekyll"]) {
  check(`${file} present in _site/`, existsSync(join(site, file)));
}
check("CNAME still names the custom domain", (read("CNAME") || "").trim() === "openeduops.com");
check(
  "robots.txt declares the sitemap",
  (read("robots.txt") || "").includes(`Sitemap: ${SITE_URL}/sitemap.xml`)
);

/* ------------------------------------------------------ 2. routes exist - */
console.log("\nCanonical routes");
const routes = [
  "index.html",
  "tutorials/index.html",
  "moodle/index.html",
  "open-edx/index.html",
  "guides/index.html",
  "about/index.html",
  ...tutorials.filter((t) => t.detail_page).map((t) => `tutorials/${t.slug}/index.html`)
];
for (const route of routes) {
  check(`/${route.replace(/index\.html$/, "")} built`, existsSync(join(site, route)));
}

/* -------------------------------------------------------- 3. catalogue -- */
console.log("\nCatalogue");
const cataloguePage = read("tutorials/index.html") || "";
check(
  `exactly ${tutorials.length} tutorial cards render`,
  countOf(cataloguePage, 'class="tutorial-card"') === tutorials.length,
  `found ${countOf(cataloguePage, 'class="tutorial-card"')}`
);

const missingFromCatalogue = tutorials.filter((t) => !cataloguePage.includes(t.destination_probe ?? (t.detail_page ? `/tutorials/${t.slug}/` : t.youtube_url)));
check(
  "every record links to its real destination",
  missingFromCatalogue.length === 0,
  missingFromCatalogue.map((t) => t.slug).join(", ")
);

// Publication order, newest first.
const order = [...cataloguePage.matchAll(/data-platform="([a-z-]+)"/g)].map((m) => m[1]);
const expectedOrder = [...tutorials]
  .sort((a, b) => new Date(b.upload_date) - new Date(a.upload_date))
  .map((t) => t.platform_slug);
check("cards are in publication order, newest first", order.join() === expectedOrder.join());

check("filter controls are real buttons", countOf(cataloguePage, "<button") >= 6);
check("a clear-filters control exists", cataloguePage.includes("data-filter-clear"));
check("the result count is announced", cataloguePage.includes('id="catalogue-count"'));

/* ----------------------------------------------------- 4. platform hubs - */
console.log("\nPlatform hubs");
for (const [slug, expected] of [["moodle", 10], ["open-edx", 2]]) {
  const page = read(`${slug}/index.html`) || "";
  const steps = countOf(page, 'class="series-step"');
  check(`/${slug}/ renders ${expected} ordered steps`, steps === expected, `found ${steps}`);

  const inOrder = tutorials
    .filter((t) => t.platform_slug === slug)
    .sort((a, b) => a.sequence - b.sequence)
    .map((t) => page.indexOf(escapeHtml(t.title)));
  check(
    `/${slug}/ steps appear in learning order`,
    inOrder.every((at, i) => at !== -1 && (i === 0 || at > inOrder[i - 1]))
  );
}
check(
  "/open-edx/ is marked In progress",
  (read("open-edx/index.html") || "").includes("In progress")
);
check(
  "/open-edx/ carries no unpublished or coming-soon step",
  !/coming soon/i.test(read("open-edx/index.html") || "")
);

/* ----------------------------------------------------------- 5. guides -- */
console.log("\nCompanion guides");
const guidesPage = read("guides/index.html") || "";
const missingGuides = tutorials.filter((t) => !guidesPage.includes(t.guide_url));
check(
  `all ${tutorials.length} companion-guide links render`,
  missingGuides.length === 0,
  missingGuides.map((t) => t.slug).join(", ")
);
check(
  "no Gist content is copied into the site",
  !guidesPage.includes("<pre") && !guidesPage.includes("<code")
);

/* ------------------------------------------------------ 6. watch pages -- */
console.log("\nWatch pages");
for (const tutorial of tutorials.filter((t) => t.detail_page)) {
  const page = read(`tutorials/${tutorial.slug}/index.html`) || "";
  const label = tutorial.slug;
  check(`${label}: one embedded player`, countOf(page, "<iframe") === 1);
  check(`${label}: uses the locked nocookie embed URL`, page.includes(tutorial.embed_url));
  check(`${label}: no autoplay`, !page.includes("autoplay=1"));
  check(`${label}: iframe allows fullscreen`, page.includes("allowfullscreen"));
  check(`${label}: exactly one h1`, countOf(page, "<h1") === 1);
  check(
    `${label}: canonical matches the route`,
    page.includes(`<link rel="canonical" href="${SITE_URL}/tutorials/${tutorial.slug}/">`)
  );
  check(`${label}: verified thumbnail used for Open Graph`, page.includes(tutorial.thumbnail_url));
  check(`${label}: companion guide linked`, page.includes(tutorial.guide_url));
  check(`${label}: visible breadcrumbs`, page.includes('aria-label="Breadcrumb"'));
}

/* ------------------------------------------------------ 7. structured -- */
console.log("\nStructured data");
const htmlFiles = routes.map((route) => [route, read(route)]).filter(([, html]) => html);
let jsonBlocks = 0;
let badJson = [];

for (const [route, html] of htmlFiles) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const [, body] of blocks) {
    jsonBlocks += 1;
    try {
      const parsed = JSON.parse(body);
      if (!parsed["@context"] || !parsed["@type"]) badJson.push(`${route}: missing @context/@type`);
    } catch (error) {
      badJson.push(`${route}: ${error.message}`);
    }
  }
}
check(`all ${jsonBlocks} JSON-LD blocks parse`, badJson.length === 0, badJson.join("; "));

const homepage = read("index.html") || "";
check("homepage declares WebSite", homepage.includes('"@type": "WebSite"'));
check("homepage declares Organization", homepage.includes('"@type": "Organization"'));
for (const invented of ["address", "foundingDate", "telephone", "aggregateRating", "founder"]) {
  check(`homepage schema invents no ${invented}`, !homepage.includes(`"${invented}"`));
}
for (const omitted of ["contentUrl", "interactionStatistic", "hasPart"]) {
  const present = htmlFiles.some(([route, html]) => route.startsWith("tutorials/") && html.includes(`"${omitted}"`));
  check(`VideoObject omits ${omitted}`, !present);
}

/* -------------------------------------------------------- 8. sitemap --- */
console.log("\nSitemap");
const sitemap = read("sitemap.xml") || "";
const xmlOk = XMLValidator.validate(sitemap);
check("sitemap.xml is well-formed XML", xmlOk === true, xmlOk === true ? "" : JSON.stringify(xmlOk));

if (xmlOk === true) {
  const parsed = new XMLParser().parse(sitemap);
  const urls = [].concat(parsed.urlset.url).map((entry) => entry.loc);
  check("sitemap lists only openeduops.com URLs", urls.every((url) => url.startsWith(SITE_URL)));
  check("sitemap carries no filtered-query URL", urls.every((url) => !url.includes("?")));
  check("sitemap excludes the 404 page", urls.every((url) => !url.endsWith("404.html")));
  check(
    "sitemap covers every canonical page",
    urls.length === 6 + tutorials.filter((t) => t.detail_page).length,
    `found ${urls.length}`
  );
}

/* ------------------------------------------------- 9. release promises - */
console.log("\nRelease boundaries");
const allHtml = htmlFiles.map(([, html]) => html).join("\n") + (read("404.html") || "");
check("no page announces an unreleased video", !/coming soon|upcoming|next week/i.test(allHtml));
check("no analytics or third-party script tag", !/googletagmanager|plausible|clarity\.ms|google-analytics/i.test(allHtml));
check("no newsletter or account capture", !/newsletter|sign up|create an account/i.test(allHtml));
check(
  "small-text contrast token is not the failing grey",
  !readFileSync(join(site, "assets/css/site.css"), "utf8").includes("--text-meta:     #7d8a9c")
);

/* ------------------------------------------------------------ summary -- */
console.log(`\n${checks - failures}/${checks} checks passed.`);
if (failures) {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}
