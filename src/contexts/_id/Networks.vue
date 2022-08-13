<script lang="ts">
  import { defineComponent } from 'vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import RichExternalLink from '@/components/ui/RichExternalLink.vue'
  import { Twitter, Dribbble, BookOpen, Codepen, Github } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Networks',
    components: {
      WrapColumn,
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
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        networks: [
          {
            name: 'twitter',
            color: 'var(--color-soft-wind)',
            icon: 'Twitter'
          },
          {
            name: 'codepen',
            color: 'var(--color-deep-black)',
            icon: 'Codepen'
          },
          {
            name: 'github',
            color: 'var(--color-creamy-sun)',
            icon: 'Github'
          },
          {
            name: 'dribbble',
            color: 'var(--color-candy-floss)',
            icon: 'Dribbble'
          },
          {
            name: 'medium',
            color: 'var(--color-titanium-white)',
            icon: 'BookOpen'
          }
        ]
      }
    }
  })
</script>

<template>
  <section>
    <WrapColumn
      :title="$t('id.network.title')"
      :theme="theme"
    >
      <template #plain>
        <RichExternalLink
          v-for="network in networks"
          :title="$t(`id.network.${network.name}.title`)"
          :description="$t(`id.network.${network.name}.description`)"
          :color="network.color"
          :href="$t(`id.network.${network.name}.href`)"
          :alt="$t(`id.network.${network.name}.alt`)"
          :theme="theme"
        >
          <template #icon>
            <Component :is="network.icon" :size="48" :style="network.color === 'var(--color-deep-black)' ? '--icon-color: var(--color-titanium-white)' : ''" />
          </template>
        </RichExternalLink>
      </template>
    </WrapColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
