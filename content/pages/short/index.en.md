<script setup lang="ts">
import { Twitter, Codepen, Github, Dribbble, BookOpen, Instagram, Download, Linkedin } from 'lucide-vue-next'
import CareerEntry from './CareerEntry.vue'
import CareerRole from './CareerRole.vue'

const year = new Date().getFullYear() - 2015
</script>

::: section

<OneColumn title="你好 nǐ hǎo (hello)!">
<template #plain>
<div>
<p>I’m 利安(Aurélien)! Product Builder / Designer / Engineer for {{ year }} years (ex-<Label label="iObeya" highlighted />, ex-<Label label="Razorfish" highlighted />, ex-<Label label="Axeptio" highlighted />) and a UI + code enthusiast.</p>
<p>Filling the gap between business, designers, and developers is my leitmotiv, by enabling collective intelligence, testing, and learning.</p>
<p>I have founded my company, Yelbolt, which owns UI Color Palette and Ideas Spark Booth.</p>
<p>I also write about <Label label="team collaboration" highlighted />, <Label label="design thinking" highlighted /> and <Label label="design systems" highlighted />－I teach UX at design schools－I coach Junior Product Designers.</p>
</div>
</template>
</OneColumn>

:::

::: section

<WrapColumn title="Networks (find me on the internets)">
<template #plain>
<RichExternalLink title="Twitter" description="Curation, ideas, reactions and thoughts" color="var(--color-soft-wind)" href="https://twitter.com/a_ng_d" alt="External link to my Twitter page">
<template #icon><Twitter :size="48" /></template>
</RichExternalLink>
<RichExternalLink title="CodePen" description="Procedural animation and code concept" color="var(--color-deep-black)" href="https://codepen.io/a_ng_d" alt="External link to my CodePen page">
<template #icon><Codepen :size="48" style="--icon-color: var(--color-titanium-white)" /></template>
</RichExternalLink>
<RichExternalLink title="GitHub" description="Dev projects and plugins for UX tools" color="var(--color-creamy-sun)" href="https://github.com/a-ng-d" alt="External link to my GitHub page">
<template #icon><Github :size="48" /></template>
</RichExternalLink>
<RichExternalLink title="Dribbble" description="Concept, UI and animation" color="var(--color-candy-floss)" href="https://dribbble.com/a_ng_d" alt="External link to my Dribbble page">
<template #icon><Dribbble :size="48" /></template>
</RichExternalLink>
<RichExternalLink title="Medium" description="Articles and comments" color="var(--color-titanium-white)" href="https://medium.com/@a_ng_d" alt="External link to my Medium page">
<template #icon><BookOpen :size="48" /></template>
</RichExternalLink>
<RichExternalLink title="Instagram" description="Art and photography" color="var(--color-titanium-white)" href="https://instagram.com/_a_ng_d" alt="External link to my Instagram page">
<template #icon><Instagram :size="48" /></template>
</RichExternalLink>
</template>
</WrapColumn>

:::

::: section

<ThreeColumns :title="`Career (${year} years of digital products)`">
<template #left>
<Button type="secondary" label="Download my resume (PDF)" path="https://link.an.gd/resume" layout="ICON-LEFT" extensible>
<template #icon><Download :size="24" /></template>
</Button>
</template>
<template #middle>
<Button type="secondary" label="Download my portfolio (PDF)" path="https://link.an.gd/portfolio" layout="ICON-LEFT" extensible>
<template #icon><Download :size="24" /></template>
</Button>
</template>
<template #right>
<Button type="secondary" label="Connect on my LinkedIn" path="https://linkedin.com/in/augrimaud" layout="ICON-LEFT" extensible>
<template #icon><Linkedin :size="24" /></template>
</Button>
</template>
</ThreeColumns>

<OneColumn>
<template #plain>
<CareerEntry start="2010" end="2015" title="ECV (École de Communication Visuelle)" label="Digital design course, Title of Digital Art Director with honors">
</CareerEntry>
<CareerEntry start="2015" end="2023" title="iObeya">
<CareerRole start="2015" end="2018" title="UI/UX Designer" />
<CareerRole start="2018" end="2021" title="Product Designer" />
<CareerRole start="2021" end="2023" title="Lead Product Designer + Creative Technologist" />
</CareerEntry>
<CareerEntry start="2023" end="2024" title="Razorfish (Groupe Publicis)" label="Senior UI Designer and Design Ops Specialist">
</CareerEntry>
<CareerEntry start="2024" end="2025" title="Axeptio" label="Senior Product Designer + Creative Technologist">
</CareerEntry>
<CareerEntry start="2025" end="Current" title="Yelbolt" label="Founder">
</CareerEntry>
</template>
</OneColumn>

:::

::: section

