<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import FullWidthFigure from '@/components/layouts/FullWidthFigure.vue'
  import Container from '@/components/ui/Container.vue'
  import InteractiveContainer from '@/components/ui/InteractiveContainer.vue'
  import Figure from '@/components/ui/Figure.vue'
  import { User, PlayCircle } from 'lucide-vue-next'

  export default {
    name: '_iobeya_whiteboard',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      FullWidthFigure,
      Container,
      InteractiveContainer,
      Figure,
      User,
      PlayCircle
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
    >
      <template #asset>
        <img src="/src/assets/images/_work/_iobeya_whiteboard/" />
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
          src="/src/assets/images/_work/_iobeya_whiteboard/"
        />
      </template>
      <template #right>
        <Figure
          type="image"
          src="/src/assets/images/_work/_iobeya_whiteboard/"
        />
      </template>
    </TwoColumns>
    <FullWidthFigure
      :caption="$t('work._iobeya_whiteboard.part-1.caption-2')"
    >
      <template #asset>
        <img src="/src/assets/images/_work/_iobeya_whiteboard/" />
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
          src="/src/assets/images/_work/_iobeya_whiteboard/"
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
          src="/src/assets/images/_work/_iobeya_whiteboard/"
          :caption="$t('work._iobeya_whiteboard.part-2.caption-1')"
        />
      </template>
      <template #right>
        <Figure
          type="image"
          src="/src/assets/images/_work/_iobeya_whiteboard/"
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
    >
      <template #asset>
        <img src="/src/assets/images/_work/_iobeya_whiteboard/" />
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
        <InteractiveContainer
          :description="$t('work._iobeya_whiteboard.part-2.info-1.description')"
          :cta="$t('work._iobeya_whiteboard.part-2.info-1.linkLabel')"
          :href="'/_work/_iobeya_whiteboard/information-1'"
        >
          <template #icon>
            <User :size="48" />
          </template>
        </InteractiveContainer>
        <InteractiveContainer
          :description="$t('work._iobeya_whiteboard.part-2.info-2.description')"
          :cta="$t('work._iobeya_whiteboard.part-2.info-2.linkLabel')"
          :href="'/_work/_iobeya_whiteboard/information-2'"
        >
          <template #icon>
            <User :size="48" />
          </template>
        </InteractiveContainer>
        <InteractiveContainer
          :description="$t('work._iobeya_whiteboard.part-2.info-3.description')"
          :cta="$t('work._iobeya_whiteboard.part-2.info-3.linkLabel')"
          :href="'/_work/_iobeya_whiteboard/information-3'"
        >
          <template #icon>
            <User :size="48" />
          </template>
        </InteractiveContainer>
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
          src="/src/assets/images/_work/_iobeya_whiteboard/"
          :caption="$t('work._iobeya_whiteboard.part-3.caption-1')"
        />
      </template>
      <template #right>
        <Figure
          type="image"
          src="/src/assets/images/_work/_iobeya_whiteboard/"
          :caption="$t('work._iobeya_whiteboard.part-3.caption-2')"
        />
      </template>
    </TwoColumns>
    <FullWidthFigure
      :caption="$t('work._iobeya_whiteboard.part-3.caption-3')"
    >
      <template #asset>
        <img src="/src/assets/images/_work/_iobeya_whiteboard/" />
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
    >
      <template #asset>
        <img src="/src/assets/images/_work/_iobeya_whiteboard/" />
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
        <Container :title="$t('work._iobeya_whiteboard.credit.contributor-1.name')" :description="$t('work._iobeya_whiteboard.credit.contributor-1.role')" />
        <Container :title="$t('work._iobeya_whiteboard.credit.contributor-2.name')" :description="$t('work._iobeya_whiteboard.credit.contributor-2.role')" />
        <Container :title="$t('work._iobeya_whiteboard.credit.contributor-3.name')" :description="$t('work._iobeya_whiteboard.credit.contributor-3.role')" />
        <Container :title="$t('work._iobeya_whiteboard.credit.contributor-4.name')" :description="$t('work._iobeya_whiteboard.credit.contributor-4.role')" />
      </template>
    </WrapColumn>
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
            <PlayCircle :size="48" />
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
</style>
