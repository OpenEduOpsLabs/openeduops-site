# OpenEduOps Design System

> The single source of truth for how OpenEduOps looks, sounds, and ships — translated from the
> **OpenEduOps Brand & Production Style Guide v1.0** (June 2026) into reusable tokens, components,
> and kits.

---

## 1. Brand context

**OpenEduOps** is a YouTube channel (and growing practice) about **self-hosting open-source learning
platforms** — Moodle first, with Open edX, Canvas, and other open EdTech tools. It is a *practitioner*
channel: tutorials are taught by someone who installs, breaks, and ships these systems for real.

- **Channel:** youtube.com/@OpenEduOps
- **Focus:** Self-hosted open learning
- **Maintained by:** DreamOp · OpenEduOps
- **Who it's for:** Instructional designers, L&D specialists, small-institution admins, and freelancers
  who'd rather *control* their LMS than rent it. Technically curious, allergic to fluff, short on time.
- **The promise:** You leave each video able to *do the thing* — a working install, a fixed config,
  a launched course — not just nod along.

### Brand pillars
1. **Hands-on, not hand-wavy** — real terminals, real configs, real failure states.
2. **Open by default** — open-source tools, open methods, no gatekeeping. The name *is* the ethos: Open · Edu · Ops.
3. **Calm & precise** — the aesthetic of good documentation: structured, legible, unhurried. Signal over hype.
4. **Practitioner-to-practitioner** — spoken peer to peer, not lecturer to student.

### The mark, decoded
The logo spells **OEO** as a circuit: **nodes** (the dots) connected by **traces** (the strokes). It reads
as both a network topology and a learning path — discrete steps wired into a working system. This
**node-and-trace** motif is the channel's visual signature and recurs everywhere.

### Sources
- `uploads/OpenEduOps-Style-Guide.pdf` — the original 21-page brand & production guide (all rules below trace to it).
- No codebase, Figma file, or logo vector was provided. The OEO mark in `assets/` was **reconstructed
  from the guide's written description** of the node-and-trace circuit. **→ See CAVEATS at the bottom.**

---

## 2. CONTENT FUNDAMENTALS — voice & tone

The voice is the channel's real differentiator; protect it harder than any colour.

**Core stance:** Talk to a *competent peer who's short on time.* Direct, calm, specific, and honest about
trade-offs. No hype, no manufactured urgency, no "smash that like button" energy. The authority comes
from doing the work, so it never has to be claimed.

### Voice principles
- **Lead with the result.** Say what they'll be able to *do*, then how.
- **Name the trade-off.** Every choice has a cost — say it. That's what builds trust.
- **Precise, not padded.** Cut "basically", "simply", "just". If it were simple they wouldn't search for it.
- **Show the failure too.** The error state is the lesson; don't edit it out.
- **Plain over clever.** Specific beats witty every time.

### Mechanics
- **Person:** Second person ("you'll edit the config file…"). First person sparingly, peer-level.
- **Casing:** **Sentence case** for all headings and titles. ALLCAPS is reserved exclusively for **mono labels**
  (eyebrows, tags, metadata).
- **Emoji:** **Not used.** The guide explicitly contrasts the brand against "🔥"-style hype titles. Do not add emoji.
- **Technical terms:** Exact casing always — `systemctl` not "system control"; Moodle, Ubuntu, MariaDB, PHP.
  Anything a viewer would type goes in mono.

### Tone by context
| Context | Tone |
|---|---|
| Tutorial | Steady, instructional, second person — "you'll edit the config file…" |
| Troubleshooting | Reassuring + diagnostic — "this is common, here's why." |
| Titles | Concrete & literal. The promise, not the tease. |
| Comments | Generous, peer-level, never defensive. |

### We say / Not
- ✅ "Install Moodle 5.2 on Ubuntu 24.04 — start to finish."  ❌ "The ULTIMATE Moodle setup you NEED in 2026 🔥"
- ✅ "This breaks on PHP 8.3 — here's the fix."  ❌ "Easy fix, works every time, guaranteed!"
- ✅ "Self-hosting means you own the upgrade path — and the backups."  ❌ "Self-hosting is simple, anyone can do it!"
- ✅ "Skip this if you're on managed hosting."  ❌ "Make sure to watch till the end!"

**Title formula:** `[Action] + [Specific thing] + [Platform/Version]` → *"Install Moodle 5.2 on Ubuntu 24.04 (Full Guide)"*.
Front-load the keyword; version numbers earn search traffic; skip clickbait caps.

**One-line test:** If a sentence would sound fake said out loud to a colleague at the next desk, rewrite it.

---

## 3. VISUAL FOUNDATIONS

### Colour
Five colours, clear jobs — the discipline is in the **proportion (60 / 20 / 10 / 10)**, not adding more.