<OneColumn title="Stories">
<template #plain>
<SimpleExternalLink label="De H.S.L. à H.C.L., une lettre qui change la donne pour maîtriser les contrastes de couleurs・Color theory" href="https://www.linkedin.com/pulse/de-hsl-%25C3%25A0-hcl-une-lettre-qui-change-la-donne-pour-les-couleurs-ftske" alt="External link to the &quot;De H.S.L. à H.C.L., une lettre qui change la donne pour maîtriser les contrastes de couleurs&quot; article on LinkedIn" />
<SimpleExternalLink label="UI Color Palette et le Dev Mode de Figma・Newsletter" href="https://www.linkedin.com/pulse/ui-color-palette-et-le-dev-mode-de-figma-aur%25C3%25A9lien-grimaud-zcnbc" alt="External link to the &quot;UI Color Palette et le Dev Mode de Figma&quot; article on LinkedIn" />
<SimpleExternalLink label="From Design to Agile Thinking﹒Converging to the right solution (the second diamond)・Team collaboration" href="https://medium.com/@a_ng_d/from-design-to-agile-thinking-70a4c8e5504a" alt="External link to the &quot;From Design to Agile Thinking﹒Converging to the right solution (the second diamond)&quot; article on LinkedIn" />
<SimpleExternalLink label="From Design to Agile Thinking, Converging to the right problem (the first diamond)・Team collaboration" href="https://medium.com/@a_ng_d/from-design-to-agile-thinking-bf7618ff0f" alt="External link to the &quot;From Design to Agile Thinking, Converging to the right problem (the first diamond)&quot; article on LinkedIn" />
<SimpleExternalLink label="Une rétrospective à distance ? 😨・Team collaboration" href="https://medium.com/@a_ng_d/une-rétrospective-à-distance-88bdab442d93" alt="External link to the &quot;Une rétrospective à distance ? 😨&quot; article on Medium" />
<SimpleExternalLink label="La voix de l’équipe・Team collaboration" href="https://medium.com/@a_ng_d/la-voix-de-léquipe-ef80e16f19e5" alt="External link to the &quot;La voix de l’équipe&quot; article on Medium" />
<SimpleExternalLink label="Facilitons-nous la vie ! (ou pas)・Technology" href="https://school.involt.io/src/ebook/page_fnlv.pdf" alt="External link to the &quot;Facilitons-nous la vie ! (ou pas)&quot; ebook" />
</template>
</OneColumn>

:::

::: section

<OneColumn title="Talks">
<template #plain>
<SimpleExternalLink label="Ramifions le fleuve de notre recherche d'activité・Human Talks" href="https://link.an.gd/talk-ramifions-le-fleuve-de-notre-recherche-d-activite" alt="External link to the &quot;Ramifions le fleuve de notre recherche d'activité&quot; slides on Figma" />
<SimpleExternalLink label="How to facilitate a workshop with a lot of participants・iObeya" href="https://link.an.gd/talk-facilitation-tips" alt="External link to the &quot;How to facilitate a workshop with a lot of participants&quot; slides on Figma" />
<SimpleExternalLink label="A design system is like a residential complex・iObeya" href="https://link.an.gd/talk-design-system-metaphor" alt="External link to the &quot;A design system is like a residential complex&quot; slides on Figma" />
<SimpleExternalLink label="Design Thinking・Digital Catalyst" href="https://youtu.be/DDl4Pe0rJDc?t=3727" alt="External link to the &quot;Design Thinking・Digital Catalyst&quot; video on YouTube" />
</template>
</OneColumn>

:::

::: section

<OneColumn title="Workshops">
<template #plain>
<SimpleExternalLink label="qUIck・LISAA・Paris・Oct. 2023 & Feb. 2024" href="https://link.an.gd/workshop-lisaa-7" alt="External link to the &quot;qUIck&quot; slides on Figma" />
<SimpleExternalLink label="Briser le saint composant・LISAA・Paris・Sep. 2023" href="https://link.an.gd/workshop-lisaa-6" alt="External link to the &quot;Briser le saint composant&quot; slides on Figma" />
<SimpleExternalLink label="One page・Sup de Création・Paris・Jun. 2023" href="https://link.an.gd/workshop-omnes-3" alt="External link to the &quot;One page&quot; slides on Figma" />
<SimpleExternalLink label="Documentaire Web・Sup de Création・Paris・May 2023" href="https://link.an.gd/workshop-omnes-2" alt="External link to the &quot;Documentaire Web&quot; slides on Figma" />
<SimpleExternalLink label="Expérience immersive・Sup de Pub・Paris・Apr. 2023" href="https://link.an.gd/workshop-omnes-1" alt="External link to the &quot;Expérience immersive&quot; slides on Figma" />
<SimpleExternalLink label="PoC à deux・LISAA・Paris・Mar. 2023" href="https://link.an.gd/workshop-lisaa-5" alt="External link to the &quot;PoC à deux&quot; slides on Figma" />
<SimpleExternalLink label="Design Sprint engagé・LISAA・Paris・Feb. 2023" href="https://link.an.gd/workshop-lisaa-4" alt="External link to the &quot;Design Sprint engagé&quot; slides on Figma" />
<SimpleExternalLink label="Inscription éclair ⚡️・LISAA・Paris・Oct. 2022" href="https://link.an.gd/workshop-lisaa-3" alt="External link to the &quot;Inscription éclair ⚡️&quot; slides on Figma" />
<SimpleExternalLink label="Darth Uèxe・ECV・Bordeaux・Feb. 2022" href="https://link.an.gd/workshop-lisaa-2" alt="External link to the &quot;Darth Uèxe&quot; slides on Figma" />
<SimpleExternalLink label="C’est mieux quand ça va plus vite en caisse・LISAA・Paris・Sep. 2021" href="https://link.an.gd/workshop-lisaa-1" alt="External link to the &quot;C’est mieux quand ça va plus vite en caisse&quot; slides on Figma" />
</template>
</OneColumn>

:::
