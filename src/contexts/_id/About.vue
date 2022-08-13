<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'

  export default defineComponent({
    name: 'About',
    components: {
      OneColumn
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  })
</script>

<template>
  <section>
    <OneColumn
      :title="$t('id.about.title')"
      :theme="theme"
    >
      <template #plain>
        <div data-theme="theme">
          <p v-html="$t('id.about.experience', { year: new Date().getFullYear() - 2015 })"></p>
          <p>{{ $t("id.about.mission") }}</p>
          <p v-html="$t('id.about.activities')"></p>
          <p>{{ $t("id.about.side") }}</p>
        </div>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  [data-theme="DARK"]
    --text-color: var(--color-cream)
</style>
