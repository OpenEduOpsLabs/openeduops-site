/**
 * Internal link check over the built site.
 *
 * Walks every generated HTML page and resolves each same-site href and src
 * against _site/. Fragments are resolved against the target page's ids, so a
 * link to /tutorials/#catalogue fails if that anchor stops existing.
 *
 * Run with: npm run check:links   (after npm run build)
 */

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, posix } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "_site");
const SITE_URL = "https://openeduops.com";

/* --------------------------------------------------------------- walking - */
function walk(dir) {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : [full];
  });
}

const files = walk(site);
const pages = files.filter((file) => file.endsWith(".html"));

/** _site/tutorials/index.html -> /tutorials/ */
function routeOf(file) {
  const relative = file.slice(site.length).split("\\").join("/");
  return relative.endsWith("/index.html") ? relative.slice(0, -"index.html".length) : relative;
}

/** Every id on a page, so fragments can be verified. */
const idsByRoute = new Map();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  idsByRoute.set(routeOf(page), ids);
}

/** Does a root-relative path exist in the output? */
function resolves(pathname) {
  const clean = pathname.split("?")[0];
  const candidates = clean.endsWith("/")
    ? [join(site, clean, "index.html")]
    : [join(site, clean), join(site, clean, "index.html")];
  return candidates.some((candidate) => existsSync(candidate) && statSync(candidate).isFile());
}

/* -------------------------------------------------------------- checking - */
const broken = [];
const externalHosts = new Map();
let internalLinks = 0;

for (const page of pages) {
  const from = routeOf(page);
  const html = readFileSync(page, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);

  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, "&");

    if (ref.startsWith("mailto:") || ref.startsWith("tel:") || ref.startsWith("data:")) continue;

    // Absolute URLs: canonical/OG values pointing at this site are checked as
    // internal; everything else is counted as an external host and reported.
    if (/^https?:\/\//.test(ref)) {
      if (ref.startsWith(SITE_URL)) {
        const url = new URL(ref);
        internalLinks += 1;
        if (!resolves(url.pathname)) broken.push(`${from} -> ${ref} (absolute self-link)`);
      } else {
        const host = new URL(ref).host;
        externalHosts.set(host, (externalHosts.get(host) || 0) + 1);
      }
      continue;
    }

    // Same-page fragment.
    if (ref.startsWith("#")) {
      internalLinks += 1;
      const id = decodeURIComponent(ref.slice(1));
      if (!idsByRoute.get(from)?.has(id)) broken.push(`${from} -> ${ref} (missing id)`);
      continue;
    }

    const target = ref.startsWith("/") ? ref : posix.join(posix.dirname(from), ref);
    const [pathname, fragment] = target.split("#");
    const [cleanPath] = pathname.split("?");

    internalLinks += 1;
    if (!resolves(cleanPath)) {
      broken.push(`${from} -> ${ref} (no such file)`);
      continue;
    }
    if (fragment) {
      const targetRoute = cleanPath.endsWith("/") ? cleanPath : `${cleanPath}/`;
      const ids = idsByRoute.get(targetRoute) || idsByRoute.get(cleanPath);
      if (ids && !ids.has(decodeURIComponent(fragment))) {
        broken.push(`${from} -> ${ref} (missing id on target)`);
      }
    }
  }
}

/* --------------------------------------------------------------- report -- */
console.log(`Checked ${internalLinks} internal references across ${pages.length} pages.\n`);

console.log("External hosts referenced:");
for (const [host, count] of [...externalHosts].sort()) {
  console.log(`  ${String(count).padStart(3)}  ${host}`);
}

if (broken.length) {
  console.error(`\n${broken.length} broken internal reference(s):`);
  broken.forEach((entry) => console.error(`  ${entry}`));
  process.exit(1);
}

console.log("\nNo broken internal references.");
