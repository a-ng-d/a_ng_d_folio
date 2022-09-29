<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import ThreeColumns from '@/components/layouts/ThreeColumns.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Heart, MessageCircle, Download, Figma, Github } from 'lucide-vue-next'

  export default defineComponent({
    name: '_ui_color_palette',
    components: {
      OneColumn,
      TwoColumns,
      ThreeColumns,
      ContentContainer,
      LinkContainer,
      Figure,
      Heart,
      MessageCircle,
      Download,
      Figma,
      Github
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
      :title="$t('work._ui_color_palette.challenge.title')"
      :theme="theme"
    >
      <template #plain>
        <p>{{ $t('work._ui_color_palette.challenge.paragraph-1') }}</p>
        <p>{{ $t('work._ui_color_palette.challenge.paragraph-2') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <TwoColumns
      :title="$t('work._ui_color_palette.part-1.title')"
      center
      :theme="theme"
    >
      <template #left>
          <p>{{ $t('work._ui_color_palette.part-1.caption-1') }}</p>
      </template>
      <template #right>
        <Figure
          type="video"
          src="/videos/_work/_ui_color_palette/article-asset-1.mp4"
          :width="1920"
          :height="1200"
        >
        </Figure>
      </template>
    </TwoColumns>
    <TwoColumns
      class="col-2--invert"
      center
      :theme="theme"
    >
      <template #left>
        <Figure
          type="video"
          src="/videos/_work/_ui_color_palette/article-asset-1.mp4"
          :width="1920"
          :height="1200"
        >
        </Figure>
      </template>
      <template #right>
        <p>{{ $t('work._ui_color_palette.part-1.caption-2') }}</p>
      </template>
    </TwoColumns>
    <TwoColumns
      center
      :theme="theme"
    >
      <template #left>
          <p>{{ $t('work._ui_color_palette.part-1.caption-3') }}</p>
      </template>
      <template #right>
        <Figure
          type="video"
          src="/videos/_work/_ui_color_palette/article-asset-3.mp4"
          :width="1920"
          :height="1200"
        >
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section class="success">
    <ThreeColumns
      :title="$t('global.success')"
      :theme="theme"
    >
      <template #left>
        <ContentContainer
          title="4"
          :description="$t('global.comments')"
          :theme="theme"
        >
          <template #icon>
            <MessageCircle :size="48" />
          </template>
        </ContentContainer>
      </template>
      <template #middle>
        <ContentContainer
          title="12K"
          :description="$t('global.installations')"
          :theme="theme"
        >
          <template #icon>
            <Download :size="48" />
          </template>
        </ContentContainer>
      </template>
      <template #right>
        <ContentContainer
          title="103"
          :description="$t('global.like')"
          :theme="theme"
        >
          <template #icon>
            <Heart :size="48" />
          </template>
        </ContentContainer>
      </template>
    </ThreeColumns>
  </section>
  <section class="takeaways">
    <OneColumn
      :title="$t('global.takeaways')"
      :theme="theme"
    >
      <template #plain>
        <LinkContainer
          :description="$t('work._ui_color_palette.takeaways.takeaway-1.description')"
          :cta="$t('work._ui_color_palette.takeaways.takeaway-1.linkLabel')"
          href="https://www.figma.com/community/plugin/1063959496693642315/UI-Color-Palette"
          :theme="theme"
        >
          <template #icon>
            <Figma :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="$t('work._ui_color_palette.takeaways.takeaway-2.description')"
          :cta="$t('work._ui_color_palette.takeaways.takeaway-2.linkLabel')"
          href="https://github.com/inVoltag/figma-ui-color-palette"
          :theme="theme"
        >
          <template #icon>
            <Github :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">

</style>
