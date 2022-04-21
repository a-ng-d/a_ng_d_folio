<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default {
    name: 'Stories',
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
      :title="$t('id.stories.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          :label="$t('id.stories.link-1.label')"
          :href="$t('id.stories.link-1.href')"
          :alt="$t('id.stories.link-1.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('id.stories.link-2.label')"
          :href="$t('id.stories.link-2.href')"
          :alt="$t('id.stories.link-2.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('id.stories.link-3.label')"
          :href="$t('id.stories.link-3.href')"
          :alt="$t('id.stories.link-3.alt')"
          :theme="theme"
        />
        <SimpleExternalLink
          :label="$t('id.stories.link-4.label')"
          :href="$t('id.stories.link-4.href')"
          :alt="$t('id.stories.link-4.alt')"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
