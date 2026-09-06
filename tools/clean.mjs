/** Remove the build output so `npm run build` starts from nothing. */
import { rmSync } from "node:fs";

rmSync(new URL("../_site", import.meta.url), { recursive: true, force: true });
console.log("Removed _site/");
