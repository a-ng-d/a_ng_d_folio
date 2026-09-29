---
published: true
order: 2
theme: DEFAULT

title: '_iobeya_whiteboard@:global.separator@:global.author'
shortTitle: _iobeya_whiteboard
summary: 'Go-to-SaaS solution to enhance iObeya virality and deployment'
description: 'The Whiteboarding session is a lite version of iObeya. Its purpose is to ease the deployment through a company by providing a simple meeting framework, reinforcing the collaboration and introducing the solution. This feature was an opportunity to revamp the UI, follow a design philosophy, involve the team, and make user tests.'
date: '{''2018''}@:global.separator{''Released''}'
type: '@:global.type.productDesign@:global.separator@:global.type.pro'
objectives:
  - 'Easing the solution deployment'
  - 'Go-to-SaaS'
  - 'Reinforcing the position of iObeya on Innovation & Creativity'
roles:
  - 'Facilitating workshops by using the design thinking philosophy'
  - 'Designing the vision'
  - 'Revamping the UI'
  - 'Writing the user stories'

illustration: animation.json
backgroundImage: 'url(/images/_work/_iobeya_whiteboard/background.webp) 0% 0% no-repeat'

tint:
  hue: '343deg'
  brightness: '1.5'
  invert: '0'
  saturation: '.7'
  grayscale: '0%'
  name: '_IOBEYA_WHITEBOARD'
---
<script setup lang="ts">
import { User, PlayCircle, MousePointer } from 'lucide-vue-next'
</script>

::: challenge

<OneColumn title="What is the problem?">
<template #plain>

iObeya is structured and strict software. The model is a room = a declared team = a project. This model has some limitations:

- Hard to be deployed through a large company (> 50,000 employees.)
- Heavy workflow between the requester and the IT service.

The platform is fully customizable but the users must be declared and allocated by hand. Besides, the license limits the number of users in a room.

The strict and heavy user management is a big pain, so opening the platform to any user is our main assumption.

</template>
</OneColumn>

:::

::: section

<OneColumn title="Defining several low-fi flows to make stakeholders aligned">
<template #plain>

We needed to validate our assumptions by drafting a first version. First, making stakeholders aligned was a requirement. We started with some business and user outcomes. The main challenge was to open the application a little bit more to external users (a step towards a SaaS solution).

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-1.webp" caption alt="The Lean UX is a canvas that gathers business/user outcomes, and the solution to respond to the opportunity.">
<template #caption>
<p class="discrete">The Lean UX is a canvas that gathers business/user outcomes, and the solution to respond to the opportunity.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

We planned 3 stories on the same session: the facilitator, the declared participants, and the external participants. First, we did a storymap to draw the three detailed userflows and prioritize their features. This activity involved the PM, UX, and DEV parts.

</template>
</OneColumn>
<TwoColumns>
<template #left>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-2.webp" />
</template>
<template #right>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-3.webp" />
</template>
</TwoColumns>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-4.webp" caption alt="The userflow is full of comments because every person in the team was involved and encouraged to give feedback. A strong solution is built by a succession of reviews.">
<template #caption>
<p class="discrete">The userflow is full of comments because every person in the team was involved and encouraged to give feedback. A strong solution is built by a succession of reviews.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

The team involvement was a rewarding experience because some of their ideas have unlocked some uncomfortable situations. As designers, we must facilitate creative meetings and enable people's capabilities.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-5.webp" />
</template>
</OneColumn>

:::

::: section

<OneColumn title="An opportunity to think different">
<template #plain>

Making a SaaS solution was a business opportunity to catch more users and get the app more viral. We planned to revamp the UI because making a clear separation between a classic board and a whiteboard may be necessary (e.g. Figma and FigJam).

</template>
</OneColumn>
<TwoColumns>
<template #left>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-6.webp" caption alt="A whiteboard">
<template #caption>
<p class="discrete">A whiteboard</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-7.webp" caption alt="A classic board">
<template #caption>
<p class="discrete">A classic board</p>
</template>
</Figure>
</template>
</TwoColumns>
<OneColumn>
<template #plain>

The classic board presents a heavy and dark header, a lot of tools and utilities. A whiteboard has a lighter aspect, to introduce a lite version of the application. The result of this UI revamping is an entire whiteboarding session, animated by 3 users, Pierre (the facilitator), Paul (the participant) and Jacqueline (the external participant). This concept was a nice opportunity of using the emotional design philosophy.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-8.webp" caption alt="This cartography details the interaction between the three users during the whiteboard session">
<template #caption>
<p class="discrete">This cartography details the interaction between the three users during the whiteboard session</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

