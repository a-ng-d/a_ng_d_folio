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
    },
    data() {
      return {
        links: ['link-1', 'link-2']
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
          v-for="link in links"
          :key="link"
          :label="$t(`attributions.devtools.${link}.label`)"
          :href="$t(`attributions.devtools.${link}.href`)"
          :alt="$t(`attributions.devtools.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
