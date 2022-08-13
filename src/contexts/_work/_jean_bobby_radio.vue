<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import LinkContainer from '@/components/ui/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Info, Github, Radio } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'

  export default defineComponent({
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      WrapColumn,
      FullWidthFigure,
      LinkContainer,
      Figure,
      Info,
      Github,
      Radio
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
        >
          <template #icon>
            <Info :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
    <FullWidthFigure
      :caption="$t('work._jean_bobby_radio.part-1.caption-1')"
    >
      <template #asset>
        <iframe height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FTzJMVGhT6hcx7zIyEnjd7U%2FArchitecture-overview%3Fnode-id%3D0%253A1" allowfullscreen></iframe>
      </template>
    </FullWidthFigure>
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
    <FullWidthFigure
      :caption="$t('work._jean_bobby_radio.part-2.caption-1')"
    >
      <template #asset>
        <img src="/images/_work/_jean_bobby_radio/article-asset-1.png" />
      </template>
    </FullWidthFigure>
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
      :caption="$t('work._jean_bobby_radio.part-3.caption-1')"
      :height="640"
      isCentered
      background="#190038"
    >
      <template #asset>
        <img src="/images/_work/_jean_bobby_radio/article-asset-2.png" :style="`transform: translateY(${parallax(100, -50)})`" />
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jean_bobby_radio.part-3.paragraph-2') }}</p>
      </template>
    </OneColumn>
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
        >
          <template #icon>
            <Radio :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="$t('work._jean_bobby_radio.takeaways.takeaway-2.description')"
          :cta="$t('work._jean_bobby_radio.takeaways.takeaway-2.linkLabel')"
          href="https://github.com/inVoltag/jean-bobby-radio"
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
  // Structure
  section:nth-child(2n)
    background-color: transparent

  section:nth-child(2n + 1)
    background-color: var(--color-titanium-white)

  section.ending
    height: 100vh
    background: url(/images/_work/_jean_bobby_radio/ending-asset-2.svg) 50% v-bind('parallax(0, 50)') no-repeat, url(/images/_work/_jean_bobby_radio/ending-asset-1.png) 0 v-bind('parallax(-50, 50)') no-repeat, #190038
</style>
