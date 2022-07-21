<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { Vue3Lottie } from 'vue3-lottie'
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
    props: {
      projects: [Array, Object],
      activeProjectPosition: Number
    },
    data() {
      return {
        activeProjectCodeName: this.projects[this.activeProjectPosition].meta.codeName,
        position: this.activeProjectPosition,
        duration: 2000,
        direction: 'right',
        theme: this.projects[this.activeProjectPosition].meta.theme
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
        this.activeProjectCodeName = this.projects[this.position].meta.codeName
        this.theme = this.projects[this.position].meta.theme
        this.$emit('activeProjectPosition', this.position)
      },
      splitLetters(el) {
        const
          label = el.innerText,
          split = label.split('')

        el.innerHTML = ''

        split.forEach((chr, index) => {
          const shard = document.createElement('span')
          shard.innerHTML = chr
          shard.classList.add('shard')
          shard.style = `--order: ${index}`
          el.appendChild(shard)
        })
      }
    },
    created() {
      this.$emit('activeProjectPosition', this.position)
    }
  }
</script>

<template>
  <main class="page">
    <div class="background">
      <Transition name="scale-up" :duration="duration" mode="out-in" class="background__item" appear>
        <div v-if="activeProjectCodeName === projects[0].meta.codeName" style="background: url(/src/assets/images/_work/_ui_color_palette/background.svg) 50% / cover no-repeat"></div>
        <div v-else-if="activeProjectCodeName === projects[1].meta.codeName" style="background: url(/src/assets/images/_work/_jeprendsquoi/background.svg) 50% / cover no-repeat"></div>
        <div v-else-if="activeProjectCodeName === projects[2].meta.codeName" style="background: url(/src/assets/images/_work/_jean_bobby_radio/background.png) 50% repeat ; mix-blend-mode : color-dodge"></div>
        <div v-else-if="activeProjectCodeName === projects[3].meta.codeName"></div>
        <div v-else-if="activeProjectCodeName === projects[4].meta.codeName" style="background: url(/src/assets/images/_work/_iobeya_whiteboard/background.png) 0% 0% no-repeat ; mix-blend-mode : overlay"></div>
      </Transition>
    </div>
    <section class="work">
      <div class="work__illustration" :style="direction === 'right' ? '--offset: -100vw' : '--offset: 100vw'">
        <Transition name="across" :duration="duration" mode="out-in" class="work__illustration__item" appear>
          <Vue3Lottie v-if="activeProjectCodeName === projects[0].meta.codeName" :animationData="projects[0].meta.illustration" />
          <img v-else-if="activeProjectCodeName === projects[1].meta.codeName" :src="projects[1].meta.illustration" />
          <Vue3Lottie v-else-if="activeProjectCodeName === projects[2].meta.codeName" :animationData="projects[2].meta.illustration" />
          <Vue3Lottie v-else-if="activeProjectCodeName === projects[3].meta.codeName" :animationData="projects[3].meta.illustration" />
          <Vue3Lottie v-else-if="activeProjectCodeName === projects[4].meta.codeName" :animationData="projects[4].meta.illustration" />
        </Transition>
      </div>
      <aside class="work__summary">
        <div class="work__summary__description">
          <div class="work__title" :data-theme="theme">
            <Transition name="wheel" mode="out-in" :duration="duration" @before-leave="splitLetters" @before-enter="splitLetters" appear>
              <h2 v-if="activeProjectCodeName === projects[0].meta.codeName">{{ projects[0].meta.codeName }}</h2>
              <h2 v-else-if="activeProjectCodeName === projects[1].meta.codeName">{{ projects[1].meta.codeName }}</h2>
              <h2 v-else-if="activeProjectCodeName === projects[2].meta.codeName">{{ projects[2].meta.codeName }}</h2>
              <h2 v-else-if="activeProjectCodeName === projects[3].meta.codeName">{{ projects[3].meta.codeName }}</h2>
              <h2 v-else-if="activeProjectCodeName === projects[4].meta.codeName">{{ projects[4].meta.codeName }}</h2>
            </Transition>
            <Transition name="slide-right" :duration="duration * 1.5" mode="out-in" appear>
              <div v-if="activeProjectCodeName === projects[0].meta.codeName">
                <p>{{ projects[0].meta.summary }}</p>
              </div>
              <div v-else-if="activeProjectCodeName === projects[1].meta.codeName">
                <p>{{ projects[1].meta.summary }}</p>
              </div>
              <div v-else-if="activeProjectCodeName === projects[2].meta.codeName">
                <p>{{ projects[2].meta.summary }}</p>
              </div>
              <div v-else-if="activeProjectCodeName === projects[3].meta.codeName">
                <p>{{ projects[3].meta.summary }}</p>
              </div>
              <div v-else-if="activeProjectCodeName === projects[4].meta.codeName">
                <p>{{ projects[4].meta.summary }}</p>
              </div>
            </Transition>
          </div>
          <ul class="work__data" :data-theme="theme">
            <Transition class="work__data__item" name="slide-right" :duration="duration * 1.5" mode="out-in" appear>
              <li v-if="activeProjectCodeName === projects[0].meta.codeName">
                <h6>{{ $t("global.date") }}</h6>
                <p>{{ projects[0].meta.date }}</p>
              </li>
              <li v-else-if="activeProjectCodeName === projects[1].meta.codeName">
                <h6>{{ $t("global.date") }}</h6>
                <p>{{ projects[1].meta.date }}</p>
              </li>
              <li v-else-if="activeProjectCodeName === projects[2].meta.codeName">
                <h6>{{ $t("global.date") }}</h6>
                <p>{{ projects[2].meta.date }}</p>
              </li>
              <li v-else-if="activeProjectCodeName === projects[3].meta.codeName">
                <h6>{{ $t("global.date") }}</h6>
                <p>{{ projects[3].meta.date }}</p>
              </li>
              <li v-else-if="activeProjectCodeName === projects[4].meta.codeName">
                <h6>{{ $t("global.date") }}</h6>
                <p>{{ projects[4].meta.date }}</p>
              </li>
            </Transition>
          </ul>
        </div>
        <div class="work__summary__actions">
          <Transition name="switch" mode="out-in" :duration="duration" style="--delay: 0ms" appear>
            <Button
              v-if="theme === 'DEFAULT'"
              type="secondary"
              path=""
              layout="ICON-ONLY"
              :theme="theme"
              @click="previousProject"
            >
              <template #icon>
                <ArrowLeft :size="24" />
              </template>
            </Button>
            <Button
              v-else-if="theme === 'DARK'"
              type="secondary"
              path=""
              layout="ICON-ONLY"
              :theme="theme"
              @click="previousProject"
            >
              <template #icon>
                <ArrowLeft :size="24" />
              </template>
            </Button>
          </Transition>
          <Transition name="switch" mode="out-in" :duration="duration" style="--delay: 100ms" appear>
            <Button
              v-if="theme === 'DEFAULT'"
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
              v-else-if="theme === 'DARK'"
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
          </Transition>
          <Transition name="switch" mode="out-in" :duration="duration" style="--delay: 200ms" appear>
            <Button
              v-if="theme === 'DEFAULT'"
              type="secondary"
              path=""
              layout="ICON-ONLY"
              :theme="theme"
              @click="nextProject"
            >
              <template #icon>
                <ArrowRight :size="24" />
              </template>
            </Button>
            <Button
              v-else-if="theme === 'DARK'"
              type="secondary"
              path=""
              layout="ICON-ONLY"
              :theme="theme"
              @click="nextProject"
            >
              <template #icon>
                <ArrowRight :size="24" />
              </template>
            </Button>
          </Transition>
        </div>
      </aside>
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

  .page
    background: v-bind('projects[activeProjectPosition].meta.background')
    transition: background var(--duration-grandma) var(--ease-vroom)

  //Structure
  .background
    width: 100vw
    height: 100vh
    position: absolute
    overflow: hidden

    &__item
      width: 100%
      height: 100%

  .work
    --starting-point: var(--spacing-xxl-000)

    grid-area: main
    display: flex
    flex-flow: row nowrap
    padding: var(--spacing-xl-600) var(--layout-center)
    gap: var(--layout-column-gap)

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

    &__summary
      flex: 0 1 480rem
      display: flex
      flex-flow: column nowrap
      justify-content: space-between
      gap: var(--layout-column-gap)

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
      gap: var(--text-label-space)

      h2
        display: flex
        flex-flow: row wrap

    &__data
      display: flex
      flex-flow: column nowrap
      padding: 0
      gap: var(--layout-column-gap)

      &__item
        --delay: var(--delay-hare)

  @include device.tablet
    .work
      flex-flow: column nowrap

      &__illustration
        &__item
          height: 125%

      &__summary
        flex: 1

        &__actions
          justify-content: center

  @include device.mobile-landscape
    .work
      padding: 0 var(--layout-center)

      &__illustration
        display: none

      &__summary
        &__description
          gap: var(--layout-label-gap)

        &__actions
          justify-content: center

  @include device.mobile
    .work
      flex-flow: column nowrap

      &__illustration
        display: none

      &__summary
        flex: 1

        &__actions
          justify-content: center

  // Aspect
  [data-theme="DARK"]
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
    transform: translateX(var(--offset)) scale(0.25)

  :deep(.across-enter-from)
    transform: translateX(calc(var(--offset) * -1)) scale(0.25)
</style>
