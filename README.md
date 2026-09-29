[![Netlify Status](https://api.netlify.com/api/v1/badges/828de808-a7b5-4f84-b033-05a5243251f5/deploy-status)](https://app.netlify.com/projects/a-ng-d/deploys)

# a_ng_d_folio

Personal portfolio that presents 7 years of professional and personal work through an immersive visit.
Take a glance at [www.an.gd](https://an.gd).

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
