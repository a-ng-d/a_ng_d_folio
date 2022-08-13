<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default defineComponent({
    name: 'Stories',
    components: {
      OneColumn,
      SimpleExternalLink
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        links: ['link-1', 'link-2', 'link-3', 'link-4']
      }
    }
  })
</script>

<template>
  <section>
    <OneColumn
      :title="$t('id.stories.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          v-for="link in links"
          :key="link"
          :label="$t(`id.stories.${link}.label`)"
          :href="$t(`id.stories.${link}.href`)"
          :alt="$t(`id.stories.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
