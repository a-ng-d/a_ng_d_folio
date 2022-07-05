<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ScrollingText from '@/components/ui/ScrollingText.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import Container from '@/components/ui/Container.vue'
  import { } from 'lucide-vue-next'

  export default {
    name: 'WorkDetails',
    components: {
      Footer,
      Button,
      ScrollingText,
      OneColumn,
      WrapColumn,
      Container
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
    },
    data() {
      return {

      }
    },
    methods: {

    },
    created() {

    }
  }
</script>

<template>
  <main class="page">
    <section class="details">
      <section class="title">
        <ScrollingText
          :label="title"
          :theme="theme"
        />
      </section>
      <section class="intro">
        <OneColumn
          :theme="theme"
        >
          <template #plain>
            <p class="enhanced">{{ description }}</p>
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
      <section class="content">
        <Component :is="context" />
      </section>
    </section>
    <Footer
      alignment="center"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .details
    grid-area: main
</style>
