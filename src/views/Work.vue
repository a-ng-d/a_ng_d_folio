<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-vue-next'

  export default {
    name: 'Work',
    components: {
      Footer,
      Button,
      ArrowLeft,
      ArrowRight,
      ArrowDown
    },
    data() {
      return {
        projects: ['_ui_color_palette', '_jeprendsquoi', '_jean_bobby_radio', '_awesome_ipsums', '_iobeya_whiteboarding_session'],
        currentProject: '_ui_color_palette',
        position: 0,
        imagePath: '',
        projectPath: '',
        theme: 'dark'
      }
    },
    methods: {
      previousProject() {
        this.position == 0 ? this.position = (this.projects.length - 1) : this.position--
        this.currentProject = this.projects[this.position]
        this.imagePath = `src/assets/images/work/${this.projects[this.position]}/main.png`
      },
      nextProject() {
        this.position == (this.projects.length - 1) ? this.position = 0 : this.position++
        this.currentProject = this.projects[this.position]
        this.imagePath = `src/assets/images/work/${this.projects[this.position]}/main.png`
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="work">
      <figure class="work__illustration">
        <template v-for="project in projects">
          <Transition name="switch" mode="out-in">
            <img :src="imagePath" />
          </Transition>
        </template>
      </figure>
      <aside class="work__summary">
        <template v-for="project in projects">
          <Transition name="switch" mode="out-in" appear>
            <div v-if="currentProject === project" :key="project" class="work__summary__description">
              <div class="work__title">
                <h2>{{ $t(`work.${project}.title`) }}</h2>
                <p>{{ $t(`work.${project}.description`) }}</p>
              </div>
              <ul class="work__data">
                <li class="work__data__item">
                  <h6>{{ $t("work.date") }}</h6>
                  <p>{{ $t(`work.${project}.date`) }}</p>
                </li>
              </ul>
            </div>
          </Transition>
        </template>
        <div class="work__summary__actions">
          <Button
            type="secondary"
            path="#"
            layout="icon-only"
            theme="default"
            @click="previousProject"
          >
            <template #icon>
              <ArrowLeft :size="24" />
            </template>
          </Button>
          <Button
            type="primary"
            :label="$t('global.go')"
            path="#"
            layout="left-icon"
            theme="default"
          >
            <template #icon>
              <ArrowDown :size="24" />
            </template>
          </Button>
          <Button
            type="secondary"
            path="#"
            layout="icon-only"
            theme="default"
            @click="nextProject"
          >
            <template #icon>
              <ArrowRight :size="24" />
            </template>
          </Button>
        </div>
      </aside>
    </section>
    <Footer
      alignment="left"
      theme="default"
    />
  </main>
</template>

<style scoped lang="sass">
  .page
    background: url(@/assets/images/work/_jeprendsquoi/background.svg) var(--color-titanium-white)
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    mix-blend-mode: lighten

  //Structure
  .work
    grid-area: main
    display: flex
    flex-flow: row nowrap
    padding: var(--spacing-xl-600) var(--layout-center)
    gap: var(--layout-column-gap)

    &__illustration
      flex: 1

      img
        position: absolute
        top: 50%
        transform: translateY(-50%)


    &__summary
      flex: 0 1 33%
      display: flex
      flex-flow: column nowrap
      justify-content: space-between

      &__description
        display: flex
        flex-flow: column nowrap
        gap: var(--layout-box-gap)

      &__actions
        display: flex
        gap: var(--layout-column-gap)

    &__title
      display: flex
      flex-flow: column nowrap
      gap: calc(var(--layout-paragraph-gap) / 2)

    &__data
      display: flex
      flex-flow: column nowrap
      padding: 0
      gap: var(--layout-column-gap)
</style>
