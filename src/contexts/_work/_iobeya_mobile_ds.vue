<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
  import { Play, Bot, Apple } from 'lucide-vue-next'

  export default defineComponent({
    name: '_jeprendsquoi',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      LinkContainer,
      ContentContainer,
      Figure,
      SimpleExternalLink,
      Play,
      Bot,
      Apple
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
        isFullScreen: false as boolean
      }
    }
  })
</script>

<template>
  <section class="challenge">
    <OneColumn
      :title="$t('work._iobeya_mobile_ds.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_mobile_ds.challenge.paragraph-1') }}</p>
        <i18n-t keypath="work._iobeya_mobile_ds.challenge.paragraph-2" tag="p" scope="global">
          <template #linkOne>
            <SimpleExternalLink
              :label="$t('work._iobeya_mobile_ds.externalLinks.linkOne.label')"
              :href="$t('work._iobeya_mobile_ds.externalLinks.linkOne.href')"
              :alt="$t('work._iobeya_mobile_ds.externalLinks.linkOne.alt')"
              :theme="theme"
            />
          </template>
          <template #linkTwo>
            <SimpleExternalLink
              :label="$t('work._iobeya_mobile_ds.externalLinks.linkTwo.label')"
              :href="$t('work._iobeya_mobile_ds.externalLinks.linkTwo.href')"
              :alt="$t('work._iobeya_mobile_ds.externalLinks.linkTwo.alt')"
              :theme="theme"
            />
          </template>
        </i18n-t>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_mobile_ds.part-1.title')"
      :theme="theme"
    >
      <template #plain>
        <i18n-t keypath="work._iobeya_mobile_ds.part-1.paragraph-1" tag="p" scope="global">
          <template #linkThree>
            <SimpleExternalLink
              :label="$t('work._iobeya_mobile_ds.externalLinks.linkThree.label')"
              :href="$t('work._iobeya_mobile_ds.externalLinks.linkThree.href')"
              :alt="$t('work._iobeya_mobile_ds.externalLinks.linkThree.alt')"
              :theme="theme"
            />
          </template>
        </i18n-t>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_mobile_ds.part-2.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_mobile_ds.part-2.paragraph-1') }}</p>
        <p>{{ $t('work._iobeya_mobile_ds.part-2.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <TwoColumns
      :theme="theme"
    >
      <template #left>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-1.png"
          caption
          :width="1200"
          :height="1500"
          :alt="$t('work._iobeya_mobile_ds.part-2.caption-1')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-2.caption-1') }}</p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-2.png"
          caption
          :width="1200"
          :height="1500"
          :alt="$t('work._iobeya_mobile_ds.part-2.caption-2')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-2.caption-2') }}</p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
    <OneColumn
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_mobile_ds.part-2.paragraph-3') }}</p>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-3.png"
          caption
          :width="1920"
          :height="1070"
          :alt="$t('work._iobeya_mobile_ds.part-2.caption-3')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-2.caption-3') }}</p>
          </template>
        </Figure>
        <p>{{ $t('work._iobeya_mobile_ds.part-2.paragraph-4') }}</p>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-4.png"
          caption
          :width="1920"
          :height="1650"
          :alt="$t('work._iobeya_mobile_ds.part-2.caption-4')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-2.caption-4') }}</p>
          </template>
        </Figure>
        <p>{{ $t('work._iobeya_mobile_ds.part-2.paragraph-5') }}</p>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-5.png"
          caption
          :width="1920"
          :height="1855"
          :alt="$t('work._iobeya_mobile_ds.part-2.caption-5')"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-2.caption-5') }}</p>
          </template>
        </Figure>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn
      :title="$t('work._iobeya_mobile_ds.part-3.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._iobeya_mobile_ds.part-3.paragraph-1') }}</p>
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
          src="/images/_work/_iobeya_mobile_ds/article-asset-6.png"
          caption
          :width="750"
          :height="1624"
          :alt="$t('work._iobeya_mobile_ds.part-3.caption-1')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-3.caption-1') }}</p>
          </template>
        </Figure>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-7.png"
          caption
          :width="750"
          :height="1624"
          :alt="$t('work._iobeya_mobile_ds.part-3.caption-2')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-3.caption-2') }}</p>
          </template>
        </Figure>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-8.png"
          caption
          :width="750"
          :height="1624"
          :alt="$t('work._iobeya_mobile_ds.part-3.caption-3')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-3.caption-3') }}</p>
          </template>
        </Figure>
        <Figure
          type="image"
          src="/images/_work/_iobeya_mobile_ds/article-asset-9.png"
          caption
          :width="750"
          :height="1624"
          :alt="$t('work._iobeya_mobile_ds.part-3.caption-4')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">{{ $t('work._iobeya_mobile_ds.part-3.caption-4') }}</p>
          </template>
        </Figure>
      </template>
    </WrapColumn>
  </section>
  <section class="credit">
    <WrapColumn
      :title="$t('global.credit')"
      :columns="2"
      :theme="theme"
    >
      <template #plain>
        <ContentContainer
          :title="$t('work._iobeya_mobile_ds.credit.contributor-1.name')"
          :description="$t('work._iobeya_mobile_ds.credit.contributor-1.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_mobile_ds.credit.contributor-2.name')"
          :description="$t('work._iobeya_mobile_ds.credit.contributor-2.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_mobile_ds.credit.contributor-3.name')"
          :description="$t('work._iobeya_mobile_ds.credit.contributor-3.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_mobile_ds.credit.contributor-4.name')"
          :description="$t('work._iobeya_mobile_ds.credit.contributor-4.role')"
          :theme="theme"
        />
        <ContentContainer
          :title="$t('work._iobeya_mobile_ds.credit.contributor-5.name')"
          :description="$t('work._iobeya_mobile_ds.credit.contributor-5.role')"
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
          :description="$t('work._iobeya_mobile_ds.takeaways.takeaway-1.description')"
          :cta="$t('work._iobeya_mobile_ds.takeaways.takeaway-1.linkLabel')"
          href="https://www.figma.com/proto/1KL4RbABxDPiUTQLAXa2ci/Welcome-%F0%9F%91%8B?page-id=0%3A1&node-id=6%3A5&viewport=444%2C48%2C0.06&scaling=contain&starting-point-node-id=1%3A42"
          :alt="$t('work._iobeya_mobile_ds.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <Play :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="$t('work._iobeya_mobile_ds.takeaways.takeaway-2.description')"
          :cta="$t('work._iobeya_mobile_ds.takeaways.takeaway-2.linkLabel')"
          href="https://apps.apple.com/cm/app/iobeya/id1489989781?platform=iphone"
          :alt="$t('work._iobeya_mobile_ds.takeaways.takeaway-2.alt')"
          :theme="theme"
        >
          <template #icon>
            <Apple :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="$t('work._iobeya_mobile_ds.takeaways.takeaway-3.description')"
          :cta="$t('work._iobeya_mobile_ds.takeaways.takeaway-3.linkLabel')"
          href="https://play.google.com/store/apps/details?id=com.iobeya.mobile.android&gl=US"
          :alt="$t('work._iobeya_mobile_ds.takeaways.takeaway-3.alt')"
          :theme="theme"
        >
          <template #icon>
            <Bot :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
