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
  import { assets } from '@/utilities/assets'

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
    data: function() {
      return {
        assets: assets
      }
    },
  })
</script>

<template>
  <section class="challenge">
    <OneColumn
      :title="$t('work._iobeya_whiteboard.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-1') }}</p>
        <p>
          <ul>
            <li>{{ $t('work._iobeya_whiteboard.challenge.point-1') }}</li>
            <li>{{ $t('work._iobeya_whiteboard.challenge.point-2') }}</li>
          </ul>
        </p>
        <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-2') }}</p>
        <p>{{ $t('work._iobeya_whiteboard.challenge.paragraph-3') }}</p>
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
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[1]"
          caption
          :width="1920"
          :height="912"
          :alt="$t('work._iobeya_whiteboard.part-1.caption-1')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-1.caption-1') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
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
          :src="assets._iobeya_whiteboard[2]"
          :width="1920"
          :height="912"
        />
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[3]"
          :width="1920"
          :height="912"
        />
      </template>
    </TwoColumns>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[4]"
          caption
          :width="1920"
          :height="680"
          :alt="$t('work._iobeya_whiteboard.part-1.caption-2')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-1.caption-2') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
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
          :src="assets._iobeya_whiteboard[5]"
          :width="1920"
          :height="912"
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
          :src="assets._iobeya_whiteboard[6]"
          caption
          :width="1024"
          :height="770"
          :alt="$t('work._iobeya_whiteboard.part-2.caption-1')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-2.caption-1') }}</p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[7]"
          caption
          :width="1024"
          :height="770"
          :alt="$t('work._iobeya_whiteboard.part-2.caption-2')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-2.caption-2') }}</p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_whiteboard.part-2.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[8]"
          caption
          :width="1920"
          :height="680"
          :alt="$t('work._iobeya_whiteboard.part-2.caption-3')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-2.caption-3') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
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
          :alt="$t('work._iobeya_whiteboard.part-2.info-1.alt')"
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
          :alt="$t('work._iobeya_whiteboard.part-2.info-2.alt')"
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
          :alt="$t('work._iobeya_whiteboard.part-2.info-3.alt')"
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
          :src="assets._iobeya_whiteboard[9]"
          caption
          :width="480"
          :height="480"
          :alt="$t('work._iobeya_whiteboard.part-3.caption-1')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-3.caption-1') }}</p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[10]"
          caption
          :width="480"
          :height="480"
          :alt="$t('work._iobeya_whiteboard.part-3.caption-2')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-3.caption-2') }}</p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <FullWidthFigure
      center
      background="#262626"
      caption
      :theme="theme"
    >
      <template #asset>
        <video class="full-width-video" preload="true" autoplay muted loop playsinline poster="">
          <source :src="assets._iobeya_whiteboard[12]" type="video/mp4" />
        </video>
      </template>
      <template #caption>
        <p class="discrete">{{ $t('work._iobeya_whiteboard.part-3.caption-3') }}</p>
      </template>
    </FullWidthFigure>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_whiteboard.part-3.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_whiteboard[11]"
          caption
          :width="1920"
          :height="680"
          :alt="$t('work._iobeya_whiteboard.part-3.caption-4')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_whiteboard.part-3.caption-4') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
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
          :alt="$t('work._iobeya_whiteboard.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <PlayCircle :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  .full-width-video
    max-width: 100%
    max-height: 100%

</style>
