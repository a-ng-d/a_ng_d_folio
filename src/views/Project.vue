<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import Container from '@/components/ui/Container.vue'
  import _ui_color_palette from '@/contexts/_work/_ui_color_palette.vue'
  import _jeprendsquoi from '@/contexts/_work/_jeprendsquoi.vue'

  export default {
    name: 'Project',
    components: {
      Footer,
      Button,
      ScrollingText,
      OneColumn,
      WrapColumn,
      Container,
      _ui_color_palette,
      _jeprendsquoi
    },
    props: {
      project: Object
    },
    data() {
      return {
        theme: 'default'
      }
    }
  }
</script>

<template>
  <main class="page">
    <article class="details">
      <section class="title">
        <ScrollingText
          :label="$t(`work.${project.codeName}.shortTitle`)"
          :theme="theme"
        />
      </section>
      <section class="description">
        <OneColumn
          :theme="theme"
        >
          <template #plain>
            <p class="enhanced" v-html="$t(`work.${project.codeName}.description`)"></p>
          </template>
        </OneColumn>
      </section>
      <section class="overview">
        <OneColumn
          :title="$t('global.overview')"
          :theme="theme"
        />
        <WrapColumn
          :title="$t('global.date')"
          isSubSection
          :theme="theme"
        >
          <template #plain>
            <Container :description="$t(`work.${project.codeName}.misc.date`)" />
          </template>
        </WrapColumn>
        <WrapColumn
          :title="$t('global.objectives')"
          isSubSection
          :theme="theme"
        >
          <template #plain>
            <Container v-for="(objective, index) in project.objectives" :title="`#${index + 1}`" :description="objective" />
          </template>
        </WrapColumn>
        <WrapColumn
          :title="$t('global.roles')"
          isSubSection
          :theme="theme"
        >
          <template #plain>
            <Container v-for="(role, index) in project.roles" :title="`#${index + 1}`" :description="role" />
          </template>
        </WrapColumn>
      </section>
      <Component
        :is="$t(`work.${project.codeName}.shortTitle`)"
        :theme="theme"
      />
    </article>
    <Footer
      alignment="center"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .details
    grid-area: main
    margin-top: calc(var(--header-height-size) * -1)

  .title, .description
    height: 100vh
    justify-content: center

  .title
    padding: var(--sizing-s-000)

  @include device.mobile
    .description
      height: fit-content

  // Aspect
  .page
    background-color: var(--color-creamy-sun)

  .title
    background: linear-gradient(var(--color-cream), var(--color-cream)) content-box, var(--gradient-biscarosse-sunset) padding-box

  .description
    background-color: var(--color-cream)

  .overview
    background-color: var(--color-soft-wind)

  :deep(section.challenge)
    background-color: var(--color-candy-floss)

  :deep(section.success)
    background-color: var(--color-soft-wind)

  :deep(section.takeaways)
    background: var(--gradient-biscarosse-sunset)
</style>
