<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default {
    name: 'Workshops',
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
      :title="$t('id.workshops.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          :label="$t('id.workshops.link-1.label')"
          :href="$t('id.workshops.link-1.href')"
          :alt="$t('id.workshops.link-1.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('id.workshops.link-2.label')"
          :href="$t('id.workshops.link-2.href')"
          :alt="$t('id.workshops.link-2.alt')"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
