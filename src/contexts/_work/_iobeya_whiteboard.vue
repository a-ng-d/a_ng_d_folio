<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { User, PlayCircle } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'

  export default defineComponent({
    name: '_iobeya_whiteboard',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      FullWidthFigure,
      ContentContainer,
      LinkContainer,
      Figure,
      User,
      PlayCircle
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
    <section class="challenge">
      <OneColumn
        :title="$t('work._iobeya_whiteboard.challenge.title')"
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-1') }}</p>
          <p v-html="$t('work._iobeya_whiteboard.challenge.paragraph-2')"></p>
          <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-3') }}</p>
          <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-4') }}</p>
        </template>
      </OneColumn>
    </section>
    <section>
      <OneColumn
        :title="$t('work._iobeya_whiteboard.part-1.title')"
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-1.paragraph-1') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        :caption="$t('work._iobeya_whiteboard.part-1.caption-1')"
        :theme="theme"
      >
        <template #asset>
          <img v-lazy="'/images/_work/_iobeya_whiteboard/article-asset-1.png'" />
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-1.paragraph-2') }}</p>
        </template>
      </OneColumn>
      <TwoColumns
        :theme="theme"
      >
        <template #left>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-2.png"
          />
        </template>
        <template #right>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-3.png"
          />
        </template>
      </TwoColumns>
      <FullWidthFigure
        :caption="$t('work._iobeya_whiteboard.part-1.caption-2')"
        :theme="theme"
      >
        <template #asset>
          <img v-lazy="'/images/_work/_iobeya_whiteboard/article-asset-4.png'" />
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-1.paragraph-3') }}</p>
        </template>
      </OneColumn>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-5.png"
          />
        </template>
      </OneColumn>
    </section>
    <section>
      <OneColumn
        :title="$t('work._iobeya_whiteboard.part-2.title')"
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-2.paragraph-1') }}</p>
        </template>
      </OneColumn>
      <TwoColumns
        :theme="theme"
      >
        <template #left>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-6.png"
            :caption="$t('work._iobeya_whiteboard.part-2.caption-1')"
          />
        </template>
        <template #right>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-7.png"
            :caption="$t('work._iobeya_whiteboard.part-2.caption-2')"
          />
        </template>
      </TwoColumns>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-2.paragraph-2') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        :caption="$t('work._iobeya_whiteboard.part-2.caption-3')"
        :theme="theme"
      >
        <template #asset>
          <img v-lazy="'/images/_work/_iobeya_whiteboard/article-asset-8.png'" />
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-2.paragraph-3') }}</p>
        </template>
      </OneColumn>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <LinkContainer
            :description="$t('work._iobeya_whiteboard.part-2.info-1.description')"
            :cta="$t('work._iobeya_whiteboard.part-2.info-1.linkLabel')"
            href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/rG3Pa7/play"
            :theme="theme"
          >
            <template #icon>
              <User :size="48" />
            </template>
          </LinkContainer>
          <LinkContainer
            :description="$t('work._iobeya_whiteboard.part-2.info-2.description')"
            :cta="$t('work._iobeya_whiteboard.part-2.info-2.linkLabel')"
            href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/mEQxdP/play"
            :theme="theme"
          >
            <template #icon>
              <User :size="48" />
            </template>
          </LinkContainer>
          <LinkContainer
            :description="$t('work._iobeya_whiteboard.part-2.info-3.description')"
            :cta="$t('work._iobeya_whiteboard.part-2.info-3.linkLabel')"
            href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/ep3x9z/play"
            :theme="theme"
          >
            <template #icon>
              <User :size="48" />
            </template>
          </LinkContainer>
        </template>
      </OneColumn>
    </section>
    <section>
      <OneColumn
        :title="$t('work._iobeya_whiteboard.part-3.title')"
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-3.paragraph-1') }}</p>
        </template>
      </OneColumn>
      <TwoColumns
        :theme="theme"
      >
        <template #left>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-9.svg"
            :caption="$t('work._iobeya_whiteboard.part-3.caption-1')"
          />
        </template>
        <template #right>
          <Figure
            type="image"
            src="/images/_work/_iobeya_whiteboard/article-asset-10.svg"
            :caption="$t('work._iobeya_whiteboard.part-3.caption-2')"
          />
        </template>
      </TwoColumns>
      <FullWidthFigure
        :caption="$t('work._iobeya_whiteboard.part-3.caption-3')"
        isCentered
        background="#262626"
        :theme="theme"
      >
        <template #asset>
          <video class="full-width-video" preload="true" autoplay muted loop playsinline poster="">
            <source src="/videos/_work/_iobeya_whiteboard/article-asset-1.mp4" type="video/mp4" />
          </video>
        </template>
      </FullWidthFigure>
      <OneColumn
        :theme="theme"
      >
        <template #plain>
          <p>{{ $t('work._iobeya_whiteboard.part-3.paragraph-2') }}</p>
        </template>
      </OneColumn>
      <FullWidthFigure
        :caption="$t('work._iobeya_whiteboard.part-3.caption-4')"
        :theme="theme"
      >
        <template #asset>
          <img v-lazy="'/images/_work/_iobeya_whiteboard/article-asset-11.png'" />
        </template>
      </FullWidthFigure>
    </section>
    <section class="credit">
      <WrapColumn
        :title="$t('global.credit')"
        :columns="3"
        :theme="theme"
      >
        <template #plain>
          <ContentContainer
            :title="$t('work._iobeya_whiteboard.credit.contributor-1.name')"
            :description="$t('work._iobeya_whiteboard.credit.contributor-1.role')"
            :theme="theme"
          />
          <ContentContainer
            :title="$t('work._iobeya_whiteboard.credit.contributor-2.name')"
            :description="$t('work._iobeya_whiteboard.credit.contributor-2.role')"
            :theme="theme"
          />
          <ContentContainer
            :title="$t('work._iobeya_whiteboard.credit.contributor-3.name')"
            :description="$t('work._iobeya_whiteboard.credit.contributor-3.role')"
            :theme="theme"
          />
          <ContentContainer
            :title="$t('work._iobeya_whiteboard.credit.contributor-4.name')"
            :description="$t('work._iobeya_whiteboard.credit.contributor-4.role')"
            :theme="theme"
          />
        </template>
      </WrapColumn>
    </section>
    <section class="takeaways">
      <OneColumn
        :title="$t('global.takeaways')"
        :theme="theme"
      >
        <template #plain>
          <LinkContainer
            :description="$t('work._iobeya_whiteboard.takeaways.takeaway-1.description')"
            :cta="$t('work._iobeya_whiteboard.takeaways.takeaway-1.linkLabel')"
            href="https://www.sketch.com/s/b9ca2e39-f0a3-40b1-9f85-80da81775840/a/Zdpol7/play"
            :theme="theme"
          >
            <template #icon>
              <PlayCircle :size="48" />
            </template>
          </LinkContainer>
        </template>
      </OneColumn>
    </section>
  </article>
</template>

<style scoped lang="sass">
  .full-width-video
    max-width: 100%
    max-height: 100%

</style>
