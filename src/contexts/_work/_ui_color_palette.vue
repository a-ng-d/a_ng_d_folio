<script lang="ts">
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import ThreeColumns from '@/components/layouts/ThreeColumns.vue'
  import Container from '@/components/ui/Container.vue'
  import InteractiveContainer from '@/components/ui/InteractiveContainer.vue'
  import Figure from '@/components/ui/Figure.vue'
  import { Heart, MessageCircle, Download, Figma, Github } from 'lucide-vue-next'

  export default {
    name: '_ui_color_palette',
    components: {
      OneColumn,
      WrapColumn,
      ThreeColumns,
      Container,
      InteractiveContainer,
      Figure,
      Heart,
      MessageCircle,
      Download,
      Figma,
      Github
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    }
  }
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
    <WrapColumn
      :title="$t('work._ui_color_palette.part-1.title')"
      :columns="3"
      :theme="theme"
    >
      <template #plain>
        <Figure
          type="video"
          src="/src/assets/videos/_work/_ui_color_palette/article-asset-1.mp4"
          :caption="$t('work._ui_color_palette.part-1.caption-1')"
        />
        <Figure
          type="video"
          src="/src/assets/videos/_work/_ui_color_palette/article-asset-2.mp4"
          :caption="$t('work._ui_color_palette.part-1.caption-2')"
        />
        <Figure
          type="video"
          src="/src/assets/videos/_work/_ui_color_palette/article-asset-3.mp4"
          :caption="$t('work._ui_color_palette.part-1.caption-3')"
        />
      </template>
    </WrapColumn>
  </section>
  <section class="success">
    <ThreeColumns
      :title="$t('global.success')"
      :theme="theme"
    >
      <template #left>
        <Container title="4" :description="$t('global.comments')">
          <template #icon>
            <MessageCircle :size="48" />
          </template>
        </Container>
      </template>
      <template #middle>
        <Container title="9.1K" :description="$t('global.installations')">
          <template #icon>
            <Download :size="48" />
          </template>
        </Container>
      </template>
      <template #right>
        <Container title="73" :description="$t('global.like')">
          <template #icon>
            <Heart :size="48" />
          </template>
        </Container>
      </template>
    </ThreeColumns>
  </section>
  <section class="takeaways">
    <OneColumn
      :title="$t('global.takeaways')"
      :theme="theme"
    >
      <template #plain>
        <InteractiveContainer
          :description="$t('work._ui_color_palette.takeaways.takeaway-1.description')"
          :cta="$t('work._ui_color_palette.takeaways.takeaway-1.linkLabel')"
          :href="'/_work/_ui_color_palette/takeaway-1'"
        >
          <template #icon>
            <Figma :size="48" />
          </template>
        </InteractiveContainer>
        <InteractiveContainer
          :description="$t('work._ui_color_palette.takeaways.takeaway-2.description')"
          :cta="$t('work._ui_color_palette.takeaways.takeaway-2.linkLabel')"
          :href="'/_work/_ui_color_palette/takeaway-2'"
        >
          <template #icon>
            <Github :size="48" />
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
    background-color: var(--color-cream)
</style>
