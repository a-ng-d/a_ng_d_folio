<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import ThreeColumns from '@/components/layouts/ThreeColumns.vue'
  import Button from '@/components/ui/Button.vue'
  import { Linkedin, Download } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Career',
    components: {
      OneColumn,
      ThreeColumns,
      Button,
      Linkedin,
      Download,
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <section>
    <ThreeColumns
      :title="$t('id.career.title', { year: new Date().getFullYear() - 2015 })"
      :theme="theme"
    >
      <template #left>
        <Button
          type="secondary"
          :label="$t('id.career.resume')"
          path="https://link.an.gd/resume"
          layout="ICON-LEFT"
          extensible
          :theme="theme"
        >
          <template #icon>
            <Download :size="24" />
          </template>
        </Button>
      </template>
      <template #middle>
        <Button
          type="secondary"
          :label="$t('id.career.portfolio')"
          path="https://link.an.gd/portfolio"
          layout="ICON-LEFT"
          extensible
          :theme="theme"
        >
          <template #icon>
            <Download :size="24" />
          </template>
        </Button>
      </template>
      <template #right>
        <Button
          type="secondary"
          :label="$t('id.career.linkedIn')"
          path="https://linkedin.com/in/augrimaud"
          layout="ICON-LEFT"
          extensible
          :theme="theme"
        >
          <template #icon>
            <Linkedin :size="24" />
          </template>
        </Button>
      </template>
    </ThreeColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <div>
          <div>
            <h5>
              <span>{{ $t('id.career.ecv.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.ecv.end') }}</span>
            </h5>
            <h4>{{ $t('id.career.ecv.title') }}</h4>
            <p>{{ $t('id.career.ecv.label') }}</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <span>{{ $t('id.career.iobeya.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.iobeya.end') }}</span>
            </h5>
            <h4>{{ $t('id.career.iobeya.title') }}</h4>
          </div>
          <div>
            <h6>
              <span>{{ $t('id.career.iobeya.uxDesign.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.iobeya.uxDesign.end') }}</span>
            </h6>
            <p>{{ $t('id.career.iobeya.uxDesign.title') }}</p>
          </div>
          <div>
            <h6>
              <span>{{ $t('id.career.iobeya.productDesign.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.iobeya.productDesign.end') }}</span>
            </h6>
            <p>{{ $t('id.career.iobeya.productDesign.title') }}</p>
          </div>
          <div>
            <h6>
              <span>{{
                $t('id.career.iobeya.creativeTechnologist.start')
              }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.iobeya.creativeTechnologist.end') }}</span>
            </h6>
            <p>{{ $t('id.career.iobeya.creativeTechnologist.title') }}</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <span>{{ $t('id.career.razorfish.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.razorfish.end') }}</span>
            </h5>
            <h4>{{ $t('id.career.razorfish.title') }}</h4>
            <p>{{ $t('id.career.razorfish.label') }}</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <span>{{ $t('id.career.axeptio.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.axeptio.end') }}</span>
            </h5>
            <h4>{{ $t('id.career.axeptio.title') }}</h4>
            <p>{{ $t('id.career.axeptio.label') }}</p>
          </div>
        </div>
        <div>
          <div>
            <h5>
              <span>{{ $t('id.career.yelbolt.start') }}</span>
              <span>{{ $t('global.separator') }}</span>
              <span>{{ $t('id.career.yelbolt.end') }}</span>
            </h5>
            <h4>{{ $t('id.career.yelbolt.title') }}</h4>
            <p>{{ $t('id.career.yelbolt.label') }}</p>
          </div>
        </div>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  .col-1__content > div
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-row-gap) 0

  .col-1__content h5
    margin: 0 0 var(--layout-label-gap)
</style>
