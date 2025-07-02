<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Download, Github } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'
  import { assets } from '@/utilities/assets'

  export default defineComponent({
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      TwoColumns,
      LinkContainer,
      Figure,
      Download,
      Github,
    },
    props: {
      scrollProgress: {
        type: Number,
        required: true,
      },
      scrollLimit: {
        type: Number,
        required: true,
      },
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        assets: assets,
      }
    },
    methods: {
      parallax(start: number, end: number) {
        return `${doMap(this.scrollProgress, 0, this.scrollLimit, start, end)}%`
      },
    },
  })
</script>

<template>
  <section>
    <TwoColumns :title="$t('work._awesome_ipsums.part-1.title')" :theme="theme">
      <template #left>
        <p>{{ $t('work._awesome_ipsums.part-1.paragraph-1') }}</p>
        <ul>
          <li>{{ $t('work._awesome_ipsums.part-1.point-1') }}</li>
          <li>{{ $t('work._awesome_ipsums.part-1.point-2') }}</li>
        </ul>
        <p>{{ $t('work._awesome_ipsums.part-1.paragraph-2') }}</p>
        <p>{{ $t('work._awesome_ipsums.part-1.paragraph-3') }}</p>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._awesome_ipsums[0]"
          caption
          :width="1440"
          :height="1100"
          :alt="$t('work._awesome_ipsums.part-1.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._awesome_ipsums.part-1.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section>
    <TwoColumns
      :title="$t('work._awesome_ipsums.part-2.title')"
      center
      :theme="theme"
    >
      <template #left>
        <p>{{ $t('work._awesome_ipsums.part-2.paragraph-1') }}</p>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._awesome_ipsums[1]"
          :width="1200"
          :height="1000"
          :alt="$t('work._awesome_ipsums.part-2.paragraph-1')"
        />
      </template>
    </TwoColumns>
    <TwoColumns class="col-2--invert" center :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._awesome_ipsums[2]"
          :width="1200"
          :height="1000"
          :alt="$t('work._awesome_ipsums.part-2.paragraph-2')"
        />
      </template>
      <template #right>
        <p>{{ $t('work._awesome_ipsums.part-2.paragraph-2') }}</p>
      </template>
    </TwoColumns>
    <TwoColumns center :theme="theme">
      <template #left>
        <p>{{ $t('work._awesome_ipsums.part-2.paragraph-3') }}</p>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._awesome_ipsums[3]"
          :width="1200"
          :height="1000"
          :alt="$t('work._awesome_ipsums.part-2.paragraph-3')"
        />
      </template>
    </TwoColumns>
  </section>
  <section class="ending"></section>
  <section class="takeaways">
    <OneColumn :title="$t('global.takeaways')" :theme="theme">
      <template #plain>
        <LinkContainer
          :description="
            $t('work._awesome_ipsums.takeaways.takeaway-1.description')
          "
          :cta="$t('work._awesome_ipsums.takeaways.takeaway-1.linkLabel')"
          href="https://github.com/a-ng-d/sketch-awesome-ipsums/releases/latest/download/awesome-ipsums.sketchplugin.zip"
          :alt="$t('work._awesome_ipsums.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <Download :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._awesome_ipsums.takeaways.takeaway-2.description')
          "
          :cta="$t('work._awesome_ipsums.takeaways.takeaway-2.linkLabel')"
          href="https://github.com/a-ng-d/sketch-awesome-ipsums"
          :alt="$t('work._awesome_ipsums.takeaways.takeaway-2.alt')"
          :theme="theme"
        >
          <template #icon>
            <Github :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  section.ending
    height: 100vh
    background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 55% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat
    background-color: #23A566 !important

  @include device.tablet
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 60% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat

  @include device.smartphone-landscape
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 65% v-bind('parallax(100, 80)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat

  @include device.smartphone
    section.ending
      background: url(/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/images/_work/_awesome_ipsums/ending-asset-2.svg) 80% v-bind('parallax(100, 55)') no-repeat, url(/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(0, 50)') no-repeat
</style>
