/**
 * External destination check.
 *
 * Verifies every outbound destination the site promises: every published
 * YouTube watch URL, both playlists, the available companion Gists, nocookie
 * embed URLs, verified thumbnails, and the three project surfaces.
 *
 * Needs network access. YouTube rate-limits and bot-checks automated requests,
 * so 429 and 403 are reported as RATE-LIMITED rather than counted as broken —
 * a rate-limited URL is unproven, not proven bad.
 *
 * Run with: npm run check:external
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tutorials = JSON.parse(readFileSync(join(root, "src/_data/tutorials.json"), "utf8"));
const site = JSON.parse(readFileSync(join(root, "src/_data/site.json"), "utf8"));

const targets = [
  ...tutorials.map((t) => ["video", t.youtube_url]),
  ...tutorials.filter((t) => t.guide_url).map((t) => ["guide", t.guide_url]),
  ...tutorials.filter((t) => t.detail_page).map((t) => ["embed", t.embed_url]),
  ...tutorials.filter((t) => t.detail_page).map((t) => ["thumbnail", t.thumbnail_url]),
  ...site.platforms.map((p) => ["playlist", p.playlistUrl]),
  ["project", site.external.youtube],
  ["project", site.external.github],
  ["project", site.external.x]
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function probe(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": UA, accept: "*/*" }
    });
    // Only the status line matters; do not download the body.
    await response.body?.cancel();
    return { status: response.status, url: response.url };
  } catch (error) {
    return { status: 0, error: error.name === "AbortError" ? "timeout" : error.message };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
for (const [kind, url] of targets) {
  const result = await probe(url);
  let verdict;
  if (result.status >= 200 && result.status < 300) verdict = "OK";
  else if (result.status === 429 || result.status === 403) verdict = "RATE-LIMITED";
  else if (result.status === 0) verdict = "UNREACHABLE";
  else verdict = "BROKEN";

  results.push({ kind, url, verdict, status: result.status, note: result.error || "" });
  console.log(
    `${verdict.padEnd(13)} ${String(result.status).padStart(3)}  ${kind.padEnd(9)} ${url}${result.error ? `  (${result.error})` : ""}`
  );
}

const tally = results.reduce((acc, r) => ({ ...acc, [r.verdict]: (acc[r.verdict] || 0) + 1 }), {});
console.log(`\n${results.length} destinations checked:`, tally);

const broken = results.filter((r) => r.verdict === "BROKEN");
if (broken.length) {
  console.error(`\n${broken.length} destination(s) returned an error status:`);
  broken.forEach((r) => console.error(`  ${r.status}  ${r.url}`));
  process.exit(1);
}

const unproven = results.filter((r) => r.verdict !== "OK");
if (unproven.length) {
  console.warn(
    `\n${unproven.length} destination(s) could not be proven from here (rate limit, bot check, or network).`
  );
  console.warn("Re-check these manually before treating them as broken.");
}
