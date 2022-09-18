<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

  export default defineComponent({
    name: 'SoundsMusics',
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
        links: ['link-5', 'link-4', 'link-3','link-2', 'link-1'] as Array<string>
      }
    }
  })
</script>

<template>
  <section>
    <OneColumn
      :title="$t('attribution.soundsmusics.title')"
      :theme="theme"
    >
      <template #plain>
        <SimpleExternalLink
          v-for="link in links"
          :key="link"
          :label="$t(`attribution.soundsmusics.${link}.label`)"
          :href="$t(`attribution.soundsmusics.${link}.href`)"
          :alt="$t(`attribution.soundsmusics.${link}.alt`)"
          :theme="theme"
        />
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
