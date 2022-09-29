<script lang="ts">
  import { defineComponent } from 'vue'
  import type { Route } from '@/utilities/types'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import VLazyImage from 'v-lazy-image'
  import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Work',
    components: {
      Footer,
      Button,
      VLazyImage,
      ArrowLeft,
      ArrowRight,
      ArrowDown
    },
    props: {
      projects: {
        type: Array,
        required: true
      },
      activeProjectPosition: {
        type: Number,
        required: true
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        activeProjectCodeName: (this.projects[(this.activeProjectPosition as number)] as Route).meta.codeName as string,
        position: this.activeProjectPosition as number,
        duration: 2000 as number,
        direction: 'right' as string,
        touchStart: 0 as number
      }
    },
    methods: {
      previousProject() {
        this.direction = 'left'
        this.position == 0 ? this.position = (this.projects.length - 1) : this.position--
        this.switchProject()
      },
      nextProject() {
        this.direction = 'right'
        this.position == (this.projects.length - 1) ? this.position = 0 : this.position++
        this.switchProject()
      },
      switchProject() {
        this.activeProjectCodeName = (this.projects[this.position] as Route).meta.codeName
        this.$emit('theme', (this.projects[this.position] as Route).meta.theme)
        this.$emit('activeProjectPosition', this.position)
        this.$emit('activeProjectBackground', (this.projects[this.position] as Route).meta.background)
        setTimeout(() => this.$emit('activeProjectPov', (this.projects[this.position] as Route).meta.pov), 1500)
      },
      splitLetters(el: HTMLElement) {
        const
          title: any = el.children[0],
          label: string = title.innerText,
          split: Array<string> = label.split('')

        title.innerHTML = ''

        split.forEach((chr, index) => {
          const shard: any = document.createElement('span')
          shard.innerHTML = chr
          shard.classList.add('shard')
          shard.style = `--order: ${index}`
          title.appendChild(shard)
        })
      },
      lockTouchStart(e: any) {
        this.touchStart = e.changedTouches[0].clientX
      },
      shoudSwipeProject(e: any) {
        const delta: number = this.touchStart - e.changedTouches[0].clientX
        if (delta < -200) return this.previousProject()
        else if (delta > 200) return this.nextProject()
      }
    },
    created: function() {
      this.$emit('activeProjectPosition', this.position)
      this.$emit('activeProjectBackground', (this.projects[this.position] as Route).meta.background)
      this.$emit('activeProjectPov', (this.projects[this.position] as Route).meta.pov)
    }
  })
</script>

