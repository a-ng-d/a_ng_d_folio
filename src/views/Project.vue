<script lang="ts">
  import { defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import type { PageMeta } from '@/router/scenery'
  import { bodyOf, getProject } from '@/content/work'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'

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
    },
    computed: {
      // Le corps vient du manifeste, désigné par le slug. Plus d'imports ni
      // d'enregistrements à tenir à jour quand un projet arrive ou part.
      body() {
        const project = getProject(this.project.codeName ?? '')
        return project !== undefined ? bodyOf(project) : undefined
      },
    },
    props: {
      project: {
        type: Object as PropType<PageMeta>,
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
              ((project.position ?? 0) + 1) +
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
        v-if="body !== undefined"
        :is="body"
        :scrollProgress="scrollProgress"
        :scrollLimit="scrollLimit"
        :theme="theme"
      />
    </article>
    <Footer
      alignment="CENTER"
      :theme="theme"
      :style="{
        backgroundColor:
          theme === 'DARK' ? 'var(--color-soil)' : 'var(--color-creamy-sun)',
      }"
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
        background-color: var(--color-dry-soil)

      :deep(section.success), :deep(section.credit)
        background-color: var(--color-clear-water)

      :deep(section.takeaways)
        background: var(--gradient-chill-night)
</style>
