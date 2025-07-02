<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { BookOpen } from 'lucide-vue-next'
  import { assets } from '@/utilities/assets'
import WrapColumn from '@/components/layouts/WrapColumn.vue'
import ContentContainer from '@/components/patterns/ContentContainer.vue'

  export default defineComponent({
    name: '_axeptio_gusto',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      ContentContainer,
      LinkContainer,
      Figure,
      BookOpen,
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
      :title="$t('work._axeptio_gusto.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.challenge.paragraph-1') }}</p>
        <p>{{ $t('work._axeptio_gusto.challenge.paragraph-2') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._axeptio_gusto.part-1.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-1.paragraph-1') }}</p>
        <p>{{ $t('work._axeptio_gusto.part-1.paragraph-2') }}</p>
        <p>{{ $t('work._axeptio_gusto.part-1.paragraph-3') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[1]"
          caption
          :width="1600"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-1.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-1.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-1.paragraph-4') }}</p>
      </template>
    </OneColumn>
    <TwoColumns :layout="'A_1'" :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[2]"
          caption
          :width="1600"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-1.caption-2')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-1.caption-2') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[3]"
          caption
          :width="1600"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-1.caption-3')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-1.caption-3') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-1.paragraph-5') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._axeptio_gusto.part-2.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-2.paragraph-1') }}</p>
        <p>{{ $t('work._axeptio_gusto.part-2.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[4]"
          caption
          :width="1600"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-2.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-2.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-2.paragraph-3') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[5]"
          caption
          :width="1600"
          :height="800"
          :alt="$t('work._axeptio_gusto.part-2.caption-2')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-2.caption-2') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-2.paragraph-4') }}</p>
        <ul>
          <li>{{ $t('work._axeptio_gusto.part-2.point-1') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-2') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-3') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-4') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-5') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-6') }}</li>
        </ul>
        <p>{{ $t('work._axeptio_gusto.part-2.paragraph-5') }}</p>
        <ul>
          <li>{{ $t('work._axeptio_gusto.part-2.point-7') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-2.point-8') }}</li>
        </ul>
      </template>
    </OneColumn>
    <TwoColumns :layout="'2_1'" :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[6]"
          caption
          :width="1600"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-2.caption-3')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-2.caption-3') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[7]"
          caption
          :width="800"
          :height="1000"
          :alt="$t('work._axeptio_gusto.part-2.caption-4')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-2.caption-4') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section>
    <OneColumn
      :title="$t('work._axeptio_gusto.part-3.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-3.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[8]"
          caption
          :width="1000"
          :height="600"
          :alt="$t('work._axeptio_gusto.part-2.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-2.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-3.paragraph-2') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._axeptio_gusto.part-4.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-4.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[9]"
          caption
          :width="1600"
          :height="800"
          :alt="$t('work._axeptio_gusto.part-4.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-4.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._axeptio_gusto.part-5.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-5.paragraph-1') }}</p>
        <p>{{ $t('work._axeptio_gusto.part-5.paragraph-2') }}</p>
        <ul>
          <li>{{ $t('work._axeptio_gusto.part-5.point-1') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-5.point-2') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-5.point-3') }}</li>
          <li>{{ $t('work._axeptio_gusto.part-5.point-4') }}</li>
        </ul>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._axeptio_gusto[10]"
          caption
          :width="1600"
          :height="800"
          :alt="$t('work._axeptio_gusto.part-5.caption-1')"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._axeptio_gusto.part-5.caption-1') }}
            </p>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._axeptio_gusto.part-5.paragraph-3') }}</p>
        <p>{{ $t('work._axeptio_gusto.part-5.paragraph-4') }}</p>
      </template>
    </OneColumn>
  </section>
  <section class="credit">
    <WrapColumn :title="$t('global.credit')" :columns="3" :theme="theme">
      <template #plain>
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-1.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-1.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-2.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-2.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-3.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-3.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-4.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-4.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-5.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-5.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._axeptio_gusto.credit.contributor-6.name')"
          :description="$t('work._axeptio_gusto.credit.contributor-6.role')"
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
            $t('work._axeptio_gusto.takeaways.takeaway-1.description')
          "
          :cta="$t('work._axeptio_gusto.takeaways.takeaway-1.linkLabel')"
          href="https://medium.com/@a-ng-d/une-r%C3%A9trospective-%C3%A0-distance-88bdab442d93"
          :alt="$t('work._axeptio_gusto.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <BookOpen :size="48" />
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
