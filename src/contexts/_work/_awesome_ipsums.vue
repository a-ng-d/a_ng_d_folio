<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Download, Github } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'

  export default defineComponent({
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      TwoColumns,
      FullWidthFigure,
      LinkContainer,
      Figure,
      Download,
      Github
    },
    props: {
      scrollProgress: {
        type: Number,
        required: true
      },
      scrollLimit: {
        type: Number,
        required: true
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    methods: {
      parallax(start: number, end: number) {
        return `${doMap(this.scrollProgress, 0, this.scrollLimit, start, end)}%`
      }
    }
  })
</script>

<template>
  <article>
    <section>
      <TwoColumns
        :title="$t('work._awesome_ipsums.part-1.title')"
        :theme="theme"
      >
        <template #left>
          <p>{{ $t('work._awesome_ipsums.part-1.paragraph-1') }}</p>
          <p v-html="$t('work._awesome_ipsums.part-1.paragraph-2')"></p>
          <p>{{ $t('work._awesome_ipsums.part-1.paragraph-3') }}</p>
          <p>{{ $t('work._awesome_ipsums.part-1.paragraph-4') }}</p>
        </template>
        <template #right>
          <Figure
            type="image"
            src="/images/_work/_awesome_ipsums/article-asset-1.png"
            :caption="$t('work._awesome_ipsums.part-1.caption-1')"
          />
        </template>
      </TwoColumns>
    </section>
    <section>
      <OneColumn
        :title="$t('work._awesome_ipsums.part-2.title')"
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._awesome_ipsums.part-2.paragraph-1') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        isCentered
        background="linear-gradient(90deg, #FAF7D4 -61.9%, #B4F3D5 176.19%)"
        :theme="theme"
      >
        <template #asset>
          <img src="/images/_work/_awesome_ipsums/article-asset-2.png" />
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._awesome_ipsums.part-2.paragraph-2') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        isCentered
        background="linear-gradient(90deg, #FAF7D4 -61.9%, #B4F3D5 176.19%)"
        :theme="theme"
      >
        <template #asset>
          <img src="/images/_work/_awesome_ipsums/article-asset-3.png" />
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._awesome_ipsums.part-2.paragraph-3') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        isCentered
        background="linear-gradient(90deg, #FAF7D4 -61.9%, #B4F3D5 176.19%)"
        :theme="theme"
      >
        <template #asset>
          <img src="/images/_work/_awesome_ipsums/article-asset-4.png" />
        </template>
      </FullWidthFigure>
    </section>
    <section class="ending">
    </section>
    <section class="takeaways">
      <OneColumn
        :title="$t('global.takeaways')"
        :theme="theme"
      >
        <template #plain>
          <LinkContainer
            :description="$t('work._awesome_ipsums.takeaways.takeaway-1.description')"
            :cta="$t('work._awesome_ipsums.takeaways.takeaway-1.linkLabel')"
            href="https://github.com/inVoltag/sketch-awesome-ipsums/releases/latest/download/awesome-ipsums.sketchplugin.zip"
            :theme="theme"
          >
            <template #icon>
              <Download :size="48" />
            </template>
          </LinkContainer>
          <LinkContainer
            :description="$t('work._awesome_ipsums.takeaways.takeaway-2.description')"
            :cta="$t('work._awesome_ipsums.takeaways.takeaway-2.linkLabel')"
            href="https://github.com/inVoltag/sketch-awesome-ipsums"
            :theme="theme"
          >
            <template #icon>
              <Github :size="48" />
            </template>
          </LinkContainer>
        </template>
      </OneColumn>
    </section>
  </article>
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
