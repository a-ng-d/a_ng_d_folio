<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import Button from '@/components/ui/Button.vue'
  import { Linkedin, Download } from 'lucide-vue-next'

  export default {
    name: 'Career',
    components: {
      OneColumn,
      TwoColumns,
      Button,
      Linkedin,
      Download
    },
    props: {
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <section>
    <TwoColumns
      :title="$t('id.career.title', { year: new Date().getFullYear() - 2015 })"
      :theme="theme"
    >
      <template #left>
        <Button
          type="secondary"
          path="/_resume"
          layout="left-icon"
          extensible
          :theme="theme"
        >
          <template #icon>
            <Download
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("id.career.resume") }}
          </template>
        </Button>
      </template>
      <template #right>
        <Button
          type="secondary"
          path="/_linkedin"
          layout="left-icon"
          extensible
          :theme="theme"
        >
          <template #icon>
            <Linkedin
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("id.career.linkedIn") }}
          </template>
        </Button>
      </template>
    </TwoColumns>
    <OneColumn>
      <template #plain>
        <div>
          <h5>
            <span>{{ $t("id.career.ecv.start") }}</span>
            <span>{{ $t("global.separator") }}</span>
            <span>{{ $t("id.career.ecv.end") }}</span>
          </h5>
          <h4>{{ $t("id.career.ecv.title") }}</h4>
          <p>{{ $t("id.career.ecv.label") }}</p>
        </div>
        <div>
          <div>
            <h5>
              <span>{{ $t("id.career.iobeya.start") }}</span>
              <span>{{ $t("global.separator") }}</span>
              <span>{{ $t("id.career.iobeya.end") }}</span>
            </h5>
            <h4>{{ $t("id.career.iobeya.title") }}</h4>
          </div>
          <div>
            <h6>
              <span>{{ $t("id.career.iobeya.uxDesign.start") }}</span>
              <span>{{ $t("global.separator") }}</span>
              <span>{{ $t("id.career.iobeya.uxDesign.end") }}</span>
            </h6>
            <p>{{ $t("id.career.iobeya.uxDesign.title") }}</p>
          </div>
          <div>
            <h6>
              <span>{{ $t("id.career.iobeya.productDesign.start") }}</span>
              <span>{{ $t("global.separator") }}</span>
              <span>{{ $t("id.career.iobeya.productDesign.end") }}</span>
            </h6>
            <p>{{ $t("id.career.iobeya.productDesign.title") }}</p>
          </div>
          <div>
            <h6>
              <span>{{ $t("id.career.iobeya.creativeTechnologist.start") }}</span>
              <span>{{ $t("global.separator") }}</span>
              <span>{{ $t("id.career.iobeya.creativeTechnologist.end") }}</span>
            </h6>
            <p>{{ $t("id.career.iobeya.creativeTechnologist.title") }}</p>
          </div>
        </div>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  .col-1__content > div > div + div
    margin: var(--layout-column-gap) 0 0
</style>
