<script lang="ts">
  import { defineComponent } from 'vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
  import _ui_color_palette from '@/contexts/_work/_ui_color_palette.vue'
  import _jeprendsquoi from '@/contexts/_work/_jeprendsquoi.vue'
  import _jean_bobby_radio from '@/contexts/_work/_jean_bobby_radio.vue'
  import _awesome_ipsums from '@/contexts/_work/_awesome_ipsums.vue'
  import _iobeya_whiteboard from '@/contexts/_work/_iobeya_whiteboard.vue'
  import _iobeya_mobile_ds from '@/contexts/_work/_iobeya_mobile_ds.vue'
  import _iobeya_creativity from '@/contexts/_work/_iobeya_creativity.vue'
  import _axeptio_gusto from '@/contexts/_work/_axeptio_gusto.vue'

  export default defineComponent({
    name: 'Project',
    components: {
      Footer,
      Button,
      ScrollingText,
      OneColumn,
      WrapColumn,
      ContentContainer,
      SimpleExternalLink,
      _ui_color_palette,
      _jeprendsquoi,
      _jean_bobby_radio,
      _awesome_ipsums,
      _iobeya_whiteboard,
      _iobeya_mobile_ds,
      _iobeya_creativity,
      _axeptio_gusto,
    },
    props: {
      project: {
        type: Object,
        required: true,
      },
      scrollProgress: Number,
      scrollLimit: Number,
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <main class="page">
    <article class="project" :data-theme="theme">
      <section class="title">
        <Transition
          name="slide-up"
          style="--delay: var(--delay-turtoise)"
          appear
        >
          <ScrollingText :label="project.codeName" :theme="theme" />
        </Transition>
        <Transition
          name="slide-up"
          style="
            --delay: calc(var(--delay-turtoise) + (var(--duration-step) * 0.5));
          "
          appear
        >
          <ScrollingText
            :label="
              $t('global.navigate') +
              $t('global.separator') +
              $t('global.discover') +
              $t('global.separator') +
              project.date +
              $t('global.separator') +
              project.summary +
              $t('global.separator') +
              'Project #' +
              (project.position + 1) +
              $t('global.separator')
            "
            direction="RIGHT"
            isSubTitle
            :theme="theme"
            style="margin-left: calc(var(--sizing-s-000) * -1)"
          />
        </Transition>
      </section>
      <section class="description">
        <OneColumn :theme="theme">
          <template #plain>
            <p class="enhanced">
              {{ $t(`work.${project.codeName}.description`) }}
            </p>
          </template>
        </OneColumn>
      </section>
      <section class="overview">
        <WrapColumn :title="$t('global.overview')" :columns="4" :theme="theme">
          <template #plain>
            <ContentContainer
              :title="$t('global.date')"
              :description="project.date"
              :theme="theme"
            />
            <ContentContainer
              :title="$t('global.type.label')"
              :description="project.type"
              :theme="theme"
            />
            <ContentContainer
              v-for="(objective, index) in project.objectives"
              :title="`${$t('global.objective')} #${index + 1}`"
              :description="objective"
              :key="`#${index + 1}`"
              :theme="theme"
            />
            <ContentContainer
              v-for="(role, index) in project.roles"
              :title="`${$t('global.role')} #${index + 1}`"
              :description="role"
              :key="`#${index + 1}`"
              :theme="theme"
            />
          </template>
        </WrapColumn>
      </section>
      <Component
        :is="project.codeName"
        :scrollProgress="scrollProgress"
        :scrollLimit="scrollLimit"
        :theme="theme"
      />
    </article>
    <Footer
      alignment="CENTER"
      :theme="theme"
      style="background-color: var(--color-creamy-sun)"
    />
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .project
    grid-area: main
    margin-top: calc(var(--header-height-size) * -1)

  .title, .description
    height: 100vh
    justify-content: center

  @include device.smartphone
    .description
      height: fit-content

  // Aspect
  :deep(section:nth-child(2n + 1))
    background-color: var(--color-titanium-white)

  :deep(section:nth-child(2n))
    background-color: transparent

  section.title
    background-color: transparent

  section.description
    background-color: var(--color-titanium-white)

  section.overview
    background-color: var(--color-soft-wind)

  :deep(section.challenge)
    background-color: var(--color-candy-floss)

  :deep(section.success), :deep(section.credit)
    background-color: var(--color-soft-wind)

  :deep(section.credit)
    background-color: var(--color-soft-wind)

  :deep(section.takeaways)
    background: var(--gradient-biscarosse-sunset)

  .project
    &[data-theme="DARK"]
      --text-color: var(--color-cream)

      :deep(section:nth-child(2n + 1))
        background-color: var(--color-soil)

      section.title
        background-color: transparent

      section.description
        background-color: var(--color-soil)

      section.overview
        background-color: var(--color-clear-water)

      :deep(section.challenge)
        background-color: var(--color-sandstone)

      :deep(section.success), :deep(section.credit)
        background-color: var(--color-soft-wind)

      :deep(section.credit)
        background-color: var(--color-soil)

      :deep(section.takeaways)
        background: var(--gradient-chill-night)
</style>
