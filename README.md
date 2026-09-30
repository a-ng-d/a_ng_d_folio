[![Netlify Status](https://api.netlify.com/api/v1/badges/828de808-a7b5-4f84-b033-05a5243251f5/deploy-status)](https://app.netlify.com/projects/a-ng-d/deploys)

# a_ng_d_folio

Personal portfolio that presents 7 years of professional and personal work through an immersive visit.
Take a glance at [www.an.gd](https://an.gd).

## Architecture

Vue 3 (TypeScript, Options API) + Vite single-page app, deployed on Netlify
from `dist/`. Routes, page theme and the generative 3D background ("the
glitchscape") are all driven from one place: each route's `meta`, built in
[`src/router/index.ts`](src/router/index.ts) via
[`src/router/scenery.ts`](src/router/scenery.ts).

The core design decision is that **content is data, not code**: a project or
an editorial page is a folder under `content/`, and its name is the slug —
nothing else references it. A custom Vite plugin,
[`build/vite-plugin-work-content.ts`](build/vite-plugin-work-content.ts),
reads every `content/work/*/index.<locale>.md` frontmatter at build/dev time,
validates it, and exposes it as a virtual module; `unplugin-vue-markdown`
compiles each project's Markdown body straight into a Vue component, using the
layout/pattern/ui components under [`src/components/`](src/components/)
(registered globally — never imported per project).

```
content/            editorial content: work/<slug>/, pages/<slug>/
src/
  router/            route list + page/scenery meta builders
  views/              one component per route
  content/            manifests & glob loaders reading the content/ folders
  components/         layouts/ patterns/ ui/ graphics/ — the shared vocabulary
  glitchscape/         the generative p5 background engine
  composables/         theme + scroll (provide/inject, no state library)
  utilities/           one small reactive store + misc helpers
build/                 the content → virtual module Vite plugin
public/                static assets, mirrored by slug under images/videos/animations
```

Full architecture notes, the voice/tone guide, the common layout vocabulary
and the step-by-step procedure for adding a project or page — written for an
AI coding assistant picking up this repo cold — live in
[`CLAUDE.md`](CLAUDE.md).

## Adding a project

A project is a folder under `content/work/`. Its name is the slug, and the slug
is written nowhere else — no route to declare, no component to register, no
translation key to invent.

```sh
mkdir content/work/_my_project        # the slug
# drop assets in public/images/_work/_my_project/
# write content/work/_my_project/index.en.md
# flip `published: true` when it is ready
```

`published: false` removes the route in production while keeping it reachable
in development, so a draft can be reviewed without being exposed. `order` only
sorts the carousel; inserting a project never renumbers the others.

Full procedure, frontmatter reference and authoring rules:
[`content/work/README.md`](content/work/README.md).

The written pages — the short bio and the attributions — work the same way,
under `content/pages/`: see [`content/pages/README.md`](content/pages/README.md).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
