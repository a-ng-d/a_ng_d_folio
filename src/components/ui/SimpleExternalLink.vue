<script lang="ts">
  import { ExternalLink } from 'lucide-vue-next'

  export default {
    name: 'SimpleExternalLink',
    components: {
      ExternalLink
    },
    props: {
      label: String,
      href: String,
      alt: String,
      dark: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <a class="external-link" :href="href" target="_blank" :alt="alt">
    <div class="external-link__icon">
      <ExternalLink
        :size="24"
      />
    </div>
    <div class="external-link__label">
      <span>{{ label }}</span>
    </div>
  </a>
</template>

<style scoped lang="sass">
  // Structure
  .external-link
    display: flex
    flex-flow: row nowrap
    gap: 0 var(--layout-paragraph-gap)

</style>
