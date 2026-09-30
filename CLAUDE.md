# CLAUDE.md

Guidance for Claude Code (or any other session) working in this repository.

## What this is

`a_ng_d_folio` is a personal portfolio: a single-page Vue 3 application that
presents work as a set of case-study "projects," reachable through an
immersive, generative 3D background (the "glitchscape") rather than a plain
document layout. It is content-driven — adding a project or an editorial page
means adding files under `content/`, not writing code.

Live at [www.an.gd](https://an.gd), deployed on Netlify from `dist/`
(`npm run build`, Node 22 — see `.nvmrc` and `netlify.toml`).

## Stack

- **Vue 3** (Options API, `defineComponent`, not `<script setup>` for
  components with real logic — `<script setup>` is reserved for content
  `.vue` files, see below) + **TypeScript**.
- **Vite 7**, with two custom pieces doing the content work:
  - `build/vite-plugin-work-content.ts` — reads `content/work/*/index.<locale>.md`
    frontmatter at build/dev time and exposes it as `virtual:work-content`,
    plus `virtual:asset-sizes` (every image under `public/images` measured
    once, so `<Figure>` never needs a hand-written `width`/`height`).
  - `unplugin-vue-markdown` — compiles each project's Markdown body straight
    into a Vue component, with custom `markdown-it-container` blocks
    (`section`, `challenge`, `success`, `credit`, `takeaways`, `ending`)
    registered in `vite.config.ts`.
- **vue-router 4** — routes are generated, not hand-listed, for projects (see
  below). Route `meta` is the single source of truth for a page's title,
  theme, and 3D "scenery."
- **vue-i18n 9** — UI strings live in `src/lang/locales/en.json`. Content
  frontmatter and body can pull from it with a small DSL (see *Content →
  translation DSL* below).
- **p5.js**, wrapped in `src/glitchscape/`, drives the generative background.
- **Sass** design tokens (`src/assets/stylesheets/_tokens.sass`) — colors as
  `--color-*` (backed by `--hsl-*` + `--alpha`), spacing as `--spacing-*`, plus
  duration/easing tokens for the transition system.

## Directory map

```
content/            The actual editorial content — see "Adding content" below
  work/<slug>/       one folder per project (the slug is never written elsewhere)
  pages/<slug>/      one folder per editorial page (bio, attributions)

src/
  App.vue            root shell: menu, page transitions, glitchscape background, audio
  main.ts             boot sequence — intro loader, then mounts the app
  router/
    index.ts          hand-written routes for static views + one generated
                       route per published/dev-visible project
    scenery.ts         `page()`/`scenery()` helpers that build `RouteMeta`
  views/               one component per route (Home, Work, Project, Short, …)
  content/             the *code* side of content: manifests, glob loaders
    types.ts           `WorkProject` shape (mirrors the frontmatter contract)
    work.ts            reads `virtual:work-content`, exposes lookups
    pages.ts           reads editorial page bodies
    components.ts      registers layout/pattern/ui components globally so
                        Markdown bodies can use them with no import
    assets.ts           `naturalRatio()` from `virtual:asset-sizes`
  components/
    layouts/            OneColumn, TwoColumns, ThreeColumns, WrapColumn,
                        FullWidthFigure — the section-level grid primitives
    patterns/           Figure, ContentContainer, LinkContainer, Header,
                        Footer, Awards — composed from layouts + ui
    ui/                 Button, Label, SimpleExternalLink, RichExternalLink,
                        Switch, Dropdown, Navigation, ScrollingText, Audio…
    graphics/           Glitchscape.vue (p5 canvas host), Particles, Logotype,
                        cursor.ts, loader.ts
  glitchscape/         the generative background engine (p5, framework-free):
                        dispositions (terrain shapes), flow (camera motion),
                        universes (palettes per scene), lighting, profiles
  composables/         theme.ts and scroll.ts — provide/inject, not Pinia/Vuex
  utilities/           store.ts (one small reactive global store), colors.ts,
                        operations.ts, weather.ts, easings.ts, types.ts
  lang/                vue-i18n setup + src/lang/locales/en.json

build/                 build/vite-plugin-work-content.ts — the content pipeline
public/                static assets, mirrored by slug: images/_work/<slug>/,
                        videos/_work/<slug>/, animations/_work/<slug>/
```

## How a page is assembled

1. `src/router/index.ts` builds the route list. Static views (`Home`,
   `Short`, `Work`, `Lab`, `Contact`, `Attribution`, …) are declared by hand.
   Project routes are generated: `...routableProjects().map(...)` turns every
   folder in `content/work/` into a route at `/_work/<slug>`, with no
   per-project code.
2. Every route's `meta` is built with `page({ ...scenery({...}) })`
   (`src/router/scenery.ts`). `meta` carries everything the shell needs: the
   document title, the page `theme` (`DEFAULT`/`DARK`), and the `scenery`
   (which glitchscape `disposition`, `flow`, ambience/color filter, and
   quality to render behind the page).
3. `App.vue` watches `$route`, updates `document.title`, resolves the
   transition name from a `{from} > {to}` lookup table, and feeds `scenery`
   into `<Glitchscape>` — the 3D background is a side effect of navigation,
   not something a view manages itself.
4. A view like `Project.vue` reads its own body via
   `getProject(route.meta.codeName)` → `bodyOf(project)`, and renders it as
   `<Component :is="body">` — the compiled Markdown *is* a Vue component.

## Content: the folder-is-the-truth model

This is the most important architectural decision in the repo and it must be
preserved by anything you build:

> **A project or page is a folder. Its name (the slug) is never written a
> second time** — no route to declare, no component to register, no
> translation key to invent. Add the folder and it exists; delete it and it's
> gone.

Two content kinds, two rulebooks already written — **read them before
touching content**, do not improvise from this summary:

- [`content/work/README.md`](content/work/README.md) — projects: frontmatter
  reference, `published`/`order` semantics, section containers, image rules,
  theming, translation DSL, when to drop in a `.vue` file.
- [`content/pages/README.md`](content/pages/README.md) — editorial pages
  (bio, attributions): lighter than a project (no frontmatter, no `published`,
  route declared by hand), same body-writing rules.

Skeleton of the full authoring contract (detail is in the two files above):

```
content/work/<slug>/
  index.en.md       required — frontmatter + body, source of truth
  index.fr.md        later — text only, everything else inherited
  animation.json     carousel thumbnail (Lottie) — or an image file instead
  Ending.vue          optional — anything Markdown can't express

public/images/_work/<slug>/   …/videos/_work/<slug>/
src/assets/animations/_work/<slug>/animation.json   (if the illustration is a Lottie)
```

`build/vite-plugin-work-content.ts` validates every frontmatter field at
build time and **fails the build with the missing field named** rather than
shipping an empty section — do not work around a validation failure by
guessing a value; fix the source field.

### Translation DSL (frontmatter + generated route text only)

- `@:some.key` — pulled from `src/lang/locales/en.json` at route-build time.
- `{'literal text'}` — kept as-is.
- Use these for anything that belongs to the *site* (separators, the type
  vocabulary, the author's name) — never for content that belongs to the
  project itself, which is just plain text.

## Voice and tone

There is no separate style guide file; the voice lives in the content itself.
Match it — read one full project (`content/work/_axeptio_gusto/index.en.md`
is representative) and the bio (`content/pages/short/index.en.md`) before
writing new copy.

- **First person, past tense, concrete.** "I analyzed the existing ecosystem,
  created missing components…" — never third person, never marketing
  copy ("we leverage synergies…").
- **Case-study arc, not a feature list.** Each project reads: what the
  company/problem was → what the investigation found → what was built/changed
  → how it was communicated/rolled out → outcome and what's left. This maps
  directly onto the section containers (`challenge` → plain `section`s →
  `credit` → `takeaways`).
- **Specific over impressive.** Real team sizes, real durations, real
  constraints ("Due to privacy restrictions, the report cannot be shared —
  here is an extract"), not vague superlatives.
- **Every image earns a caption.** Captions explain *why the image matters*,
  not just what it is — they're read on their own as often as inline.
- **`alt` text is mandatory and descriptive**, written for someone who can't
  see the image, not a repeat of the caption.
- **Short section titles, sentence case**, framed as a small insight rather
  than a label: "The products in between world," "A place for transparency,"
  "A traced path to legacy" — not "Overview" or "Process."
- The bio page is looser and more personal (emoji, informal asides, bilingual
  flourish "你好 nǐ hǎo (hello)!") — that register is specific to
  `content/pages/short/`, don't carry it into project case studies.

## Common layout (what a project body is built from)

Registered globally for Markdown bodies (`src/content/components.ts` —
never import these inside a content file):

| Component | Purpose |
|---|---|
| `OneColumn` / `TwoColumns` / `ThreeColumns` / `WrapColumn` | Section-level grids. `title` renders an `h3` (`h4` on `WrapColumn` with `isSubSection`). `TwoColumns` takes `layout` (`"1_1"`, `"2_1"`, `"A_1"`, …) for asymmetric splits. |
| `FullWidthFigure` | Edge-to-edge image/media break between sections. |
| `Figure` | The image/video primitive. Never pass `width`/`height` for images — the build measures the file and `ratio` derives from it automatically; pass `ratio` only to *impose* a frame (`"wide"`, `"square"`, `"16 / 10"`, …). Videos keep explicit `:width`/`:height` since they can't be measured at build time. |
| `ContentContainer` | Small title + description block, used for the overview grid (date, type, objectives, roles) and inside `WrapColumn` credit grids. |
| `LinkContainer` | Icon + description + CTA button, used in `takeaways`. |
| `SimpleExternalLink` / `RichExternalLink` | Outbound link rows/cards (talks, articles, socials). |
| `Label` | Inline highlighted term inside prose. |
| `Button` | `type` (`primary`/`secondary`), `layout` (`SIMPLE`/`ICON-LEFT`/`ICON-ONLY`), used for CTAs and pagination. |

A project body is conventionally sections in this order — enforced by
convention, not code, but breaking it will look wrong against every other
project on the site:

```
::: challenge     — the problem, in one OneColumn
::: section       — one or more, the investigation/build narrative
::: section
::: credit        — WrapColumn of ContentContainer, who worked on it
::: takeaways     — OneColumn of LinkContainer, where to see more
```

Two Markdown gotchas that will silently break a body (documented in
`content/work/README.md`, repeated here because they're easy to trip on):
a component tag must fit on one line, and a blank line closes an HTML block
(no blank line between two component tags; leave one to drop into prose).

Theming: set `theme:` once in frontmatter (`DEFAULT`/`DARK`) and every themed
component in the body picks it up automatically via provide/inject
(`src/composables/theme.ts`) — never thread a `theme` prop through every tag
by hand; override on a single tag only for a deliberate exception.

## Procedure: adding a new project

This is the operational version of what's above — follow it in order.

1. Pick a slug in `_snake_case` (e.g. `_my_project`) and create
   `content/work/_my_project/`.
2. Drop assets: images in `public/images/_work/_my_project/`, videos in
   `public/videos/_work/_my_project/`, and — if the carousel thumbnail is a
   Lottie — `src/assets/animations/_work/_my_project/animation.json`
   (otherwise a plain image file referenced by `illustration:` works too).
3. Write `content/work/_my_project/index.en.md`: copy the frontmatter block
   from `content/work/README.md` field-for-field, fill every text field (the
   build refuses to run with any missing), then write the body following the
   voice guide and the section order above.
4. If something in the body needs logic Markdown can't express (parallax,
   live data fetch, per-project styling), add `content/work/_my_project/Ending.vue`
   (or any name) and `<script setup>` import it from the Markdown file —
   worked examples: `_jeprendsquoi/Ending.vue`, `_ui_color_palette/index.en.md`.
5. Run `npm run dev` and open `/_work/_my_project` directly — with
   `published: false` the route exists in dev (not in production) so the
   draft can be reviewed before it's live or listed in the carousel.
6. Set `order` (gaps like `0, 10, 20` are fine and expected — inserting a
   project later should never require renumbering the others) and flip
   `published: true` when ready.
7. Nothing to register anywhere else: no router edit, no i18n key, no
   component import. If you find yourself editing a file outside
   `content/work/_my_project/` and `public/*/_work/_my_project/` to make the
   project appear, something's off — stop and re-check the manifest
   validation error instead of hand-patching state.

For an editorial page (bio-style, not a project) use
[`content/pages/README.md`](content/pages/README.md) instead — it additionally
requires declaring the route by hand in `src/router/index.ts` and reading the
body from the view with `pageBody('<slug>')`.

## Conventions to preserve

- **Options API for real components**, `<script setup>` only inside content
  `.vue` files (`Ending.vue` and friends) — don't introduce Composition API
  `<script setup>` in `src/components/` or `src/views/` without a reason tied
  to what those files actually need.
- **No state library.** Cross-cutting UI state is one `reactive()` object
  (`src/utilities/store.ts`); page-local shared state (theme, scroll
  position) is plain Vue `provide`/`inject` via the composables in
  `src/composables/`. Don't add Pinia/Vuex for a new feature — extend the
  existing store or add a composable in the same style.
- **Content is data, not code.** Any change that makes "adding a project"
  require touching `src/` again (a new route per project, a new i18n key per
  project, a component registry entry per project) is a regression of the
  core design — resist it, and prefer extending the frontmatter contract or
  the manifest plugin instead.
- **Images are measured, never hand-described.** Don't add `width`/`height`
  to a new content image — extend `virtual:asset-sizes` / `Figure` if a new
  measurement need comes up.
- **Assets mirror slugs.** `public/images/_work/<slug>/`,
  `public/videos/_work/<slug>/`, `src/assets/animations/_work/<slug>/` — keep
  new asset folders under the same slug, don't introduce a different
  layout convention.
