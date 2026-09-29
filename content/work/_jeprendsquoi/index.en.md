---
published: true
order: 5
theme: DEFAULT

title: '_jeprendsquoi@:global.separator@:global.author'
shortTitle: _jeprendsquoi
summary: 'Fruits and vegetables seasonality companion'
description: 'I often go at the market, to buy some fresh and local food. For decades, my parents taught me consume local food is the best way to feed, because the local economy is stimulated and the carbon footprint is lower. So, avoiding supermarket and co. is a leitmotiv. However, the local market reveals its own limits because of some absurdities: find some cherries in winter (17€ a kilogram), some tomatoes or melons on november… The bitter conclusion is simple: strict seasonality is not in the minds of people.'
date: '{''2021''}@:global.separator{''iOS app released''}'
type: '@:global.type.side'
objectives:
  - 'Checking a product''s seasonality (fruits and vegetable)'
  - 'Encouraging people to contribute to the products'' seasonality database'
roles:
  - 'Building and maintaining the database'
  - 'Creating a brand: jeprendsquoi (the daily helper)'
  - 'Designing a mobile companion to find the right information insitu (supermarket & market)'
  - 'Developing a mobile app with a no-code solution'

illustration: illustration.webp
backgroundImage: 'url(/images/_work/_jeprendsquoi/background.svg) 50% / cover no-repeat'

tint:
  hue: '0deg'
  brightness: '1.5'
  invert: '0'
  saturation: '1'
  grayscale: '100%'
  name: '_JEPRENDSQUOI'
---
<script setup lang="ts">
import { ref } from 'vue'
import Ending from './Ending.vue'
import { Info, Apple, Pointer, Star, Download } from 'lucide-vue-next'

const isFullScreen = ref(false)
</script>

::: challenge

<OneColumn title="The problem of non-seasonal food">
<template #plain>

A non-seasonal fruit or vegetable comes from:

- Abroad, in a country where the cultivation is seasonal or locally unavailable.
- Cultivated in a greenhouse.

Abroad, the carbon footprint is high because of the transportation: by boat or plane. And yet, cultivate inside a greenhouse has a more expensive carbon footprint. Indeed, a greenhouse keeps a non-stop heat to simulate the season temperature, and make the cultivation grow. That is why we can see some tomatoes on november, they grow in a greenhouse in Brittany.

</template>
</OneColumn>

:::

::: section

<OneColumn title="A first prototype to solve the problem">
<template #plain>

There are a couple of tools to make some quick database. No-code is an interesting philosophy to build and test quickly something. Airtable has been chosen because its databases can use different visual representations. The grid was the most relevant view to retrieve a vegetable or a fruit and consult its data.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-1.webp" caption alt="The grid representation is clear enough to help user to retrieve the product he is looking for. Besides, Airtable provides a discrete search feature to help a bit more. The fruits and vegetables grid views have been divided into two databases in the first instance. Consult the fruits and vegetables databases.">
<template #caption>
<p class="discrete">The grid representation is clear enough to help user to retrieve the product he is looking for. Besides, Airtable provides a discrete search feature to help a bit more. The fruits and vegetables grid views have been divided into two databases in the first instance. Consult the <SimpleExternalLink label="fruits" href="https://airtable.com/shrjuPamh7D8dN0mD" alt="External link to the fruits database on airtable" small /> and <SimpleExternalLink label="vegetables" href="https://airtable.com/shr7bwEb4cuhWyREm" alt="External link to the vegetables database on airtable" small /> databases.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

The limitation of this representation is the device context. Indeed, the main use case takes place outside, at the market or the supermarket. People are not used to bring their laptop to the supermarket. So, this solution is not viable for a real usage on the ground.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-2.webp" caption alt="Notion has merged the two Airtable databases into one. Notion operates in the same way and the reason of this migration is simple: Notion is my all-in-one digital workplace..">
<template #caption>
<p class="discrete">Notion has merged the two Airtable databases into one. Notion operates in the same way and the reason of this migration is simple: Notion is my all-in-one digital workplace. <SimpleExternalLink label="Consult the Fruits and Vegetables database" href="https://www.notion.so/0a62c28a5f444ff482e676483f44d0d5" alt="External link to the fruits and vegetables database on Notion" small />.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

Nevertheless, people might take their smartphone! And Notion can be consulted with the native app or via a shared URL. The access point is a bit risky because people might loose the shared URL or their Notion account. So, make a mobile app should be safer.

</template>
</OneColumn>

:::

::: section

<OneColumn title="Make the data alive and retrievable">
<template #plain>
<p>The data are ready on Notion and can be represented on a mobile app as an interactive list with some additional features: filter, search, expand, share, and contribute. The app has been built with <SimpleExternalLink label="Bravo Studio" href="https://www.bravostudio.app/" alt="External link to the Bravo Studio app page" />, a no-code mobile app builder, that gathers API calls and Figma templates.</p>
</template>
</OneColumn>
<WrapColumn :columns="4" :isFullScreen="isFullScreen">
<template #plain>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-3.webp" caption alt="The list of fruits and vegetables is displayed as the main section. The list can be filtered by season." @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">The list of fruits and vegetables is displayed as the main section. The list can be filtered by season.</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-4.webp" caption alt="The search feature allows user to find a specific product" @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">The search feature allows user to find a specific product</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-5.webp" caption alt="The detailed page gives user the months of consumption and some additional information" @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">The detailed page gives user the months of consumption and some additional information</p>
</template>
</Figure>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-6.webp" caption alt="Every user can contribute to the list, just by filling the form. A moderation step is required before publishing." @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">Every user can contribute to the list, just by filling the form. A moderation step is required before publishing.</p>
</template>
</Figure>
</template>
</WrapColumn>
<OneColumn>
<template #plain>

The brand has been created and developed around a simple question: What do I take? A question we ask at the supermarket. The purpose is to help people make environmentally friendly choices.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<LinkContainer description="Yuka was a great inspiration at developing the brand, the voice and the ton." cta="Discover Yuka" href="https://yuka.io" alt="External link to the Yuka homepage">
<template #icon>
<Info :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>
<TwoColumns>
<template #left>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-7.gif" caption alt="This looping animation is the mobile app loader when the page is not loaded yet." @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">This looping animation is the mobile app loader when the page is not loaded yet.</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_jeprendsquoi/article-asset-8.gif" caption alt="On the splash screen, the logotype fades in to introduce the app." @isMagnified="isFullScreen = $event">
<template #caption>
<p class="discrete">On the splash screen, the logotype fades in to introduce the app.</p>
</template>
</Figure>
</template>
</TwoColumns>

:::

<Ending />

::: success

<WrapColumn :title="$t('global.success')">
<template #plain>
<ContentContainer title="700" :description="$t('global.downloads')">
<template #icon>
<Download :size="48" />
</template>
</ContentContainer>
<ContentContainer title="4.0/5" :description="$t('global.rating')">
<template #icon>
<Star :size="48" />
</template>
</ContentContainer>
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="The iOS app is available on the App Store" cta="Install the app on iOS" href="https://apps.apple.com/fr/app/jeprendsquoi/id1672862298" alt="External link to the jeprendquoi App Store page">
<template #icon>
<Apple :size="48" />
</template>
</LinkContainer>
<LinkContainer description="The iOS app is available on the App Store" cta="Install the app on iOS" href="https://jeprendsquoi.app" alt="External link to the jeprendquoi App Store page">
<template #icon>
<Pointer :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
