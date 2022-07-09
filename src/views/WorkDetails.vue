<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import Container from '@/components/ui/Container.vue'
  import _ui_color_palette from '@/contexts/_work/_ui_color_palette.vue'

  export default {
    name: 'WorkDetails',
    components: {
      Footer,
      Button,
      ScrollingText,
      OneColumn,
      WrapColumn,
      Container,
      _ui_color_palette
    },
    props: {
      title: String,
      description: String,
      misc: Object,
      context: String,
      theme: {
        type: String,
        default: 'default'
      }
    }
  }
</script>

<template>
  <main class="page">
    <article class="details">
      <section class="title">
        <ScrollingText
          :label="title"
          :theme="theme"
        />
      </section>
      <section class="description">
        <OneColumn
          :theme="theme"
        >
          <template #plain>
            <p class="enhanced" v-html="description"></p>
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
            <Container :description="misc.date" />
          </template>
        </WrapColumn>
        <WrapColumn
          :title="$t('global.objectives')"
          isSubSection
          :theme="theme"
        >
          <template #plain>
            <Container v-for="(objective, index) in misc.objectives" :title="`#${index + 1}`" :description="objective" />
          </template>
        </WrapColumn>
        <WrapColumn
          :title="$t('global.roles')"
          isSubSection
          :theme="theme"
        >
          <template #plain>
            <Container v-for="(role, index) in misc.roles" :title="`#${index + 1}`" :description="role" />
          </template>
        </WrapColumn>
      </section>
      <Component
        :is="context"
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
  // Structure
  .details
    grid-area: main
    margin-top: calc(var(--header-height-size) * -1)

  .title, .description
    height: 100vh
    justify-content: center

  .title
    padding: var(--sizing-s-000)

  // Aspect
  .page
    background-color: var(--color-creamy-sun)

  .title
    background: linear-gradient(var(--color-cream), var(--color-cream)) content-box, var(--gradient-biscarosse-sunset) padding-box

  .description
    background-color: var(--color-cream)

  .overview
    background-color: var(--color-soft-wind)
</style>
