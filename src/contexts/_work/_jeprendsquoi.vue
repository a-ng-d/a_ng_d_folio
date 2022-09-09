<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Info, Bot, Ghost } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'

  export default defineComponent({
    name: '_jeprendsquoi',
    components: {
      OneColumn,
      WrapColumn,
      FullWidthFigure,
      LinkContainer,
      Figure,
      Info,
      Bot,
      Ghost
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
        isFullScreen: false
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
        :theme="theme"
      >
        <template #asset>
          <img src="/images/_work/_jeprendsquoi/article-asset-1.png" />
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
        :theme="theme"
      >
        <template #asset>
          <img src="/images/_work/_jeprendsquoi/article-asset-2.png" />
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
        :isFullScreen="isFullScreen"
        :theme="theme"
      >
        <template #plain>
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-3.jpeg"
            :caption="$t('work._jeprendsquoi.part-2.caption-1')"
            @isMagnified="isFullScreen = $event"
          />
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-4.jpeg"
            :caption="$t('work._jeprendsquoi.part-2.caption-2')"
            @isMagnified="isFullScreen = $event"
          />
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-5.jpeg"
            :caption="$t('work._jeprendsquoi.part-2.caption-3')"
            @isMagnified="isFullScreen = $event"
          />
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-6.jpeg"
            :caption="$t('work._jeprendsquoi.part-2.caption-4')"
            @isMagnified="isFullScreen = $event"
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
        :theme="theme"
      >
        <template #asset>
          <iframe height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FWsXRtKjylmyOv97KBM7KFy%2Fjeprendsquoi%3Fnode-id%3D9%253A0" allowfullscreen></iframe>
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <LinkContainer
            :description="$t('work._jeprendsquoi.part-2.info.description')"
            :cta="$t('work._jeprendsquoi.part-2.info.linkLabel')"
            href="https://yuka.io"
            :theme="theme"
          >
            <template #icon>
              <Info :size="48" />
            </template>
          </LinkContainer>
        </template>
      </OneColumn>
      <WrapColumn
        :isFullScreen="isFullScreen"
        :theme="theme"
      >
        <template #plain>
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-7.gif"
            :caption="$t('work._jeprendsquoi.part-2.caption-7')"
            @isMagnified="isFullScreen = $event"
          />
          <Figure
            type="image"
            src="/images/_work/_jeprendsquoi/article-asset-8.gif"
            :caption="$t('work._jeprendsquoi.part-2.caption-8')"
            @isMagnified="isFullScreen = $event"
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
          <LinkContainer
            :description="$t('work._jeprendsquoi.takeaways.takeaway-1.description')"
            :cta="$t('work._jeprendsquoi.takeaways.takeaway-1.linkLabel')"
            href="https://testflight.apple.com/join/AmEZ2igV"
            :theme="theme"
          >
            <template #icon>
              <Bot :size="48" />
            </template>
          </LinkContainer>
          <LinkContainer
            :description="$t('work._jeprendsquoi.takeaways.takeaway-2.description')"
            :cta="$t('work._jeprendsquoi.takeaways.takeaway-2.linkLabel')"
            href="https://testflight.apple.com/join/AmEZ2igV"
            :theme="theme"
          >
            <template #icon>
              <Ghost :size="48" />
            </template>
          </LinkContainer>
        </template>
      </OneColumn>
    </section>
  </article>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  section.ending
    height: 100vh
    background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) 35% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 65% v-bind('parallax(300, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat
    background-color: var(--color-titanium-white) !important

  @include device.mobile
    section.ending
      background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) -155% v-bind('parallax(300, -100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 355% v-bind('parallax(400, -100)') no-repeat

</style>
