<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { Vue3Lottie } from 'vue3-lottie'
  import JBRAnimation from '@/assets/images/_work/_jean_bobby_radio/animation.json'
  import UCPAnimation from '@/assets/images/_work/_ui_color_palette/animation.json'
  import AIAnimation from '@/assets/images/_work/_awesome_ipsums/animation.json'
  import IWAnimation from '@/assets/images/_work/_iobeya_whiteboard/animation.json'
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
        projects: [{
            name: '_ui_color_palette',
            illustration: UCPAnimation,
            background: '#88EBF9',
            theme: 'default'
          },
          {
            name: '_jeprendsquoi',
            illustration: '/src/assets/images/_work/_jeprendsquoi/illustration.png',
            background: '#FFF',
            theme: 'default'
          }, {
            name: '_jean_bobby_radio',
            illustration: JBRAnimation,
            background: '#190038',
            theme: 'dark'
          }, {
            name: '_awesome_ipsums',
            illustration: AIAnimation,
            background: '#23A566',
            theme: 'dark'
          }, {
            name: '_iobeya_whiteboard',
            illustration: IWAnimation,
            background: '#001D5E',
            theme: 'dark'
        }],
        currentProject: '_ui_color_palette',
        position: 0,
        projectPath: '',
        duration: 2000,
        direction: 'right',
        theme: 'default'
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
        this.currentProject = this.projects[this.position].name
        this.theme = this.projects[this.position].theme
        this.$emit('projectsMeta', {
          total: this.projects.length,
          active: this.position,
          theme: this.projects[this.position].theme
        })
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
      this.$emit('projectsMeta', {
        total: this.projects.length,
        active: this.position,
        theme: this.projects[this.position].theme
      })
    }
  }
</script>

<template>
  <main class="page">
    <section class="work">
      <div class="work__illustration" :style="direction === 'right' ? '--offset: -100vw' : '--offset: 100vw'">
        <Transition name="across" :duration="duration" mode="out-in" class="work__illustration__item">
          <Vue3Lottie v-if="currentProject === projects[0].name" :animationData="projects[0].illustration" />
          <img v-else-if="currentProject === projects[1].name" :src="projects[1].illustration" />
          <Vue3Lottie v-else-if="currentProject === projects[2].name" :animationData="projects[2].illustration" />
          <Vue3Lottie v-else-if="currentProject === projects[3].name" :animationData="projects[3].illustration" />
          <Vue3Lottie v-else-if="currentProject === projects[4].name" :animationData="projects[4].illustration" />
        </Transition>
      </div>
      <aside class="work__summary">
        <div class="work__summary__description">
          <div class="work__title" :data-theme="theme">
            <Transition name="wheel" mode="out-in" :duration="duration" @before-leave="splitLetters" @before-enter="splitLetters" appear>
              <h2 v-if="currentProject === projects[0].name">{{ $t(`work.${projects[0].name}.title`) }}</h2>
              <h2 v-else-if="currentProject === projects[1].name">{{ $t(`work.${projects[1].name}.title`) }}</h2>
              <h2 v-else-if="currentProject === projects[2].name">{{ $t(`work.${projects[2].name}.title`) }}</h2>
              <h2 v-else-if="currentProject === projects[3].name">{{ $t(`work.${projects[3].name}.title`) }}</h2>
              <h2 v-else-if="currentProject === projects[4].name">{{ $t(`work.${projects[4].name}.title`) }}</h2>
            </Transition>
            <Transition name="slide-right" :duration="duration * 1.5" mode="out-in" appear>
              <div v-if="currentProject === projects[0].name">
                <p>{{ $t(`work.${projects[0].name}.description`) }}</p>
              </div>
              <div v-else-if="currentProject === projects[1].name">
                <p>{{ $t(`work.${projects[1].name}.description`) }}</p>
              </div>
              <div v-else-if="currentProject === projects[2].name">
                <p>{{ $t(`work.${projects[2].name}.description`) }}</p>
              </div>
              <div v-else-if="currentProject === projects[3].name">
                <p>{{ $t(`work.${projects[3].name}.description`) }}</p>
              </div>
              <div v-else-if="currentProject === projects[4].name">
                <p>{{ $t(`work.${projects[4].name}.description`) }}</p>
              </div>
            </Transition>
          </div>
          <ul class="work__data" :data-theme="theme">
            <Transition class="work__data__item" name="slide-right" :duration="duration * 1.5" mode="out-in" appear>
              <li v-if="currentProject === projects[0].name">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[0].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[1].name">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[1].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[2].name">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[2].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[3].name">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[3].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[4].name">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[4].name}.date`) }}</p>
              </li>
            </Transition>
          </ul>
        </div>
        <div class="work__summary__actions">
          <Transition name="switch" mode="out-in" :duration="duration" style="--delay: 0ms" appear>
            <Button
              v-if="theme === 'default'"
              type="secondary"
              path=""
              layout="icon-only"
              :theme="theme"
              @click="previousProject"
            >
              <template #icon>
                <ArrowLeft :size="24" />
              </template>
            </Button>
            <Button
              v-else-if="theme === 'dark'"
              type="secondary"
              path=""
              layout="icon-only"
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
              v-if="theme === 'default'"
              type="primary"
              :label="$t('global.go')"
              path=""
              layout="left-icon"
              :theme="theme"
            >
              <template #icon>
                <ArrowDown :size="24" />
              </template>
            </Button>
            <Button
              v-else-if="theme === 'dark'"
              type="primary"
              :label="$t('global.go')"
              path=""
              layout="left-icon"
              :theme="theme"
            >
              <template #icon>
                <ArrowDown :size="24" />
              </template>
            </Button>
          </Transition>
          <Transition name="switch" mode="out-in" :duration="duration" style="--delay: 200ms" appear>
            <Button
              v-if="theme === 'default'"
              type="secondary"
              path=""
              layout="icon-only"
              :theme="theme"
              @click="nextProject"
            >
              <template #icon>
                <ArrowRight :size="24" />
              </template>
            </Button>
            <Button
              v-else-if="theme === 'dark'"
              type="secondary"
              path=""
              layout="icon-only"
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
    <Footer
      alignment="left"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .page
    background: v-bind('projects[position].background')
    transition: background var(--duration-grandma) var(--ease-vroom)

  //Structure
  .work
    --starting-point: var(--spacing-xxl-000)

    grid-area: main
    display: flex
    flex-flow: row nowrap
    padding: var(--spacing-xl-600) var(--layout-center)
    gap: var(--layout-column-gap)

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

  // Aspect
  [data-theme="dark"]
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