| Colour | Hex | Share | Job |
|---|---|---|---|
| Deep Navy | `#0B1F3A` | 60% | Primary ink — text, backgrounds, the mark |
| Mist | `#E8EEF4` | 20% | Surface — cards, panels, zebra rows |
| Signal Orange | `#FF6B35` | 10% | **Attention & identity** — nodes, highlights, *one* CTA |
| Open Teal | `#00C9A7` | 10% | **System & success** — terminal prompts, "done" states, light nodes |
| White | `#FFFFFF` | base | Paper — the breathing room everything sits on |

- **Orange vs teal — never interchangeable.** Orange = "look here" / the signature. Teal = machine/system/success.
- **Accessibility is law.** Orange and teal are **never text on white/light** — they only *fill* shapes, nodes, and
  bars there. Text on an orange or teal block is **always navy, never white**. Safe text combos: navy on white,
  navy on mist, white on navy, teal on navy, navy on teal, navy on orange.
- If a design feels loud, you've over-spent the accents.

#### Light & dark theming
Build against the **semantic aliases** (`--text-body`, `--surface-page`, `--surface-card`,
`--border-hairline`, …), never the raw base palette, and a component themes for free. The base
`:root` is the **light** theme; set **`data-theme="dark"`** on `<html>` or any container to flip the
aliases to dark surfaces (navy page, `--navy-90` elevated cards) with mist ink. A pinned
`data-theme="light"` stays light even inside a dark ancestor. Theming is **explicit opt-in** — set the
attribute to switch, and wrap any subtree in its own `data-theme` to mix the two on one page.
**Orange (identity) and teal (system) hold across both themes**, and text on an
accent block is navy in both. Logo marks ship `-light` (navy strokes) and `-dark` (mist strokes) to
match. See the *Light & dark theme* card under Colors.

### Type
All open-source, embeddable, free for commercial use. Three families:
- **Space Grotesk** (display) — headings, titles, thumbnails. Weights 500/600/700. Just enough mechanical
  character to echo the circuit mark.
- **Inter** (body) — narration, captions, documents. Weights 400/500/600. Disappears so content leads.
- **JetBrains Mono** (mono) — code, terminal, file paths, labels. Weights 400/500/700. Disambiguated `il1 / O0`.

Rules: *Display sets the tone, body does the work.* Don't set long copy in Space Grotesk. **Mono means machine** —
only things the viewer would type/see in a terminal. Two weights per surface, max. Sentence case headings.
Sanctioned single-family fallback: **IBM Plex** (Sans + Mono) — pick one system per era, don't mix.

### Spacing & layout
- 4px-based spacing scale (`--space-1`…`--space-8`). Generous, documentation-like rhythm — unhurried.
- Readable measure for prose: ~68ch. Page max ~1200px.
- **Title-safe area:** keep titles, lower-thirds, and critical UI inside a **5% inset** (video furniture).

### Backgrounds
- Light surfaces: **white** primary, **mist** for cards/panels/zebra rows. Flat — no busy textures.
- Dark surfaces: **deep navy**, often with a **subtle radial gradient** (lighter top-right) — this is the
  thumbnail base. Code panels are a darker near-black navy (`--code-bg #07172c`).
- No photographic full-bleed backgrounds by default; imagery is screen-recordings of real terminals/UI.
- Decorative motif: **node-and-trace** lines drawn from the mark (orange node + thin trace) — used as
  underlines, callout pointers, and lower-third bars. **Never** clip-art red arrows or shock graphics.

### Corner radii & cards
- Restrained rounding that echoes the soft geometric mark: `--radius-sm 6px` (chips/inputs),
  `--radius-md 10px` (buttons/cards), `--radius-lg 16px` (panels/code blocks), pill for tag chips.
- **Cards:** white (or mist) fill, hairline navy-15 border *or* a soft shadow — not both heavy. Rounded
  `--radius-md`. Code blocks: dark panel, rounded `--radius-lg`, **soft shadow, never full-bleed**.

### Shadows
- Soft and single-layered. `--shadow-sm/md/lg` for elevation on light; `--shadow-code` for terminal panels.
- **Never** stacked shadows + glows. The logo never gets a shadow, glow, gradient, or outline.

### Borders
- Hairline `1px` navy-15 for dividers/cards on light. `2px` navy for strong/selected. `3px` orange
  **node-bar** for lower-third accents.

### Motion
- **Calm and mostly static.** The watermark never moves (no spin, pulse, fly-in). UI motion is subtle
  **fades** and short transitions (`--dur-fast 120ms`, `--dur-base 200ms`, standard ease). No bounces,
  no infinite decorative loops.

### Hover / press states
- **Hover:** slight darken of fills (or a mist wash on ghost elements); never a colour swap. Links/ghost
  buttons may raise opacity/contrast subtly.