<template>
  <main class="page" @touchstart.passive="lockTouchStart" @touchend.passive="shoudSwipeProject">
    <div class="background">
      <Transition name="scale-up" :duration="duration" mode="out-in" class="background__item">
        <div v-if="activeProjectCodeName === (projects[0] as any).meta.codeName"></div>
        <div v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName" style="background: url(/images/_work/_jeprendsquoi/background.svg) 50% / cover no-repeat"></div>
        <div v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName"></div>
        <div v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName"></div>
        <div v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName"></div>
        <div v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName" style="background: url(/images/_work/_iobeya_whiteboard/background.png) 0% 0% no-repeat"></div>
      </Transition>
    </div>
    <Transition name="slide-up" appear style="--delay: var(--duration-turtoise)">
      <article class="work" :data-theme="theme">
        <div class="work__illustration" :style="direction === 'right' ? '--offset: -100vw' : '--offset: 100vw'">
          <Transition name="across" :duration="duration" mode="out-in" class="work__illustration__item">
            <Vue3Lottie v-if="activeProjectCodeName === (projects[0] as any).meta.codeName" :animationData="((projects[0] as any) as any).meta.illustration" :rendererSettings="{ progressiveLoad: true }" />
            <v-lazy-image v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName" :src="(projects[1] as any).meta.illustration" />
            <Vue3Lottie v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName" :animationData="(projects[2] as any).meta.illustration" :rendererSettings="{ progressiveLoad: true }" />
            <Vue3Lottie v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName" :animationData="(projects[3] as any).meta.illustration" :rendererSettings="{ progressiveLoad: true }" />
            <Vue3Lottie v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName" :animationData="(projects[4] as any).meta.illustration" :rendererSettings="{ progressiveLoad: true }" />
            <Vue3Lottie v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName" :animationData="(projects[5] as any).meta.illustration" :rendererSettings="{ progressiveLoad: true }" />
          </Transition>
        </div>
        <aside class="work__summary">
          <div class="work__summary__description">
            <div class="work__title">
              <Transition name="wheel" mode="out-in" :duration="duration" @before-leave="splitLetters" @before-enter="splitLetters" appear>
                <div v-if="activeProjectCodeName === (projects[0] as any).meta.codeName">
                  <h2>{{ (projects[0] as any).meta.codeName }}</h2>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName">
                  <h2>{{ (projects[1] as any).meta.codeName }}</h2>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName">
                  <h2>{{ (projects[2] as any).meta.codeName }}</h2>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName">
                  <h2>{{ (projects[3] as any).meta.codeName }}</h2>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName">
                  <h2>{{ (projects[4] as any).meta.codeName }}</h2>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName">
                  <h2>{{ (projects[5] as any).meta.codeName }}</h2>
                </div>
              </Transition>
              <Transition name="slide-right" :duration="duration * 1.5" mode="out-in">
                <div v-if="activeProjectCodeName === (projects[0] as any).meta.codeName">
                  <p>{{ (projects[0] as any).meta.summary }}</p>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName">
                  <p>{{ (projects[1] as any).meta.summary }}</p>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName">
                  <p>{{ (projects[2] as any).meta.summary }}</p>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName">
                  <p>{{ (projects[3] as any).meta.summary }}</p>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName">
                  <p>{{ (projects[4] as any).meta.summary }}</p>
                </div>
                <div v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName">
                  <p>{{ (projects[5] as any).meta.summary }}</p>
                </div>
              </Transition>
            </div>
            <ul class="work__data">
              <Transition class="work__data__item" name="slide-right" :duration="duration * 1.5" mode="out-in">
                <li v-if="activeProjectCodeName === (projects[0] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[0] as any).meta.date }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[1] as any).meta.date }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[2] as any).meta.date }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[3] as any).meta.date }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[4] as any).meta.date }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName">
                  <h6>{{ $t("global.date") }}</h6>
                  <p>{{ (projects[5] as any).meta.date }}</p>
                </li>
              </Transition>
              <Transition class="work__data__item" name="slide-right" :duration="duration * 1.6" mode="out-in">
                <li v-if="activeProjectCodeName === (projects[0] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[0] as any).meta.type }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[1] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[1] as any).meta.type }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[2] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[2] as any).meta.type }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[3] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[3] as any).meta.type }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[4] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[4] as any).meta.type }}</p>
                </li>
                <li v-else-if="activeProjectCodeName === (projects[5] as any).meta.codeName">
                  <h6>{{ $t("global.type.label") }}</h6>
                  <p>{{ (projects[5] as any).meta.type }}</p>
                </li>
              </Transition>
            </ul>
          </div>
          <Transition name="slide-right" :duration="duration * 2" mode="out-in" appear>
            <div class="work__summary__actions">
              <Button
                type="secondary"
                layout="ICON-ONLY"
                :theme="theme"
                @click="previousProject"
              >
                <template #icon>
                  <ArrowLeft :size="24" />
                </template>
              </Button>
              <Button
                type="primary"
                :label="$t('global.go')"
                :path="`/_work/${activeProjectCodeName}`"
                layout="ICON-LEFT"
                :theme="theme"
              >
                <template #icon>
                  <ArrowDown :size="24" />
                </template>
              </Button>
              <Button
                type="secondary"
                layout="ICON-ONLY"
                :theme="theme"
                @click="nextProject"
              >
                <template #icon>
                  <ArrowRight :size="24" />
                </template>
              </Button>
            </div>
          </Transition>
        </aside>
      </article>
    </Transition>
    <Transition name="pull-up" style="--delay: var(--delay-turtoise)" appear>
      <Footer
        alignment="left"
        :theme="theme"
      />
    </Transition>
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  //Structure
  .page
    height: 100%
    overflow: hidden

  .background
    width: 100%
    height: 100%
    position: absolute
    overflow: hidden
    transition: var(--grandma-transition)

    &__item
      width: 100%
      height: 100%

  .work
    --starting-point: var(--spacing-xxl-000)

    grid-area: main
    display: flex
    flex-flow: row nowrap
    justify-content: center
    padding: 0 var(--layout-center)
    gap: 0 var(--layout-column-gap)

    &__background
      width: 100%
      height: 100%
      position: absolute

    &__illustration
      flex: 1
      display: flex
      justify-content: center
      align-items: center

      &__item
        position: absolute
        height: 90vh
        width: 100%
        object-fit: contain

        &.v-lazy-image
          opacity: 0

        &.v-lazy-image.v-lazy-image-loaded
          opacity: 1

    &__summary
      --delay: 0ms

      flex: 0 1 480rem
      display: flex
      flex-flow: column nowrap
      justify-content: space-evenly
      gap: var(--layout-row-gap) 0

      &__description
        display: flex
        flex-flow: column nowrap
        gap: var(--layout-box-gap)

      &__actions
        display: flex
        gap: 0 var(--layout-column-gap)

        a:nth-child(2)
          flex: 1

    &__title
      display: flex
      flex-flow: column nowrap
      gap: var(--text-label-space)

      h2
        display: flex
        flex-flow: row wrap

    &__data
      display: flex
      flex-flow: column nowrap
      padding: 0
      gap: var(--layout-row-gap) 0

      &__item
        --delay: var(--delay-hare)

  @include device.tablet
    .work
      &__illustration
        flex: 2

        &__item
          height: 125%

      &__summary
        flex: 1.5

        &__actions
          justify-content: center

  @include device.tablet-portrait
    .work
      flex-flow: column nowrap

      &__summary
        flex: 1
        justify-content: space-between

        &__actions
          a:nth-child(2)
            flex: none

  @include device.smartphone-landscape
    .work
      padding: 0 var(--layout-center)
      flex-flow: row nowrap

      &__illustration
        flex: 2

        &__item
          height: 125%

      &__summary
        justify-content: space-between

        &__actions
          justify-content: center

          a:nth-child(2)
            flex: none

  @include device.smartphone
    .work
      flex-flow: column nowrap

      &__illustration
        flex: 1

        &__item
          height: 125%

      &__summary
        flex: 1
        justify-content: space-between

        &__actions
          justify-content: center

  // Aspect
  .work
    &[data-theme="DARK"]
      --text-color: var(--color-cream)

  // Animation
  :deep(.wheel-leave-active) .shard,
  :deep(.wheel-enter-active) .shard
    transform-origin: -200% 100%

  :deep(.wheel-leave-active) .shard
    --gap: -90deg
    animation: wheel var(--duration-running) calc(var(--order, 1) * var(--delay-asynchrone) + var(--delay-running)) var(--ease-inverted-rebound) forwards

  :deep(.wheel-enter-active) .shard
    --gap: 90deg
    animation: wheel var(--duration-running) calc(var(--order, 1) * var(--delay-asynchrone) + var(--delay-running)) var(--ease-inverted-rebound) backwards reverse

  :deep(.across-leave-active)
    transition: transform var(--duration-jogging) var(--delay-jogging) var(--ease-inverted-rebound)

  :deep(.across-enter-active)
    transition: transform var(--duration-jogging) var(--ease-rebound)

  :deep(.across-leave-to)
    transform: translateX(var(--offset)) scale(.25)

  :deep(.across-enter-from)
    transform: translateX(calc(var(--offset) * -1)) scale(.25)
</style>
