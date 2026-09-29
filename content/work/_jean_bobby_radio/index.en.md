---
published: true
order: 6
theme: DEFAULT

title: '_jean_bobby_radio@:global.separator@:global.author'
shortTitle: _jean_bobby_radio
summary: 'iObeya internal and participatory web radio'
description: 'Before the COVID-19 pandemic, with my teammate in the UX team, we used to listen to our Spotify collaborative playlist. A batch of various masterpieces from different personalities. There are some 90''s hits: Trip Hop, Alternative rock, House… Some 80''s hits: Goth, New Wave… Around 500 tracks we listened to every day. And yet, a virus has come, and the remote work was the new order. We were distributed. The problem is we cannot use Spotify as a web radio, in order to listen together to our music and react to it. Making our own web radio allows us to retrieve this office atmosphere: Jean-Bobby Radio.'
date: '{''2020''}@:global.separator{''On-air''}'
type: '@:global.type.product@:global.separator@:global.type.side'
objectives:
  - 'Listening together to our Spotify collaborative playlist'
  - 'Retrieving the office atmosphere'
roles:
  - 'Defining the web radio back-end architecture'
  - 'Creating a graphic universe around our company''s mascot'
  - 'Designing a simple web player and declining the universe through it'
  - 'Developing and maintaining the web player'

illustration: animation.json
backgroundImage: 'none'

tint:
  hue: '32deg'
  brightness: '1'
  invert: '0'
  saturation: '.3'
  grayscale: '0%'
  name: '_JEAN_BOBBY_RADIO'
---
<script setup lang="ts">
import JBRAnimation from '@/assets/animations/_work/_jean_bobby_radio/animation.json'
import { Info, Github, Radio } from 'lucide-vue-next'
import Ending from './Ending.vue'
import { useScroll } from '@/composables/scroll'

const { parallax } = useScroll()
</script>

::: section

<OneColumn title="Let's start the broadcasting system">
<template #plain>

Building a web radio from scratch is not as easy as expected. The challenge was interesting because a web radio is a complex system where each component is connected to broadcast audio to whoever wants to listen. To explain a bit, the audio is played from a classic computer, then it is encoded and sent to a broadcasting server, and finally, the audio can be played from a player.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<LinkContainer description="This article explains the detailed flow for the most curious (in french)" cta="Read the article" href="https://a-ng-d.notion.site/Monter-une-webradio-d-entreprise-avec-peu-de-moyens-8f64fad1b661454999baa1f65ea27c11" alt="External link to the article">
<template #icon>
<Info :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Bring the motion design at the front-stage">
<template #plain>

The web player gathers a few actions: Play/Pause, Volume, Now playing information and notifications, the collaborative playlist and the sound folder link, some information about the project and a feedback zone. The middle of the stage is the most important part of the player: the looping animation.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_jean_bobby_radio/article-asset-1.webp" caption alt="Around the edge are the player's controls, to get more space at the middle of the stage: Jean-Bobby All Around the World.">
<template #caption>
<p class="discrete">Around the edge are the player's controls, to get more space at the middle of the stage: Jean-Bobby All Around the World.</p>
</template>
</Figure>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Our mascot, All Around the World">
<template #plain>

Jean-Bobby is our company's mascot. We are used to getting him during our trips or events. He has become a running gag because a lot of people liked to take him on holidays. Jean-Bobby has seen the beauty of our world while being the heart of iObeya (ex-KAP IT).

</template>
</OneColumn>
<FullWidthFigure center background="#190038">
<template #asset>
<v-lazy-image src="/images/_work/_jean_bobby_radio/article-asset-2.webp" :style="`transform: translateY(${parallax(50, -50)})`" />
</template>
</FullWidthFigure>
<OneColumn>
<template #plain>

This animated loop is a tribute to this period. The best pictures have been a great inspiration and have been compiled into one short animation.

</template>
</OneColumn>
<FullWidthFigure center background="#190038" caption>
<template #asset>
<Vue3Lottie :animationData="JBRAnimation" />
</template>
<template #caption>
<p class="discrete">This animation has been a great opportunity to use <SimpleExternalLink label="Lottie" href="https://airbnb.design/lottie" alt="External link to the Lottie page" small /> to generate a web-compliant animation. From an Adobe After Effects composition to an animated SVG.</p>
</template>
</FullWidthFigure>

:::

<Ending />

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="The radio can be played on demand" cta="Listen to the radio" href="https://jean-bobby.radio.fm" alt="External link to the radio">
<template #icon>
<Radio :size="48" />
</template>
</LinkContainer>
<LinkContainer description="Jean-Bobby Radio is an open-source project. You can take a glance at the source code on GitHub." cta="Watch the repository" href="https://github.com/a-ng-d/jean-bobby-radio" alt="External link to the repository">
<template #icon>
<Github :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