Several prototypes have been created to get the stakeholders' approval. In conclusion, our assumptions have been validated after showing the entire session. The stakeholders thought their problem should be resolved with the whiteboarding session.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<LinkContainer description="Pierre: the facilitator" cta="Launch the whiteboarding session" href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/rG3Pa7/play" alt="External link to Pierre's flow">
<template #icon>
<User :size="48" />
</template>
</LinkContainer>
<LinkContainer description="Paul: the participant" cta="Join the whiteboarding session" href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/mEQxdP/play" alt="External link to Paul's prototype">
<template #icon>
<User :size="48" />
</template>
</LinkContainer>
<LinkContainer description="Jacqueline: the external participant" cta="Join the whiteboarding session" href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/ep3x9z/play" alt="External link to Jacqueline's prototype">
<template #icon>
<User :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Technical feasibility enters the field">
<template #plain>

The green light is turned on, so we could go deeper in the detailed specs. First, a technical exploration was required because the UI revamping implied front-end changes. Indeed, the application is built with modules and the whiteboarding session is one of them. Nevertheless, a lot of discussions brought us to roll over… In order to quickly deliver the feature, we made some concessions: the lite version of the interface was postponed. Nevertheless, we got to add some soft touches of illustration and animation, to introduce the emotional design.

</template>
</OneColumn>
<TwoColumns>
<template #left>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-9.svg" caption alt="The speedy board is the whiteboarding session metaphor">
<template #caption>
<p class="discrete">The speedy board is the whiteboarding session metaphor</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-10.svg" caption alt="A purged whiteboarding session brings the user to a sad wrinkled paper 404 page">
<template #caption>
<p class="discrete">A purged whiteboarding session brings the user to a sad wrinkled paper 404 page</p>
</template>
</Figure>
</template>
</TwoColumns>
<FullWidthFigure center background="#262626" caption>
<template #asset>
<video class="full-width-video" preload="true" autoplay muted loop playsinline poster="">
<source src="/videos/_work/_iobeya_whiteboard/article-asset-1.webm" type="video/webm" />
<source src="/videos/_work/_iobeya_whiteboard/article-asset-1.mp4" type="video/mp4" />
</video>
</template>
<template #caption>
<p class="discrete">This animation makes a transition between contexts while onboarding the end-user</p>
</template>
</FullWidthFigure>
<OneColumn>
<template #plain>

Despite the rollback, the solution responded to the company's problem: doing an activity with any users, outside a room.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_iobeya_whiteboard/article-asset-11.webp" caption alt="The final userflows, ready-to-dev.">
<template #caption>
<p class="discrete">The final userflows, ready-to-dev.</p>
</template>
</Figure>
</template>
</OneColumn>

:::

::: success

<OneColumn :title="$t('global.success')"> </OneColumn>
<TwoColumns>
<template #left>
<h4>A pain reliever for large meetings and events</h4>

The whiteboarding session, including team members, guests, stakeholders, and suppliers, helps accelerate decision-making and enables collective intelligence.

</template>
<template #right>
<h4>Deployed at scale over Miro</h4>

Miro is a relevant solution to enable people by doing whiteboarding sessions, and yet, it cannot be fully integrated with a large enterprise’s standards and processes. This is the reason several large enterprises have deployed iObeya because it can do both.

</template>
</TwoColumns>

:::

::: credit

<WrapColumn :title="$t('global.credit')" :columns="3">
<template #plain>
<ContentContainer title="Julien Bréhier" description="Head of Product Design" />
<ContentContainer title="Pierrick Dugast" description="Engineering Manager" />
<ContentContainer title="Morsi Ben Ayed" description="Lead Developer" />
<ContentContainer title="Yoann Lheude" description="Senior Product Manager" />
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="Extract of the final user flow" cta="Launch a whiteboard session" href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/Zdpol7/play" alt="External link to the final prototype">
<template #icon>
<PlayCircle :size="48" />
</template>
</LinkContainer>
<LinkContainer description="The Whiteboarding session feature is detailed on the iObeya website" cta="Consult the page" href="https://www.iobeya.com/features/whiteboarding-session/" alt="External link to the iObeya whiteboarding session feature page">
<template #icon>
<MousePointer :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
