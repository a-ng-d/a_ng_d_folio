<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Newspaper, Glasses } from 'lucide-vue-next'
  import { assets } from '@/utilities/assets'

  export default defineComponent({
    name: '_iobeya_creativity',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      ContentContainer,
      LinkContainer,
      Figure,
      Newspaper,
      Glasses,
    },
    props: {
      scrollProgress: {
        type: Number,
        required: true,
      },
      scrollLimit: {
        type: Number,
        required: true,
      },
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        assets: assets,
      }
    },
  })
</script>

<template>
  <section class="challenge">
    <OneColumn
      :title="$t('work._iobeya_creativity.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.challenge.paragraph-1') }}</p>
        <p>{{ $t('work._iobeya_creativity.challenge.paragraph-2') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_creativity.part-1.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-1.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[1]"
          :width="1920"
          :height="664"
        />
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_creativity.part-2.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-2.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[2]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-2.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[3]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-2')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-2') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <TwoColumns :layout="'2_1'" :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[4]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-3')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-3') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[5]"
          caption
          :width="828"
          :height="1792"
          :alt="$t('work._iobeya_creativity.part-2.caption-4')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-4') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-2.paragraph-3') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[6]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-5')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-5') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <TwoColumns :layout="'2_1'" :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[7]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-6')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-6') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[8]"
          caption
          :width="828"
          :height="1792"
          :alt="$t('work._iobeya_creativity.part-2.caption-7')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-7') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-2.paragraph-4') }}</p>
      </template>
    </OneColumn>
    <TwoColumns :layout="'2_1'" :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[9]"
          caption
          :width="3376"
          :height="2010"
          :alt="$t('work._iobeya_creativity.part-2.caption-8')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-8') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[10]"
          caption
          :width="828"
          :height="1792"
          :alt="$t('work._iobeya_creativity.part-2.caption-9')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-2.caption-9') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-2.paragraph-5') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[11]"
          :width="3376"
          :height="2010"
        />
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_creativity.part-4.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-4.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-4.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <TwoColumns :theme="theme">
      <template #left>
        <Figure
          type="video"
          :src="assets._iobeya_creativity[24] + '#t=0.5'"
          :altsrc="assets._iobeya_creativity[29] + '#t=0.5'"
          caption
          :width="1244"
          :height="1244"
          :alt="$t('work._iobeya_creativity.part-4.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-4.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="video"
          :src="assets._iobeya_creativity[25] + '#t=0.5'"
          :altsrc="assets._iobeya_creativity[30] + '#t=0.5'"
          caption
          :width="1244"
          :height="1244"
          :alt="$t('work._iobeya_creativity.part-4.caption-2')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-4.caption-2') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-4.paragraph-3') }}</p>
      </template>
    </OneColumn>
    <TwoColumns :theme="theme">
      <template #left>
        <Figure
          type="video"
          :src="assets._iobeya_creativity[26] + '#t=0.5'"
          :altsrc="assets._iobeya_creativity[31] + '#t=0.5'"
          caption
          :width="1920"
          :height="1242"
          :alt="$t('work._iobeya_creativity.part-4.caption-3')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-4.caption-3') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="video"
          :src="assets._iobeya_creativity[27] + '#t=0.5'"
          :altsrc="assets._iobeya_creativity[32] + '#t=0.5'"
          caption
          :width="1920"
          :height="1242"
          :alt="$t('work._iobeya_creativity.part-4.caption-4')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._iobeya_creativity.part-4.caption-4') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="video"
          :src="assets._iobeya_creativity[28]  + '#t=0.5'"
          :altsrc="assets._iobeya_creativity[33]  + '#t=0.5'"
          :width="768"
          :height="428"
        />
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.part-4.paragraph-4') }}</p>
      </template>
    </OneColumn>
  </section>
  <section class="success">
    <OneColumn
      :title="$t('work._iobeya_creativity.success.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_creativity.success.paragraph-1') }}</p>
        <ul>
          <li>{{ $t('work._iobeya_creativity.success.point-1') }}</li>
          <li>{{ $t('work._iobeya_creativity.success.point-2') }}</li>
          <li>{{ $t('work._iobeya_creativity.success.point-3') }}</li>
          <li>{{ $t('work._iobeya_creativity.success.point-4') }}</li>
        </ul>
        <p>{{ $t('work._iobeya_creativity.success.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._iobeya_creativity[23]"
          :width="5040"
          :height="3600"
        />
      </template>
    </OneColumn>
  </section>
  <section class="credit">
    <WrapColumn :title="$t('global.credit')" :columns="3" :theme="theme">
      <template #plain>
        <ContentContainer
          :title="$t('work._iobeya_creativity.credit.contributor-1.name')"
          :description="$t('work._iobeya_creativity.credit.contributor-1.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_creativity.credit.contributor-2.name')"
          :description="$t('work._iobeya_creativity.credit.contributor-2.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_creativity.credit.contributor-3.name')"
          :description="$t('work._iobeya_creativity.credit.contributor-3.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_creativity.credit.contributor-4.name')"
          :description="$t('work._iobeya_creativity.credit.contributor-4.role')"
          :theme="theme"
        />
      </template>
    </WrapColumn>
  </section>
  <section class="takeaways">
    <OneColumn :title="$t('global.takeaways')" :theme="theme">
      <template #plain>
        <LinkContainer
          :description="
            $t('work._iobeya_creativity.takeaways.takeaway-1.description')
          "
          :cta="$t('work._iobeya_creativity.takeaways.takeaway-1.linkLabel')"
          href="https://medium.com/@inVoltag/une-r%C3%A9trospective-%C3%A0-distance-88bdab442d93"
          :alt="$t('work._iobeya_creativity.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <Newspaper :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._iobeya_creativity.takeaways.takeaway-2.description')
          "
          :cta="$t('work._iobeya_creativity.takeaways.takeaway-2.linkLabel')"
          href="https://drive.google.com/file/d/1XmwbNDHBIWoj_BNuyQXvfbrLbuvRemep/view?usp=sharing"
          :alt="$t('work._iobeya_creativity.takeaways.takeaway-2.alt')"
          :theme="theme"
        >
          <template #icon>
            <Glasses :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._iobeya_creativity.takeaways.takeaway-3.description')
          "
          :cta="$t('work._iobeya_creativity.takeaways.takeaway-3.linkLabel')"
          href="https://drive.google.com/file/d/1n9r6wWTG6qc7X3eQ7GFELFXtgBSH7q-d/view?usp=sharing"
          :alt="$t('work._iobeya_creativity.takeaways.takeaway-3.alt')"
          :theme="theme"
        >
          <template #icon>
            <Glasses :size="48" />
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
