---
published: true
order: 0
theme: DEFAULT

title: '_ui_color_palette@:global.separator@:global.author'
shortTitle: _ui_color_palette
summary: 'Accessible color palettes with consistent lightness, on every design tool'
description: >-
  Figma is a UX tool, using diagrams to build user experiences, interfaces,
  prototypes, illustrations, etc. The tool can be extended with a plugin system.
  By reading this article (Accessible Palette: stop using HSL for color
  systems), I noticed there was no plugin on Figma to help build accessible
  color systems for UI. The opportunity was to develop a tool to create, edit
  and deploy color palettes. Four years later, that plugin has become a
  cross-platform mini-app: the same product now runs on Figma, Penpot, Sketch
  and Framer, answers to AI agents through an API and an MCP server, and is
  used by designers in more than 130 countries.
date: "{'Since 2022'}@:global.separator{'Monthly release'}"
type: '@:global.type.product@:global.separator@:global.type.side'
objectives:
  - 'Creating UI color palettes with consistent lightness and contrast'
  - 'Updating and deploying colors with ease to the team library'
  - 'Running one product on every design tool, and now on AI agents'
roles:
  - 'Designing and developing the apps on Figma/Penpot/Sketch/Framer (TypeScript)'
  - 'Defining the long-term strategy'
  - 'Planning and scheduling tasks/improvements/requests'
  - 'Handling user interactions (support/interview/feedback)'

illustration: animation.json
backgroundImage: 'none'

tint:
  hue: '128deg'
  brightness: '1'
  invert: '0'
  saturation: '.55'
  grayscale: '0%'
  name: '_UI_COLOR_PALETTE'
---
<script setup lang="ts">
import { Users, Heart, Bookmark, Globe, Figma, Github, Pointer } from 'lucide-vue-next'
</script>

::: challenge

<OneColumn title="Make UI color palettes with a perceptual color model">
<template #plain>

The plugin generates every shade with a perceptual color model — LCH at the start, OKLCH today — so the chosen lightness scale means the same thing for every hue.

It works like the HSL (Hue-Saturation-Lightness) color model, which is simple to build a color system with: change the lightness and you get a variant. But HSL is perceptually uneven — the same lightness value looks far brighter on yellow than on blue, so a scale that reads right on one hue drifts on the next. OKLCH keeps equal steps looking equal to the eye, and the Chroma and the Hue are adjusted automatically to stay within the sRGB gamut.

You still work in HEX, RGB or HSL if you prefer, and switch color space — OKLCH, OKLAB, CIELAB, HSLuv — whenever the palette needs it.

</template>
</OneColumn>

:::

::: section

<TwoColumns title="Generate the palette in seconds, your way" center>
<template #left>

1. You never start empty: the app opens on a palette that is already generated, ready to be kept, rerolled or reshaped.
1. Bring your own colors — pick them from the document's canvas, extract them from an image, describe the mood you are after and let the AI propose them, or dial them in on the color wheel.
1. Let yourself be guided by the existing pre-configured stops (Material Design, Tailwind, Ant Design…), or import one of the millions of palettes shared by the community.

</template>
<template #right>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-1.webm#t=0.5" altsrc="/videos/_work/_ui_color_palette/article-asset-1.mp4#t=0.5" :width="1920" :height="1080">
</Figure>
</template>
</TwoColumns>

:::

::: section

<TwoColumns title="Control the palette with WYSIWYG" class="col-2--invert" center>
<template #left>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-2.webm#t=0.5" altsrc="/videos/_work/_ui_color_palette/article-asset-2.mp4#t=0.5" :width="1920" :height="1080">
</Figure>
</template>
<template #right>

1. Slide the stops to shape the lightness, the chroma and the hue of every color, and keep a palette with consistent contrasts.
1. Rename, add, remove, change, reorder each color… Keep full control of the color palette.
1. WCAG 2.1 and APCA scores are computed live on every shade, next to a readability preview and the minimum font size that shade can carry.
1. Build as many color modes as the product needs — light, dark, custom foregrounds — and simulate how each one reads for color-blind vision.

</template>
</TwoColumns>

:::

::: section

<TwoColumns title="Deploy and spread the color standard" center>
<template #left>

1. Add with a single click every color of the palette to the document's local styles and variables.
1. Publish the palette to the cloud, then pull it back into Figma, Penpot, Sketch or Framer — one source of color, wherever the team works.
1. Hand off production-ready code: Tailwind v3 and v4 configs, W3C design tokens (DTCG), Tokens Studio, Style Dictionary, CSS Custom Properties, SwiftUI and Compose.

</template>
<template #right>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-3.webm#t=0.5" altsrc="/videos/_work/_ui_color_palette/article-asset-3.mp4#t=0.5" :width="1920" :height="1080">
</Figure>
</template>
</TwoColumns>

:::

::: section

<OneColumn title="One engine, four design tools, and an API">
<template #plain>

Every design tool has its own plugin API, its own storage, its own way of drawing a panel. Maintaining four separate products would have ended the project, so the architecture was turned around: the app was rebuilt to run independently of its host.

1. A color engine computes the scales, the contrasts and the exports. It knows nothing about any design tool, and it is the same code in all of them.
1. A shared UI library draws the same interface everywhere, in English, French, Brazilian Portuguese and Mandarin.
1. A thin adapter per host — Figma, Penpot, Sketch, Framer — only translates between the tool and the app.

That separation is what made 2025 possible: Penpot in August, Sketch in September, Framer in October, from one codebase. The same engine is also exposed as a REST API, an MCP server and a set of open-source skills, so an AI agent can generate a palette, audit its contrasts and push it to a document without the interface ever being opened.

</template>
</OneColumn>

:::

::: success

<WrapColumn :title="$t('global.success')" :columns="4">
<template #plain>
<ContentContainer title="+100k" :description="$t('global.users')">
<template #icon>
<Users :size="48" />
</template>
</ContentContainer>
<ContentContainer title="+1000" :description="$t('global.likes')">
<template #icon>
<Heart :size="48" />
</template>
</ContentContainer>
<ContentContainer title="+20000" :description="$t('global.saves')">
<template #icon>
<Bookmark :size="48" />
</template>
</ContentContainer>
<ContentContainer title="+130" :description="$t('global.countries')">
<template #icon>
<Globe :size="48" />
</template>
</ContentContainer>
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="If you want to test the app, you can run it on your Figma account from the plugin page — or install it on Penpot, Sketch and Framer." cta="Try it out" href="https://www.figma.com/community/plugin/1063959496693642315/UI-Color-Palette" alt="External link to the plugin page on Figma Community">
<template #icon>
<Figma :size="48" />
</template>
</LinkContainer>
<LinkContainer description="UI Color Palette is an open-source project, spread across a dozen repositories. This one holds the Figma app." cta="Watch the repository" href="https://github.com/a-ng-d/figma-ui-color-palette" alt="External link to the plugin repository on GitHub">
<template #icon>
<Github :size="48" />
</template>
</LinkContainer>
<LinkContainer description="To learn more about UI Color Palette, its capabilities and its plans, you may watch the website." cta="Consult the website" href="https://www.ui-color-palette.com" alt="External link to the plugin website">
<template #icon>
<Pointer :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
