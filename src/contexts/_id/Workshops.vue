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
      :title="$t('id.workshops.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          v-for="link in links"
          :key="link"
          :label="$t(`id.workshops.${link}.label`)"
          :href="$t(`id.workshops.${link}.href`)"
          :alt="$t(`id.workshops.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
