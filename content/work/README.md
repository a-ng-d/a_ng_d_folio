# Project content

A project is a folder. Its name is the slug, and the slug is written nowhere
else — not in a route, not in a translation file, not in a component registry.
Add a folder and the project exists; delete it and the project is gone.

```
content/work/_my_project/
  index.en.md      required — the project's identity and its body
  index.fr.md      later — translations override the text, nothing else
  animation.json   the carousel thumbnail, when it is a Lottie
  Ending.vue       optional — anything Markdown cannot express
```

## Adding a project

1. Create `content/work/<slug>/` — use the same `_snake_case` name you will use
   for its assets.
2. Drop its images in `public/images/_work/<slug>/`, and its videos in
   `public/videos/_work/<slug>/`.
3. Put the carousel thumbnail in the folder: `animation.json` for a Lottie,
   or an image file.
4. Write `index.en.md` — copy the frontmatter below, then the body.
5. Set `published: true` when it is ready.

Nothing else. No route to declare, no component to register, no translation key
to invent.

## Enabling and disabling

`published` is the only switch.

| Value   | In production                           | In development                                                             |
| ------- | --------------------------------------- | -------------------------------------------------------------------------- |
| `true`  | Live: routed, and shown in the carousel | Same                                                                       |
| `false` | **No route at all** — the URL 404s      | Routed and reachable, so you can review it; still absent from the carousel |

A draft is genuinely off in production. It is not merely hidden behind a filter
while its URL stays open, which is how the previous system behaved.

## Ordering

`order` sorts the carousel, nothing more. The position you see on the page is
derived from the sort, never written by hand.

Gaps are fine — `0, 10, 20` leaves room to insert later. Ties are broken by
slug, so nothing jumps around unpredictably. **Inserting a project never
requires renumbering the others.**

## Frontmatter

```yaml
---
published: true
order: 3
theme: DEFAULT # or DARK

title: '_my_project@:global.separator@:global.author'
shortTitle: _my_project
summary: One line, shown on the carousel card
description: >-
  The opening paragraph of the project page. Fold it across
  several lines with `>-`; it is joined back into one.
date: "{'2024'}@:global.separator{'Released'}"
type: '@:global.type.product@:global.separator@:global.type.side'
objectives:
  - What the project set out to do
  - Another objective
roles:
  - What you did on it

illustration: animation.json
backgroundImage: 'none' # or a full CSS `background` shorthand

tint: # colours the 3D scene behind the project page
  hue: '210deg'
  brightness: '1'
  invert: '0'
  saturation: '1'
  grayscale: '0%'
  name: '_MY_PROJECT'
---
```

Every text field is required: the build stops and names the missing field
rather than rendering an empty page.

`@:some.key` pulls a value from `src/lang/locales/en.json`, and `{'literal'}`
is text kept as is. Use them for anything that belongs to the site rather than
to the project — separators, the author's name, the type vocabulary.

A `scenery:` block may override the 3D backdrop. Leave it out and the project
uses the default all projects currently share.

## Writing the body

The Markdown compiles to a Vue component. These layout components are available
without importing anything:

`OneColumn` · `TwoColumns` · `ThreeColumns` · `WrapColumn` · `FullWidthFigure` ·
`Figure` · `ContentContainer` · `LinkContainer` · `SimpleExternalLink` ·
`Label` · `Button`

Sections open with `:::` and a name:

```md
::: challenge
Plain prose, written as Markdown.
:::

::: section
<TwoColumns title="How it works">
<template #left>

A paragraph. A blank line separates it from the tag above.

- a list item
- another

</template>
<template #right>
<Figure src="/images/_work/_my_project/article-asset-1.webp" alt="…" />
</template>
</TwoColumns>
:::
```

`section` is a plain one. `challenge`, `success`, `credit`, `takeaways` and
`ending` each carry their own background. **Section order matters**: unnamed
ones are striped by rank.

### Two rules that will bite you

1. **A component tag must fit on one line.** Split across lines, Markdown stops
   recognising it as HTML and prints it as text.
2. **A blank line closes an HTML block.** Leave one where you want Markdown
   prose; leave none between two component tags.

## Images

Declare no `width` and no `height`. The build measures every image in
`public/images` and the figure reads its own ratio from the file. Nothing is
transcribed, so nothing can drift out of sync.

To impose a frame instead of following the file's own ratio, use `ratio`:

```md
<Figure src="…" ratio="wide" />
<!-- square landscape wide ultrawide -->
<Figure src="…" ratio="16 / 10" />
<!-- panorama portrait tall, or any CSS -->
```

Videos cannot be measured at build time, so they keep explicit `:width` and
`:height`.

## Theme

`theme:` in the frontmatter sets the page's theme for the whole body — every
themed component (`Figure`, the layout components, `Button`…) picks it up on
its own, with no prop to write. That is what lets a plain

```md
<Figure src="…" alt="…" />
```

follow DEFAULT or DARK depending only on the project it is in.

To break from the page's theme for a single component — a dark screenshot
dropped into an otherwise DEFAULT page, say — pass `theme` on that one tag:

```md
<Figure src="…" alt="…" theme="DARK" />
```

Leave it out everywhere else; the page's theme still reaches them normally.

## When Markdown is not enough

Put a `.vue` file beside the content and import it from a `<script setup>`
block. That is where parallax, Lottie animations, remote data and per-project
styles live.

```md
<script setup lang="ts">
import Ending from './Ending.vue'
import { useScroll } from '@/composables/scroll'

const { parallax } = useScroll()
</script>
```

Worked examples: `_jeprendsquoi/Ending.vue` stacks twelve parallax layers,
`_ui_color_palette/index.en.md` fetches live plugin statistics, and
`_jean_bobby_radio` does both.

## Translations

`index.en.md` is the base file and carries the configuration. A future
`index.fr.md` only needs the translatable text and its body; everything else is
inherited. The manifest already records which locales a project has, and falls
back to the base one.
