---
published: true
order: 1
theme: DEFAULT

title: '_axeptio_gusto@:global.separator@:global.author'
shortTitle: _axeptio_gusto
summary: 'Design system harmonization for Axeptio products'
description: 'This project harmonized design language across Axeptio''s consent management platform. I analyzed the existing ecosystem, created missing components, bridged the gap between design and development teams, and established consistent workflows. The initiative successfully created a single source of truth and improved cross-departmental collaboration.'
date: '{''2024''}@:global.separator{''In progress''}'
type: '@:global.type.designSystem@:global.separator@:global.type.pro'
objectives:
  - 'Harmonizing design language across products'
  - 'Establishing a reliable design workflow'
  - 'Bridging the gap between design and development'
roles:
  - 'Analyzing the current design ecosystem'
  - 'Creating components and documentation'
  - 'Educating designers on contribution'
  - 'Facilitating communication between teams'

illustration: animation.json
backgroundImage: 'url(/images/_work/_axeptio_gusto/background.webp) 0% 0% / cover no-repeat'

tint:
  hue: '28deg'
  brightness: '1.5'
  invert: '0'
  saturation: '.3'
  grayscale: '0%'
  name: '_AXEPTIO_GUSTO'
---
<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'
</script>

::: challenge

<OneColumn title="What's Axeptio?">
<template #plain>

Axeptio is a company providing a consent management platform for various businesses from small blogs to large online newspaper platforms. Their one-stop platform manages multiple products including user cookie consent, terms of use, and subscriptions. They also maintain a web extension that can handle consent on the user's behalf.

My task was to evaluate how design language was implemented across Axeptio's products and marketing assets, propose a long-term plan, and schedule specific actions.

</template>
</OneColumn>

:::

::: section

<OneColumn title="The products in between world">
<template #plain>

Axeptio is a medium business and is composed of 6 developers in Montpellier and 3 designers in Paris.

The first tack was to examined each department's environment (design, development, branding), focusing on their tools, sources of truth, and change management processes. The comprehensive analysis revealed several key issues.

The platform contained a mixture of legacy and current design languages named Gusto, creating visual inconsistency.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-1.webp" caption alt="The left part reflects the new design language from the Axeptio’s brand, whereas the right part reflects the previous one.">
<template #caption>
<p class="discrete">The left part reflects the new design language from the Axeptio’s brand, whereas the right part reflects the previous one.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

The development team had more mature processes and quality standards than the design team, creating a significant gap in delivery expectations. For example, integrated components were available for developers but not for designers. A report was produced to compare the environments according to specific criteria.

</template>
</OneColumn>
<TwoColumns layout="A_1">
<template #left>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-2.webp" caption alt="Due to privacy restrictions, the report cannot be shared. Here is an extract to demonstrate how the audit was conducted.">
<template #caption>
<p class="discrete">Due to privacy restrictions, the report cannot be shared. Here is an extract to demonstrate how the audit was conducted.</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-3.webp" caption alt="The Epics are proposals that have been validated by the teams. The main focus was to complete the missing resources on the designers' end.">
<template #caption>
<p class="discrete">The Epics are proposals that have been validated by the teams. The main focus was to complete the missing resources on the designers' end.</p>
</template>
</Figure>
</template>
</TwoColumns>
<OneColumn>
<template #plain>

My mission evolved to focus on improving design workflows, educating designers on contribution practices, and creating missing components. "Complete" was a pilot project I took charge of.

</template>
</OneColumn>

:::

::: section

<OneColumn title="A place for transparency">
<template #plain>

During the building of this pilot, knowledge management was crucial to minimize the risk of future misadoption.

We established specific communication channels to facilitate team interaction, gather and resolve issues, and report decisions and important events. Additionally, we created a page within the company's wiki to support the same purpose in a more structured way. While the channels have provided responsiveness since the pilot began, the wiki page serves as documentation, designed to place the right information where it belongs.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-4.webp" caption alt="The decisions, meetings, updates, and conventions are documented on this page, allowing teams to review the project's history.">
<template #caption>
<p class="discrete">The decisions, meetings, updates, and conventions are documented on this page, allowing teams to review the project's history.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

This page is also a place for the components inventory and tracking their progress. The main purpose is to sort components by criticality, helping me organize each batch (1-week delivery). The second purpose is to review future batches according to the needs of my consumers.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-5.webp" caption alt="The components are sorted and arranged into a kanban view to track progress efficiently. Other views serve different purposes, such as filtering critical components that will be addressed.">
<template #caption>
<p class="discrete">The components are sorted and arranged into a kanban view to track progress efficiently. Other views serve different purposes, such as filtering critical components that will be addressed.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

