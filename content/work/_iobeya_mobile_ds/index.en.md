---
published: true
order: 3
theme: DEFAULT

title: '_iobeya_mobile_ds@:global.separator@:global.author'
shortTitle: _iobeya_mobile_ds
summary: 'iObeya mobile application cross-libs design system'
description: 'The iObeya mobile application extends productivity and operational excellence through a project management system at the fingertips. It was a new opportunity of bootstrapping a new design system model from scratch, enhancing design and tech dependencies. iObeya web application is a monolith, and we were going to divide it into micro-frontends and API-driven developments.'
date: '{''2019''}@:global.separator{''Released''}'
type: '@:global.type.designSystem@:global.separator@:global.type.pro'
objectives:
  - 'Standardizing iObeya mobile app components and patterns'
roles:
  - 'Bootstrapping and building interconnected UI blocks'
  - 'Sharing components/patterns/templates with the design and development team'

illustration: animation.json
backgroundImage: 'url(/images/_work/_iobeya_mobile_ds/background.webp) 0% 0% / cover no-repeat'

tint:
  hue: '343deg'
  brightness: '1.5'
  invert: '0'
  saturation: '.7'
  grayscale: '0%'
  name: '_IOBEYA_MOBILE_DS'
---
<script setup lang="ts">
import { ref } from 'vue'
import { Play, Bot, Apple } from 'lucide-vue-next'

const isFullScreen = ref(false)
</script>

::: challenge

<OneColumn title="What is the challenge?">
<template #plain>

In 2019, we thought about how to deploy design at scale. The iObeya mobile application was a great opportunity to start a design system from scratch. Indeed, we have just only turned a little part of the web application monolithic GUI into a design system.

<p>The choice of making native apps brought us at reading the <SimpleExternalLink label="Apple Human Interface" href="https://developer.apple.com/design/human-interface-guidelines/" alt="External link to the Apple Human Interface documentation" /> and the <SimpleExternalLink label="Material Design Guidelines" href="https://material.io/design" alt="External link to the Material Design documentation" />. I was in charge of designing reusable UI components, fully compliant with iOS and Android paradigms. We made this decision to keep a same look & feel and to reduce the learning curve when using the application daily.</p>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Why should we make an application?">
<template #plain>
<p>iObeya is a solution for project management via a specific object named Card. The Card aggregates data like a title, a date, an owner… The mobility was a business opportunity to extend the usage of the Cards. The application is a companion to support project and performance management outside rituals and routines. You can learn more about the birth of the project by reading the <SimpleExternalLink label="Amane Saïd’s article" href="https://www.notion.so/iObeya-mobile-app-design-85fc3f856ff4469fa705249dbcdf4b92" alt="External link to the Amane Saïd's article" /> on his portfolio because he led the initiative.</p>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Atomic design as a philosophy">
<template #plain>

A system consists of interconnecting components each others, in order to design a hierarchy. Atomic design is directly based on organic life: atoms make molecules, molecules make organisms…

The atoms have been defined with the brand team because they own the iObeya Graphical Guidelines. It gathers brand and UI colors, typography, spacing, shadows… These elements are used as parameters to override iOS and Android native components.

</template>
</OneColumn>
<TwoColumns>
<template #left>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-1.webp" caption alt="Colors adapted for an UI usage and provided by the brand team">
<template #caption>
<p class="discrete">Colors adapted for an UI usage and provided by the brand team</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-2.webp" caption alt="Text styles adapted for an UI usage and provided by the brand team">
<template #caption>
<p class="discrete">Text styles adapted for an UI usage and provided by the brand team</p>
</template>
</Figure>
</template>
</TwoColumns>
<OneColumn>
<template #plain>

Sketch is our diagraming software and one feature was really relevant to build an atomic design system: the external components library.

<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-3.png" caption alt="The iOS and Android patterns come from external libraries embed in Sketch. The Master Design System is internally managed by the design team.">
<template #caption>
<p class="discrete">The iOS and Android patterns come from external libraries embed in Sketch. The Master Design System is internally managed by the design team.</p>
</template>
</Figure>

Each part of the UI is a reusable component. Building the UI is like playing lego: small parts are stuck together to make bigger parts, and they are stuck each other to make views. In this way, we keep consistency and make a change is easier.

<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-4.webp" caption alt="Exploded view of the cards list view. It is composed of the overrided iOS navigation bar and a cards list container. Those patterns are subdivided into components which inherit parameters from the iObeya Master Design System.">
<template #caption>
<p class="discrete">Exploded view of the cards list view. It is composed of the overrided iOS navigation bar and a cards list container. Those patterns are subdivided into components which inherit parameters from the iObeya Master Design System.</p>
</template>
</Figure>

Every part was classified and structured in order to deploy them on our versionning system. So, the file is synchronized and can be linked with Sketch to be used as an external library.

<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-5.webp" caption alt="Big pictures of every component, pattern and template, ready for making every view with ease.">
<template #caption>
<p class="discrete">Big pictures of every component, pattern and template, ready for making every view with ease.</p>
</template>
</Figure>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Build the views, to draw the flows">
<template #plain>

By merging data with the templates (provided by the design system), the views emerge with meaning. The time we spent to build a design system was compensated by the quick specs we wrote.

</template>
</OneColumn>
<WrapColumn :columns="4" :isFullScreen="isFullScreen">
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-6.webp" caption alt="List of Cards where I am assigned" @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">List of Cards where I am assigned</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-7.webp" caption alt="List of notifications (assignment and reminder) to follow my activity" @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">List of notifications (assignment and reminder) to follow my activity</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-8.webp" caption alt="Card edit－Title, location, status, date, assignment can be changed." @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">Card edit－Title, location, status, date, assignment can be changed.</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_iobeya_mobile_ds/article-asset-9.webp" caption alt="List of Rooms I can access, to change the Card location" @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">List of Rooms I can access, to change the Card location</p>
</template>
</Figure>
</template>
</WrapColumn>

:::

::: credit

<WrapColumn :title="$t('global.credit')" :columns="2">
<template #plain>
<ContentContainer title="Yoann Lheude" description="Senior Product Manager" />
<ContentContainer title="Pierrick Dugast" description="Engineering Manager" />
<ContentContainer title="Alexandre Lanard" description="Front-end Developer" />
<ContentContainer title="Saber Chaabani" description="iOS Developer" />
<ContentContainer title="Yosra Kobtane" description="QA Engineer" />
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="The iObeya Design System Global Strategy can be consulted to understand how to scale design through iObeya’s services and products (the presentation is fully interactive)" cta="Consult the strategy" href="https://www.figma.com/proto/1KL4RbABxDPiUTQLAXa2ci/Welcome-%F0%9F%91%8B?page-id=0%3A1&node-id=6%3A5&viewport=444%2C48%2C0.06&scaling=contain&starting-point-node-id=1%3A42" alt="External link to the strategy on Figma">
<template #icon>
<Play :size="48" />
</template>
</LinkContainer>
<LinkContainer description="The application can be downloaded on the App Store" cta="Install the app on iOS" href="https://apps.apple.com/cm/app/iobeya/id1489989781?platform=iphone" alt="External link to the iObeya app on iOS">
<template #icon>
<Apple :size="48" />
</template>
</LinkContainer>
<LinkContainer description="The application can be downloaded on the Google Play" cta="Install the app on Android" href="https://play.google.com/store/apps/details?id=com.iobeya.mobile.android&gl=US" alt="External link to the iObeya app on Android">
<template #icon>
<Bot :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
