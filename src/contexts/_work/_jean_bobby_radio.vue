<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import InteractiveContainer from '@/components/ui/InteractiveContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Info, Github, Radio } from 'lucide-vue-next'

  export default {
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      WrapColumn,
      FullWidthFigure,
      InteractiveContainer,
      Figure,
      Info,
      Github,
      Radio
    },
    props: {
      scrollProgress: Number,
      scrollLimit: Number,
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    methods: {
      doMap(value, oldMin, oldMax, newMin, newMax) {
        const oldRange = oldMax - oldMin,
              newRange = newMax - newMin
        return ((value - oldMin) * newRange / oldRange) + newMin
      },
      parallax(start, end) {
        return `${this.doMap(this.scrollProgress, 0, this.scrollLimit, start, end)}%`
      }
    }
  }
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
        <InteractiveContainer
          :description="$t('work._jean_bobby_radio.part-1.info.description')"
          :cta="$t('work._jean_bobby_radio.part-1.info.linkLabel')"
          :href="'/_work/_jean_bobby_radio/information'"
        >
          <template #icon>
            <Info :size="48" />
          </template>
        </InteractiveContainer>
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
        <img src="/src/assets/images/_work/_jean_bobby_radio/article-asset-1.png" />
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
        <img src="/src/assets/images/_work/_jean_bobby_radio/article-asset-2.png" :style="`transform: translateY(${parallax(100, -50)})`" />
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
        <InteractiveContainer
          :description="$t('work._jean_bobby_radio.takeaways.takeaway-1.description')"
          :cta="$t('work._jean_bobby_radio.takeaways.takeaway-1.linkLabel')"
          :href="'/_work/_jean_bobby_radio/takeaway-1'"
        >
          <template #icon>
            <Radio :size="48" />
          </template>
        </InteractiveContainer>
        <InteractiveContainer
          :description="$t('work._jean_bobby_radio.takeaways.takeaway-2.description')"
          :cta="$t('work._jean_bobby_radio.takeaways.takeaway-2.linkLabel')"
          :href="'/_work/_jean_bobby_radio/takeaway-2'"
        >
          <template #icon>
            <Github :size="48" />
          </template>
        </InteractiveContainer>
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
    background: url(/src/assets/images/_work/_jean_bobby_radio/ending-asset-2.svg) 50% v-bind('parallax(0, 50)') no-repeat, url(/src/assets/images/_work/_jean_bobby_radio/ending-asset-1.png) 0 v-bind('parallax(-50, 50)') no-repeat, #190038
</style>
