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
    },
    data() {
      return {
        links: ['link-1', 'link-2', 'link-3']
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
          v-for="link in links"
          :key="link"
          :label="$t(`attributions.ui.${link}.label`)"
          :href="$t(`attributions.ui.${link}.href`)"
          :alt="$t(`attributions.ui.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
