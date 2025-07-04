<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import { Heart, Users, Rocket, Figma, Github, Pointer } from 'lucide-vue-next'
  import { assets } from '@/utilities/assets'
  import {
    getUIColorPaletteSaves,
    getUIColorPaletteUsers,
    getUIColorPaletteVersion,
  } from '@/utilities/fetch'

  export default defineComponent({
    name: '_ui_color_palette',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      ContentContainer,
      LinkContainer,
      Figure,
      Heart,
      Users,
      Rocket,
      Figma,
      Github,
      Pointer,
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
        isFullScreen: false as boolean,
        assets: assets,
        saves: '❤️',
        rating: '💬',
        users: '▶️',
        version: '🚀',
      }
    },
    created: async function () {
      this.saves = await getUIColorPaletteSaves()
      this.users = await getUIColorPaletteUsers()
      this.version = await getUIColorPaletteVersion()
    },
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
        <ol>
          <li>{{ $t('work._ui_color_palette.part-1.paragraph-1') }}</li>
          <li>{{ $t('work._ui_color_palette.part-1.paragraph-2') }}</li>
          <li>{{ $t('work._ui_color_palette.part-1.paragraph-3') }}</li>
        </ol>
      </template>
      <template #right>
        <Figure
          type="video"
          :src="assets._ui_color_palette[0] + '#t=0.5'"
          :altsrc="assets._ui_color_palette[3] + '#t=0.5'"
          :width="1920"
          :height="1080"
        >
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section>
    <TwoColumns
      :title="$t('work._ui_color_palette.part-2.title')"
      class="col-2--invert"
      center
      :theme="theme"
    >
      <template #left>
        <Figure
          type="video"
          :src="assets._ui_color_palette[1] + '#t=0.5'"
          :altsrc="assets._ui_color_palette[4] + '#t=0.5'"
          :width="1920"
          :height="1080"
        >
        </Figure>
      </template>
      <template #right>
        <ol>
          <li>{{ $t('work._ui_color_palette.part-2.paragraph-1') }}</li>
          <li>{{ $t('work._ui_color_palette.part-2.paragraph-2') }}</li>
          <li>{{ $t('work._ui_color_palette.part-2.paragraph-3') }}</li>
        </ol>
      </template>
    </TwoColumns>
  </section>
  <section>
    <TwoColumns
      :title="$t('work._ui_color_palette.part-3.title')"
      center
      :theme="theme"
    >
      <template #left>
        <ol>
          <li>{{ $t('work._ui_color_palette.part-3.paragraph-1') }}</li>
          <li>{{ $t('work._ui_color_palette.part-3.paragraph-2') }}</li>
          <li>{{ $t('work._ui_color_palette.part-3.paragraph-3') }}</li>
        </ol>
      </template>
      <template #right>
        <Figure
          type="video"
          :src="assets._ui_color_palette[2] + '#t=0.5'"
          :altsrc="assets._ui_color_palette[5] + '#t=0.5'"
          :width="1920"
          :height="1080"
        >
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section class="success">
    <WrapColumn :title="$t('global.success')" :theme="theme">
      <template #plain>
        <ContentContainer
          :title="users"
          :description="$t('global.users')"
          :theme="theme"
        >
          <template #icon>
            <Users :size="48" />
          </template>
        </ContentContainer>
        <ContentContainer
          :title="saves"
          :description="$t('global.saves')"
          :theme="theme"
        >
          <template #icon>
            <Heart :size="48" />
          </template>
        </ContentContainer>
        <ContentContainer
          :title="version"
          :description="$t('global.versions')"
          :theme="theme"
        >
          <template #icon>
            <Rocket :size="48" />
          </template>
        </ContentContainer>
      </template>
    </WrapColumn>
  </section>
  <section class="takeaways">
    <OneColumn :title="$t('global.takeaways')" :theme="theme">
      <template #plain>
        <LinkContainer
          :description="
            $t('work._ui_color_palette.takeaways.takeaway-1.description')
          "
          :cta="$t('work._ui_color_palette.takeaways.takeaway-1.linkLabel')"
          href="https://www.figma.com/community/plugin/1063959496693642315/UI-Color-Palette"
          :alt="$t('work._ui_color_palette.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <Figma :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._ui_color_palette.takeaways.takeaway-2.description')
          "
          :cta="$t('work._ui_color_palette.takeaways.takeaway-2.linkLabel')"
          href="https://github.com/a-ng-d/figma-ui-color-palette"
          :alt="$t('work._ui_color_palette.takeaways.takeaway-2.alt')"
          :theme="theme"
        >
          <template #icon>
            <Github :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._ui_color_palette.takeaways.takeaway-3.description')
          "
          :cta="$t('work._ui_color_palette.takeaways.takeaway-3.linkLabel')"
          href="https://www.ui-color-palette.com"
          :alt="$t('work._ui_color_palette.takeaways.takeaway-3.alt')"
          :theme="theme"
        >
          <template #icon>
            <Pointer :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass"></style>
