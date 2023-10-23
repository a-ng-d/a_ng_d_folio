<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default defineComponent({
    name: 'Workshops',
    components: {
      OneColumn,
      SimpleExternalLink,
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        links: [
          'link-10',
          'link-9',
          'link-8',
          'link-7',
          'link-6',
          'link-5',
          'link-4',
          'link-3',
          'link-2',
          'link-1',
        ] as Array<string>,
      }
    },
  })
</script>

<template>
  <section>
    <OneColumn :title="$t('id.workshops.title')" :theme="theme">
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

<style scoped lang="sass"></style>
