<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default {
    name: 'UIAssets',
    components: {
      OneColumn,
      SimpleExternalLink
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
    <OneColumn
      :title="$t('attributions.ui.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          :label="$t('attributions.ui.link-1.label')"
          :href="$t('attributions.ui.link-1.href')"
          :alt="$t('attributions.ui.link-1.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('attributions.ui.link-2.label')"
          :href="$t('attributions.ui.link-2.href')"
          :alt="$t('attributions.ui.link-2.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('attributions.ui.link-3.label')"
          :href="$t('attributions.ui.link-3.href')"
          :alt="$t('attributions.ui.link-3.alt')"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
