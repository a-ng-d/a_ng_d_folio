<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import { Vue3Lottie } from 'vue3-lottie'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
  import { Info, Github, Radio } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'
  import JBRAnimation from '@/assets/animations/_work/_jean_bobby_radio/animation.json'

  export default defineComponent({
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      Figure,
      FullWidthFigure,
      LinkContainer,
      SimpleExternalLink,
      Info,
      Github,
      Radio,
      Vue3Lottie
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
    data: function() {
      return {
        store,
        JBRAnimation
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
  <section>
    <OneColumn
      :title="$t('work._jean_bobby_radio.part-1.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jean_bobby_radio.part-1.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <LinkContainer
          :description="$t('work._jean_bobby_radio.part-1.info.description')"
          :cta="$t('work._jean_bobby_radio.part-1.info.linkLabel')"
          href="https://involtag.notion.site/Monter-une-webradio-d-entreprise-avec-peu-de-moyens-8f64fad1b661454999baa1f65ea27c11"
          :theme="theme"
        >
          <template #icon>
            <Info :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._jean_bobby_radio.part-2.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jean_bobby_radio.part-2.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          src="/images/_work/_jean_bobby_radio/article-asset-1.png"
          caption
        >
          <template #caption>
            <p class="discrete">{{ $t('work._jean_bobby_radio.part-2.caption-1') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._jean_bobby_radio.part-3.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jean_bobby_radio.part-3.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <FullWidthFigure
      center
      background="#190038"
      :theme="theme"
    >
      <template #asset>
        <img v-lazy="'/images/_work/_jean_bobby_radio/article-asset-2.png'" :style="`transform: translateY(${parallax(50, -50)})`" />
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jean_bobby_radio.part-3.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <FullWidthFigure
      center
      background="#190038"
      caption
      :theme="theme"
    >
      <template #asset>
        <Vue3Lottie :animationData="JBRAnimation" />
      </template>
      <template #caption>
        <i18n-t keypath="work._jean_bobby_radio.part-3.caption-1" tag="p" class="discrete" scope="global">
          <template #linkOne>
            <SimpleExternalLink
              :label="$t('work._jeprendsquoi.externalLinks.linkOne.label')"
              :href="$t('work._jeprendsquoi.externalLinks.linkOne.href')"
              :alt="$t('work._jeprendsquoi.externalLinks.linkOne.alt')"
              small
              :theme="theme"
            />
          </template>
        </i18n-t>
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
          :description="$t('work._jean_bobby_radio.takeaways.takeaway-1.description')"
          :cta="$t('work._jean_bobby_radio.takeaways.takeaway-1.linkLabel')"
          href="https://jean-bobby.radio.fm"
          :theme="theme"
        >
          <template #icon>
            <Radio :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="$t('work._jean_bobby_radio.takeaways.takeaway-2.description')"
          :cta="$t('work._jean_bobby_radio.takeaways.takeaway-2.linkLabel')"
          href="https://github.com/inVoltag/jean-bobby-radio"
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
    background: url(/images/_work/_jean_bobby_radio/ending-asset-2.svg) 50% v-bind('parallax(0, 50)') no-repeat, url(/images/_work/_jean_bobby_radio/ending-asset-1.png) 50% v-bind('parallax(-50, 50)') no-repeat
    background-color: #190038 !important
    background-size: auto, cover
</style>
