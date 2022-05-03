<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default {
    name: 'DevTools',
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
      :title="$t('attributions.devtools.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          :label="$t('attributions.devtools.link-1.label')"
          :href="$t('attributions.devtools.link-1.href')"
          :alt="$t('attributions.devtools.link-1.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('attributions.devtools.link-2.label')"
          :href="$t('attributions.devtools.link-2.href')"
          :alt="$t('attributions.devtools.link-2.alt')"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
