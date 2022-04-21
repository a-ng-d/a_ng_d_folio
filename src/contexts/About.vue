<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'

  export default {
    name: 'Stories',
    components: {
      OneColumn
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
      :title="$t('id.about.title')"
      :theme="theme"
    >
      <template #plain>
        <div data-theme="theme">
          <p v-html="$t('id.about.experience')"></p>
          <p>{{ $t("id.about.mission") }}</p>
          <p v-html="$t('id.about.activities')"></p>
          <p>{{ $t("id.about.side") }}</p>
        </div>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  [data-theme="dark"]
    --text-color: var(--color-cream)
</style>
