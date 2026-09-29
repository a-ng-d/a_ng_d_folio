# Editorial page content

The site's written pages — the short bio and the attributions — keep their
content here, one file per page.

```
content/pages/short/
  index.en.md       the page's content
  CareerEntry.vue   components this page alone needs
  CareerRole.vue
```

A page is lighter than a project. It has no `published`, no `order`, no tint
and no thumbnail: its route is declared by hand in `src/router/index.ts`, and
only its content lives here. There is no frontmatter — the file starts with its
first section.

Adding a page means declaring its route, creating
`content/pages/<slug>/index.en.md`, and reading it from the view with
`pageBody('<slug>')`. Two views do exactly that today: `src/views/Short.vue`
and `src/views/Attribution.vue`.

## Writing

Same rules as a project body, documented in
[`../work/README.md`](../work/README.md): sections open with `::: section`,
layout components are available without importing anything, a component tag
must fit on one line, and a blank line closes an HTML block.

Adding a talk, a workshop or an attribution is now one line:

```html
<SimpleExternalLink label="The talk's name" href="https://…" alt="…" />
```

It used to take a key in `en.json` and a matching entry in an array inside the
component — two files, kept in step by hand.

## Page titles

The title in the browser tab and in the menu stays in
`src/lang/locales/en.json`, under `id.title` and `attribution.title`. That is
site furniture rather than page content, and the router reads it when it builds
the route.
