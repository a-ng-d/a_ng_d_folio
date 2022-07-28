<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import InteractiveContainer from '@/components/ui/InteractiveContainer.vue'
  import Figure from '@/components/ui/Figure.vue'
  import { Download, Github } from 'lucide-vue-next'

  export default {
    name: '_jean_bobby_radio',
    components: {
      OneColumn,
      TwoColumns,
      FullWidthFigure,
      InteractiveContainer,
      Figure,
      Download,
      Github
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
            src="/src/assets/images/_work/_awesome_ipsums/article-asset-1.png"
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
      >
        <template #asset>
          <img src="/src/assets/images/_work/_awesome_ipsums/article-asset-2.png" />
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
      >
        <template #asset>
          <img src="/src/assets/images/_work/_awesome_ipsums/article-asset-3.png" />
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
      >
        <template #asset>
          <img src="/src/assets/images/_work/_awesome_ipsums/article-asset-4.png" />
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
          <InteractiveContainer
            :description="$t('work._awesome_ipsums.takeaways.takeaway-1.description')"
            :cta="$t('work._awesome_ipsums.takeaways.takeaway-1.linkLabel')"
            :href="'/_work/_awesome_ipsums/takeaway-1'"
          >
            <template #icon>
              <Download :size="48" />
            </template>
          </InteractiveContainer>
          <InteractiveContainer
            :description="$t('work._awesome_ipsums.takeaways.takeaway-2.description')"
            :cta="$t('work._awesome_ipsums.takeaways.takeaway-2.linkLabel')"
            :href="'/_work/_awesome_ipsums/takeaway-2'"
          >
            <template #icon>
              <Github :size="48" />
            </template>
          </InteractiveContainer>
        </template>
      </OneColumn>
    </section>
  </article>
</template>

<style scoped lang="sass">
  // Structure
  section:nth-child(2n)
    background-color: transparent

  section:nth-child(2n + 1)
    background-color: var(--color-titanium-white)

  section.ending
    height: 100vh
    background: url(/src/assets/images/_work/_awesome_ipsums/ending-asset-3.svg) 100% 0 no-repeat , url(/src/assets/images/_work/_awesome_ipsums/ending-asset-2.svg) 55% v-bind('parallax(50, 55)') no-repeat, url(/src/assets/images/_work/_awesome_ipsums/ending-asset-1.svg) 50% v-bind('parallax(-50, 50)') no-repeat, #23A566
</style>
