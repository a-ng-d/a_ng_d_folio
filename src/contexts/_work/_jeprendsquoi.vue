<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import InteractiveContainer from '@/components/ui/InteractiveContainer.vue'
  import Figure from '@/components/ui/Figure.vue'
  import { Info, Bot, Ghost } from 'lucide-vue-next'

  export default {
    name: '_jeprendsquoi',
    components: {
      OneColumn,
      WrapColumn,
      FullWidthFigure,
      InteractiveContainer,
      Figure,
      Info,
      Bot,
      Ghost
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
  <section class="challenge">
    <OneColumn
      :title="$t('work._jeprendsquoi.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.challenge.paragraph-1') }}</p>
        <p v-html="$t('work._jeprendsquoi.challenge.paragraph-2')"></P>
        <p>{{ $t('work._jeprendsquoi.challenge.paragraph-3') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._jeprendsquoi.part-1.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <FullWidthFigure
      :caption="$t('work._jeprendsquoi.part-1.caption-1')"
    >
      <template #asset>
        <img src="/src/assets/images/_work/_jeprendsquoi/article-asset-1.png" />
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <FullWidthFigure
      :caption="$t('work._jeprendsquoi.part-1.caption-2')"
    >
      <template #asset>
        <img src="/src/assets/images/_work/_jeprendsquoi/article-asset-2.png" />
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-3') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._jeprendsquoi.part-2.title')"
      :theme="theme"
    >
      <template #plain>
        <p v-html="$t('work._jeprendsquoi.part-2.paragraph-1')"></p>
      </template>
    </OneColumn>
    <WrapColumn
      :columns="4"
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-3.jpeg"
          :caption="$t('work._jeprendsquoi.part-2.caption-1')"
        />
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-4.jpeg"
          :caption="$t('work._jeprendsquoi.part-2.caption-2')"
        />
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-5.jpeg"
          :caption="$t('work._jeprendsquoi.part-2.caption-3')"
        />
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-6.jpeg"
          :caption="$t('work._jeprendsquoi.part-2.caption-4')"
        />
      </template>
    </WrapColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p v-html="$t('work._jeprendsquoi.part-2.paragraph-2')"></p>
      </template>
    </OneColumn>
    <FullWidthFigure
      :caption="$t('work._jeprendsquoi.part-2.caption-5')"
    >
      <template #asset>
        <iframe height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FWsXRtKjylmyOv97KBM7KFy%2Fjeprendsquoi%3Fnode-id%3D9%253A0" allowfullscreen></iframe>
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <InteractiveContainer
          :description="$t('work._jeprendsquoi.part-2.info.description')"
          :cta="$t('work._jeprendsquoi.part-2.info.linkLabel')"
          :href="'/_work/_jeprendsquoi/information'"
        >
          <template #icon>
            <Info :size="48" />
          </template>
        </InteractiveContainer>
      </template>
    </OneColumn>
    <WrapColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-7.gif"
          :caption="$t('work._jeprendsquoi.part-2.caption-7')"
        />
        <Figure
          type="image"
          src="/src/assets/images/_work/_jeprendsquoi/article-asset-8.gif"
          :caption="$t('work._jeprendsquoi.part-2.caption-8')"
        />
      </template>
    </WrapColumn>
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
          :description="$t('work._jeprendsquoi.takeaways.takeaway-1.description')"
          :cta="$t('work._jeprendsquoi.takeaways.takeaway-1.linkLabel')"
          :href="'/_work/_jeprendsquoi/takeaway-1'"
        >
          <template #icon>
            <Bot :size="48" />
          </template>
        </InteractiveContainer>
        <InteractiveContainer
          :description="$t('work._jeprendsquoi.takeaways.takeaway-2.description')"
          :cta="$t('work._jeprendsquoi.takeaways.takeaway-2.linkLabel')"
          :href="'/_work/_jeprendsquoi/takeaway-2'"
        >
          <template #icon>
            <Ghost :size="48" />
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
    background: url(/src/assets/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-1.png) 35% v-bind('parallax(200, 100)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-3.png) 65% v-bind('parallax(300, 100)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/src/assets/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat, var(--color-titanium-white)

</style>