- **Press:** a touch darker, optional 1px nudge — no large scale/shrink, no springy bounce.

### Transparency & blur
- Used sparingly and functionally: lower-third navy panels at ~92% opacity over footage; burned-in caption
  pills at ~86% navy. Watermark opacity 45–60%. Blur is not a brand motif.

### Imagery vibe
- Cool, technical, high-contrast. Real screen recordings and terminals; near-black code themes; brand
  hexes matched in graphics (Rec.709 / sRGB). No warm filters, no grain, no stock-photo gloss.

---

## 4. ICONOGRAPHY

The guide ships **no icon font or icon set** of its own — the only proprietary glyph is the **OEO
node-and-trace mark**. The visual language for "pointing at things" is the brand motif itself: an
**orange node + thin trace line** to the UI element (callouts), never a clip-art red arrow, and **one
highlight on screen at a time.**

- **System chosen:** [**Lucide**](https://lucide.dev) (CDN) — clean, consistent 2px-stroke open-source
  outline icons that match the calm, documentation aesthetic and the geometric weight of Space Grotesk.
  Load from CDN: `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`.
  **→ This is a substitution (see CAVEATS); swap for the channel's own set if one exists.**
- **Stroke style:** outline, ~2px, rounded joins — matches the mark's stroke treatment. Don't mix filled
  and outline icon families.
- **Colour:** icons inherit text colour (navy on light, mist/white on dark). Accent an icon orange only
  to mean "identity/attention", teal only to mean "system/success" — same rules as everywhere.
- **Emoji:** **never** used as icons or anywhere in the brand. No unicode-emoji decoration.
- **Logo / brand glyphs:** in `assets/` — **SVG is the master vector** (traced from the user's
  2048² PNG), with PNG rasters alongside. `logo-lockup-*`, `logo-mark-*`, `avatar.png`, each in
  **light** (navy strokes, for light grounds) and **dark** (mist strokes, for dark grounds); orange
  `#FF6B35` nodes in both. Use the supplied files; never screenshot or re-export the mark.

---

## 5. Index / manifest

**Root**
- `styles.css` — global entry point (consumers link this). `@import` manifest only.
- `readme.md` — this file.
- `SKILL.md` — Agent-Skills-compatible front-matter wrapper.
- `uploads/OpenEduOps-Style-Guide.pdf` — original source guide.

**`tokens/`** — CSS custom properties (`@import`ed by `styles.css`)
- `fonts.css` · `colors.css` · `typography.css` · `spacing.css`

**`assets/`** — brand marks. **SVG is the master** (true vector, traced from the user's 2048² PNG);
PNG rasters are provided for tools that can't take SVG. Each comes in **light** (for light grounds:
navy `#0E2034` strokes) and **dark** (for dark grounds: mist `#E8EEF4` strokes); orange `#FF6B35`
nodes in both.
- `logo-lockup-{light,dark}.svg` · `.png` — full OEO mark + “OpenEduOps” wordmark
- `logo-mark-{light,dark}.svg` · `.png` — mark only (no wordmark); also the on-video watermark at 45–60%
- `avatar.png` — mark on a navy circle (profile/channel badge)

**`components/`** — reusable React primitives (see each `.prompt.md`)
- `core/` — Button, Tag, Badge, Card, CodeBlock, Callout, Input, Eyebrow, Lockup, …

**`ui_kits/`** — full-screen recreations
- `youtube-channel/` — channel page, video watch page, thumbnail system

**`slides/`** — 7 branded slide templates (title, section, agenda, step+terminal, comparison, quote, closing)

**Foundation specimen cards** — small `@dsCard`-tagged HTML files across `tokens/`, `assets/`, etc.,
rendered in the Design System tab (groups: Colors, Type, Spacing, Brand).

---

## CAVEATS — please help me get this perfect

1. **The OEO logo is reconstructed, not official.** No logo vector was supplied, so I rebuilt the
   node-and-trace mark from the guide's written anatomy (two rings + a stylised E, orange/teal nodes).
   **Please drop the official transparent vector into `assets/` so I can replace it.**
2. **Space Grotesk & JetBrains Mono are now self-hosted** (`assets/fonts/`, user-supplied `.ttf`).
   **Inter still loads from the Google Fonts CDN** — send the Inter `.ttf` and I'll self-host it too.
3. **The logo is still the reconstructed SVG.** You have a PNG, not a vector — upload the highest-res
   transparent PNG and I'll wire it into `assets/` and the cards/kits, or vectorize it from the PNG.
3. **Icons are Lucide (a substitution).** The guide defines no icon set, so I picked the closest open
   outline family. Tell me if you'd prefer another (e.g. Phosphor, Heroicons) or have your own.
