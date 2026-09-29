---
published: true
order: 7
theme: DARK

title: '_awesome_ipsums@:global.separator@:global.author'
shortTitle: _awesome_ipsums
summary: Design team’s own Lorem Ipsums from a simple Google Spreadsheet with Sketch
description: >-
  Sketch is an UX tool, using diagrams to build user experiences, interfaces,
  prototypes, and illustrations… The tool can be extended with a plugin system
  where the purpose is to add additional features, or script actions. The idea
  of making a more fun Lorem Ipsum tool was a great opportunity to make a Sketch
  Plugin and understand how it works.
date: "{'2019'}@:global.separator{'Released'}"
type: '@:global.type.product@:global.separator@:global.type.side'
objectives:
  - Allowing the design team to use custom lorem ipsums as fake content
  - Making the fake content collaborative
roles:
  - Developing the scripts to create/update/sync. the custom lorem ipsums

illustration: animation.json
backgroundImage: 'none'

tint:
  hue: '82deg'
  brightness: '.7'
  invert: '0'
  saturation: '.9'
  grayscale: '0%'
  name: '_AWESOME_IPSUMS'
---

<script setup lang="ts">
import { Download, Github } from 'lucide-vue-next'
import Ending from './Ending.vue'
</script>

::: section

<TwoColumns title="Welcome to the world of collaborative content">
<template #left>

Lorem ipsum is often used to simulate content into a designed web page. Nevertheless, there may be some issues:

- It does not make any sense.
- It is quite boring and repetitive.

Lorem ipsum could be fun, relevant, and fully personalized. A design team can create, collect and reuse his own fake content. How to get this team involved in collecting content? An online spreadsheet, because it is easy to maintain and always up-to-date.

Google Spreadsheet is simple to use and collaborative. It can act as a micro-database for micro-projects.

</template>
<template #right>

<Figure src="/images/_work/_awesome_ipsums/article-asset-1.webp" caption alt="It is possible to create a new text or update one by filling it with a random value from the spreadsheet">
<template #caption>
<p class="discrete">It is possible to create a new text or update one by filling it with a random value from the spreadsheet</p>
</template>
</Figure>

</template>
</TwoColumns>

:::

::: section

<TwoColumns title="How does it work?" center>
<template #left>

The workflow is quite simple: Synchronizing the spreadsheet model to Sketch.

</template>
<template #right>
<Figure src="/images/_work/_awesome_ipsums/article-asset-2.webp" alt="The workflow is quite simple: Synchronizing the spreadsheet model to Sketch." />
</template>
</TwoColumns>

<TwoColumns class="col-2--invert" center>
<template #left>
<Figure src="/images/_work/_awesome_ipsums/article-asset-3.webp" alt="Then, creating a text from a random content of the spreadsheet. The text is displayed at the center of the current view." />
</template>
<template #right>

Then, creating a text from a random content of the spreadsheet. The text is displayed at the center of the current view.

</template>
</TwoColumns>

<TwoColumns center>
<template #left>

Lastly, a text content can be updated with another random content.

</template>
<template #right>
<Figure src="/images/_work/_awesome_ipsums/article-asset-4.webp" alt="Lastly, a text content can be updated with another random content." />
</template>
</TwoColumns>

:::

<Ending />

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="If you want to test the plugin, you can download the archive file from the project repository (double-click on the plugin file to install it)." cta="Download the archive" href="https://github.com/a-ng-d/sketch-awesome-ipsums/releases/latest/download/awesome-ipsums.sketchplugin.zip" alt="External link to download the plugin">
<template #icon><Download :size="48" /></template>
</LinkContainer>
<LinkContainer description="Awesome Ipsums is an open-source project. You can take a glance at the source code on Github." cta="Watch the repository" href="https://github.com/a-ng-d/sketch-awesome-ipsums" alt="External link to the repository">
<template #icon><Github :size="48" /></template>
</LinkContainer>
</template>
</OneColumn>

:::
