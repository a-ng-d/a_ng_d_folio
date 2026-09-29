---
published: true
order: 0
theme: DEFAULT

title: '_ui_color_palette@:global.separator@:global.author'
shortTitle: _ui_color_palette
summary: 'Accessible color palettes with consistent lightness with Figma'
description: 'Figma is an UX tool, using diagrams to build user experiences, interfaces, prototypes, illustrations, etc. The tool can be extended with a plugin system. Figma tends to be the leader of UX tools market because of its inclusive and powerful business model. So, Figma is still the most exciting ux tool. By reading this article (Accessible Palette: stop using HSL for color systems), I noticed there is not any plugin on Figma to help build accessible color systems for UI. The opportunity is to develop a tool to create, edit and deploy color palettes.'
date: '{''2022''}@:global.separator{''Monthly release''}'
type: '@:global.type.product@:global.separator@:global.type.side'
objectives:
  - 'Creating UI color palettes with consistent lightness and contrast'
  - 'Updating and deploying colors with ease to the team library'
roles:
  - 'Developing the plugins on Figma/Penpot (React)'
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
import { onMounted, ref } from 'vue'
import { Heart, Users, Rocket, Figma, Github, Pointer } from 'lucide-vue-next'
import {
  getUIColorPaletteSaves,
  getUIColorPaletteUsers,
  getUIColorPaletteVersion,
} from '@/utilities/fetch'

// Statistiques du plugin, relevées en direct. Les valeurs de départ sont
// celles qui s'affichent si la source ne répond pas.
const saves = ref('❤️')
const users = ref('▶️')
const version = ref('🚀')

onMounted(async () => {
  saves.value = await getUIColorPaletteSaves()
  users.value = await getUIColorPaletteUsers()
  version.value = await getUIColorPaletteVersion()
})
</script>

::: challenge

<OneColumn title="Make UI color palettes with the LCH color model">
<template #plain>

The plugin uses the LCH (Lightness-Chroma-Hue) model to generate colors according to the chosen lightness scale. The model LCH is relevant to make colors compliant with the WCAG standards.

It works like the HSL (Hue-Saturation-Lightness) color model. The HSL is simple to use to build a color system, because the lightness can just be changed to create variants. The LCH too, but the Chroma, and the Hue are automatically adjusted to keep the colors within the sRGB gamut.

</template>
</OneColumn>

:::

::: section

<TwoColumns title="Create the palette from scratch (or with a bit of help)" center>
<template #left>

1. Select the colors you want to spread into shades directly from your document's canvas.
1. Let you guide by the existing pre-configured stops (Material Design, Atlassian…) or make it your own way.
1. Every shade from the starting colors are gathered within a calibrated palette compliant with WCAG guidelines.

</template>
<template #right>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-1.webm + '#t=0.5'" altsrc="/videos/_work/_ui_color_palette/article-asset-1.mp4 + '#t=0.5'" :width="1920" :height="1080">
</Figure>
</template>
</TwoColumns>

:::

::: section

<TwoColumns title="Control the palette with WYSIWYG" class="col-2--invert" center>
<template #left>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-2.webm + '#t=0.5'" altsrc="/videos/_work/_ui_color_palette/article-asset-2.mp4 + '#t=0.5'" :width="1920" :height="1080">
</Figure>
</template>
<template #right>

1. Slide the stops to change the lightness of every color, and keep a palette with consistent contrasts.
1. Rename, add, remove, change, reorder each color… Keep a full control of the color palette.
1. WCAG 2.2 scores help you build the most respectful palette for accessibility.

</template>
</TwoColumns>

:::

::: section

<TwoColumns title="Deploy and spread the color standard" center>
<template #left>

1. Add with a single click every color of the palette to the document local styles.
1. Publish the local styles and spread standardized color to your team.
1. Export the palette to a JSON document or CSS Custom Properties.

</template>
<template #right>
<Figure type="video" src="/videos/_work/_ui_color_palette/article-asset-3.webm + '#t=0.5'" altsrc="/videos/_work/_ui_color_palette/article-asset-3.mp4 + '#t=0.5'" :width="1920" :height="1080">
</Figure>
</template>
</TwoColumns>

:::

::: success

<WrapColumn :title="$t('global.success')">
<template #plain>
<ContentContainer :title="users" :description="$t('global.users')">
<template #icon>
<Users :size="48" />
</template>
</ContentContainer>
<ContentContainer :title="saves" :description="$t('global.saves')">
<template #icon>
<Heart :size="48" />
</template>
</ContentContainer>
<ContentContainer :title="version" :description="$t('global.versions')">
<template #icon>
<Rocket :size="48" />
</template>
</ContentContainer>
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="If you want to test the plugin, you can run it on your Figma account from the plugin page." cta="Try it out" href="https://www.figma.com/community/plugin/1063959496693642315/UI-Color-Palette" alt="External link to the plugin page on Figma Community">
<template #icon>
<Figma :size="48" />
</template>
</LinkContainer>
<LinkContainer description="UI Color Palette is an open-source project. You can take a glance at the source code on Github." cta="Watch the repository" href="https://github.com/a-ng-d/figma-ui-color-palette" alt="External link to the plugin repository on Github">
<template #icon>
<Github :size="48" />
</template>
</LinkContainer>
<LinkContainer description="To learn more about UI Color Palette, you may watch the website." cta="Consult the website" href="https://www.ui-color-palette.com" alt="External link to the plugin website">
<template #icon>
<Pointer :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
