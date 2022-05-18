<script lang="ts">
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import RichExternalLink from '@/components/ui/RichExternalLink.vue'
  import { Twitter, Dribbble, BookOpen, Codepen, Github } from 'lucide-vue-next'

  export default {
    name: 'Networks',
    components: {
      TwoColumns,
      RichExternalLink,
      Twitter,
      Dribbble,
      BookOpen,
      Codepen,
      Github
    },
    props: {
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <section>
    <TwoColumns
      :title="$t('id.network.title')"
      :theme="theme"
    >
      <template #left>
        <RichExternalLink
          :title="$t('id.network.twitter.title')"
          :description="$t('id.network.twitter.description')"
          color="var(--color-soft-wind)"
          :href="$t('id.network.twitter.href')"
          :alt="$t('id.network.twitter.alt')"
          :theme="theme"
        >
          <template #icon>
            <Twitter :size="48" />
          </template>
        </RichExternalLink>
        <RichExternalLink
          :title="$t('id.network.codepen.title')"
          :description="$t('id.network.codepen.description')"
          color="var(--color-deep-black)"
          :href="$t('id.network.codepen.href')"
          :alt="$t('id.network.codepen.alt')"
          :theme="theme"
        >
          <template #icon>
            <Codepen
              :size="48"
              style="--icon-color: var(--color-titanium-white)"
            />
          </template>
        </RichExternalLink>
        <RichExternalLink
          :title="$t('id.network.github.title')"
          :description="$t('id.network.github.description')"
          color="var(--color-creamy-sun)"
          :href="$t('id.network.github.href')"
          :alt="$t('id.network.github.alt')"
          :theme="theme"
        >
          <template #icon>
            <Github :size="48" />
          </template>
        </RichExternalLink>
      </template>
      <template #right>
        <RichExternalLink
          :title="$t('id.network.dribbble.title')"
          :description="$t('id.network.dribbble.description')"
          color="var(--color-candy-floss)"
          :href="$t('id.network.dribbble.href')"
          :alt="$t('id.network.dribbble.alt')"
          :theme="theme"
        >
          <template #icon>
            <Dribbble :size="48" />
          </template>
        </RichExternalLink>
        <RichExternalLink
          :title="$t('id.network.medium.title')"
          :description="$t('id.network.medium.description')"
          color="var(--color-titanium-white)"
          :href="$t('id.network.medium.href')"
          :alt="$t('id.network.medium.alt')"
          :theme="theme"
        >
          <template #icon>
            <BookOpen :size="48" />
          </template>
        </RichExternalLink>
      </template>
    </TwoColumns>
  </section>
</template>

<style scoped lang="sass">

</style>
