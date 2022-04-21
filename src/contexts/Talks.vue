<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default {
    name: 'Talks',
    components: {
      OneColumn,
      SimpleExternalLink
    },
    props: {
      theme: {
        type: String,
        default: "default"
      }
    }
  }
</script>

<template>
  <section>
    <OneColumn
      :title="$t('id.talks.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          :label="$t('id.talks.link-1.label')"
          :href="$t('id.talks.link-1.href')"
          :alt="$t('id.talks.link-1.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('id.talks.link-2.label')"
          :href="$t('id.talks.link-2.href')"
          :alt="$t('id.talks.link-2.alt')"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
