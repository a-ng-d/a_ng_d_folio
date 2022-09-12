<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default defineComponent({
    name: 'DevTools',
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
        links: ['link-2', 'link-1']
      }
    }
  })
</script>

<template>
  <section>
    <OneColumn
      :title="$t('attribution.devtools.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          v-for="link in links"
          :key="link"
          :label="$t(`attribution.devtools.${link}.label`)"
          :href="$t(`attribution.devtools.${link}.href`)"
          :alt="$t(`attribution.devtools.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
