<script lang="ts">
  import { i18n } from '@/lang'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import Container from '@/components/ui/Container.vue'
  import { Heart, Briefcase, FlaskConical, Mail, Archive } from 'lucide-vue-next'

  export default {
    name: 'Universes',
    components: {
      Footer,
      Button,
      Container,
      Heart,
      Briefcase,
      FlaskConical,
      Mail,
      Archive
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data() {
      return {
        tooltip: {
          isActive: false
        },
        universes: [
          {
            name: 'core',
            path: '/_core',
            icon: 'Heart'
          },
          {
            name: 'work',
            path: '/_work',
            icon: 'Briefcase'
          },{
            name: 'lab',
            path: '/_lab',
            icon: 'FlaskConical'
          },{
            name: 'contact',
            path: '/_contact',
            icon: 'Mail'
          },{
            name: 'archive',
            path: '/_archive',
            icon: 'Archive'
          },
        ]
      }
    },
    methods: {
      expandTooltip(e) {
        this.tooltip.isActive = true
        this.tooltip.name = e.target.id
        this.tooltip.title = i18n.global.t(`universes.${e.target.id}.title`)
        this.tooltip.description = i18n.global.t(`universes.${e.target.id}.description`)
      },
      collapseTooltip(e) {
        this.tooltip = {
          isActive: false
        }
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="menu">
      <div class="menu__info">
        <Transition name="switch">
          <Container
            v-if="tooltip.isActive"
            :title="tooltip.title"
            :description="tooltip.description"
          />
        </Transition>
      </div>
      <ul class="menu__items">
        <li v-for="(universe, index) in universes" :key="universe.name">
          <Transition name="slide-up" appear :style="`--delay: calc(var(--delay-turtoise) + ${index * 100}ms)`">
            <Button
              :id="universe.name"
              type="primary"
              :path="universe.path"
              layout="ICON-ONLY"
              position="random"
              @mouseover="expandTooltip"
              @mouseout="collapseTooltip"
              @focusin="expandTooltip"
              @focusout="collapseTooltip"
              :theme="theme"
            >
              <template #icon>
                <Component :is="universe.icon" :size="24" />
              </template>
            </Button>
          </Transition>
        </li>
      </ul>
    </section>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="left"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .menu
    grid-area: main
    padding: var(--spacing-xl-600) var(--layout-center)
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-column-gap) 0

    &__info
      display: flex
      flex: 2
      justify-content: center
      align-items: center

      & > div
        flex: 0 1 75%
        width: 75%

    &__items
      display: flex
      flex: 1
      gap: var(--layout-column-gap)
      padding: 0

      & > li
        flex: 1

  @include device.tablet
    .menu
      &__info
        display: none

  @include device.mobile
    .menu
      padding: var(--layout-paragraph-gap) var(--layout-center)

      &__info
        display: none

      &__items
        flex-flow: column nowrap

</style>
