<script lang="ts">
  import { defineComponent } from 'vue'
  import { i18n } from '@/lang'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import ContentContainer from '@/components/patterns/ContentContainer.vue'
  import { Heart, Briefcase, FlaskConical, Mail, Archive } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Universe',
    components: {
      Footer,
      Button,
      ContentContainer,
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
    data: function() {
      return {
        tooltip: {
          isActive: false as boolean,
          name: '' as string,
          title: '' as string,
          description: '' as string
        } as any ,
        universe: [
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
            path: 'https://school.involt.io',
            icon: 'Archive'
          },
        ] as any
      }
    },
    methods: {
      expandTooltip(e: any) {
        this.tooltip.isActive = true
        this.tooltip.name = e.target.id
        this.tooltip.title = i18n.global.t(`universe.${e.target.id}.title`)
        this.tooltip.description = i18n.global.t(`universe.${e.target.id}.description`)
      },
      collapseTooltip(e: any) {
        this.tooltip = {
          isActive: false
        }
      }
    }
  })
</script>

<template>
  <main class="page">
    <section class="menu">
      <ul class="menu__items">
        <li v-for="(world, index) in universe" :key="universe.name">
          <Transition name="slide-up" appear :style="`--delay: calc(var(--delay-turtoise) + ${index * 100}ms)`">
            <Button
              :id="world.name"
              type="primary"
              :path="world.path"
              layout="ICON-ONLY"
              position="random"
              @mouseover="expandTooltip"
              @mouseout="collapseTooltip"
              @focusin="expandTooltip"
              @focusout="collapseTooltip"
              :theme="theme"
            >
              <template #icon>
                <Component :is="world.icon" :size="24" />
              </template>
            </Button>
          </Transition>
        </li>
      </ul>
      <div class="menu__info">
        <Transition name="switch">
          <ContentContainer
            v-if="tooltip.isActive"
            :title="tooltip.title"
            :description="tooltip.description"
          />
        </Transition>
      </div>
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
  .page
    height: 100vh
    overflow: hidden

  .menu
    grid-area: main
    padding: 0 var(--layout-center)
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-row-gap) 0

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
      gap: 0 var(--layout-column-gap)
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