Each component is documented with:

- Typology
- Status (live, deprecated)
- Locations
- Dependencies
- Purpose
- Differences between development and design

This documentation enables efficient triage, allowing us to prioritize components based on:

- UX debt
- Consumer (aka designers) needs

</template>
</OneColumn>
<TwoColumns layout="2_1">
<template #left>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-6.webp" caption alt="The documentation provides concise information about each component's status and location, with additional details available below">
<template #caption>
<p class="discrete">The documentation provides concise information about each component's status and location, with additional details available below</p>
</template>
</Figure>
</template>
<template #right>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-7.webp" caption alt="This comparison illustrates the gap between components available in Figma and those that have been integrated.">
<template #caption>
<p class="discrete">This comparison illustrates the gap between components available in Figma and those that have been integrated.</p>
</template>
</Figure>
</template>
</TwoColumns>

:::

::: section

<OneColumn title="Communication is the key">
<template #plain>

Clear communication channels proved essential to the project's success. I facilitated dedicated meetings to establish design conventions around spacing and sizing systems, positioned the implemented components as the definitive source of truth, and implemented best practices.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-8.webp" caption alt="The decisions, meetings, updates, and conventions are documented on this page, allowing teams to review the project's history.">
<template #caption>
<p class="discrete">The decisions, meetings, updates, and conventions are documented on this page, allowing teams to review the project's history.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

Developers were kept informed of design decisions, providing the appropriate level of involvement without overwhelming them. Weekly review sessions collected designer feedback for ongoing refinements, while regular change summaries maintained alignment across teams.

</template>
</OneColumn>

:::

::: section

<OneColumn title="Getting departments working closer">
<template #plain>

Bridging interdepartmental gaps became a core focus of the initiative. We primarily targeted improving workflows between the remote design and development teams. Education became a priority to foster mutual empathy and establish shared quality standards. Delivering missing components significantly reduced friction, enabling faster and more efficient work across the organization.

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-9.webp" caption alt="Since the library has been established, component insertions have increased.">
<template #caption>
<p class="discrete">Since the library has been established, component insertions have increased.</p>
</template>
</Figure>
</template>
</OneColumn>

:::

::: section

<OneColumn title="A traced path to legacy">
<template #plain>

I was focused on executing the pilot and the long-term strategy. As a design system is an organization, the main point is team member alignment and shared knowledge.

This pilot has a short timeline, but a 12-month roadmap set the rhythm for potential actions:

- Complete missing priority components・3 months
- Document the usage of the components・3 months
- Connect environments (React components and Figma components)・3 months
- Switch progressively from legacy to the current design system・3 months

</template>
</OneColumn>
<OneColumn>
<template #plain>
<Figure type="image" src="/images/_work/_axeptio_gusto/article-asset-10.webp" caption alt="The 12-month plan is divided into quarters.">
<template #caption>
<p class="discrete">The 12-month plan is divided into quarters.</p>
</template>
</Figure>
</template>
</OneColumn>
<OneColumn>
<template #plain>

I served in a governance role, working closely with the Head of Design to plan and schedule actions. The designers—my primary users—provided positive feedback, as did the developers whom I supported in integrating and reusing existing components.

While considerable work remains, we now have a clearly defined path forward.

</template>
</OneColumn>

:::

::: credit

<WrapColumn :title="$t('global.credit')" :columns="3">
<template #plain>
<ContentContainer title="Antoine Martinez" description="Head of Product Design" />
<ContentContainer title="Ludovic Bernard" description="Product Designer/Product Manager" />
<ContentContainer title="Étienne Tondini-Juvan" description="Product Manager/Product Designer" />
<ContentContainer title="Camille Alemany" description="Sofware Engineer" />
<ContentContainer title="Léo Lecherbonnier" description="Sofware Engineer" />
<ContentContainer title="Laura Gassin" description="Senior Brand Designer" />
</template>
</WrapColumn>

:::

::: takeaways

<OneColumn :title="$t('global.takeaways')">
<template #plain>
<LinkContainer description="The exposed and integrated components are available on Storybook" cta="Explore the playground" href="https://medium.com/@a-ng-d/une-r%C3%A9trospective-%C3%A0-distance-88bdab442d93" alt="External link to the exposed components on Storybook">
<template #icon>
<BookOpen :size="48" />
</template>
</LinkContainer>
</template>
</OneColumn>

:::
