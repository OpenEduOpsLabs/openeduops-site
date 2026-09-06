/**
 * Builds /assets/css/site.css from the ordered partials in ./parts.
 *
 * The stylesheet is authored in sections but shipped as one file, so the page
 * still makes a single CSS request. Add a partial by dropping a numbered file
 * into ./parts — the order is the filename order.
 */

import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const partsDir = join(dirname(fileURLToPath(import.meta.url)), "parts");

export default class {
  data() {
    return {
      permalink: "/assets/css/site.css",
      eleventyExcludeFromCollections: true
    };
  }

  render() {
    const files = readdirSync(partsDir)
      .filter((name) => name.endsWith(".css"))
      .sort();

    const banner =
      "/* OpenEduOps — openeduops.com\n" +
      "   Generated from src/assets/css/parts/. Edit the partials, not this file.\n" +
      `   Sections: ${files.join(", ")}\n` +
      "   ------------------------------------------------------------------- */\n\n";

    return banner + files.map((name) => readFileSync(join(partsDir, name), "utf8")).join("\n");
  }
}
