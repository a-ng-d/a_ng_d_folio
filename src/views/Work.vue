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
        projects: [{
            name: '_ui_color_palette',
            background: '#88EBF9'
          },
          {
            name: '_jeprendsquoi',
            background: '#FFF'
          }, {
            name: '_jean_bobby_radio',
            background: '#190038'
          }, {
            name: '_awesome_ipsums',
            background: '#23A566'
          }, {
            name: '_iobeya_whiteboarding_session',
            background: '#001D5E'
        }],
        currentProject: '_ui_color_palette',
        position: 0,
        projectPath: '',
        duration: 2000,
        theme: 'default'
      }
    },
    methods: {
      previousProject() {
        this.position == 0 ? this.position = (this.projects.length - 1) : this.position--
        this.switchProject()
      },
      nextProject() {
        this.position == (this.projects.length - 1) ? this.position = 0 : this.position++
        this.switchProject()
      },
      switchProject() {
        this.currentProject = this.projects[this.position].name
        this.$emit('projectsMeta', {
          total: this.projects.length,
          active: this.position
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
        active: this.position
      })
    }
  }
</script>

<template>
  <main class="page">
    <section class="work">
      <figure class="work__illustration">
        <template v-for="project in projects">
          <Transition mode="out-in">
            <img v-if="currentProject === project" :src="imagePath" />
          </Transition>
        </template>
      </figure>
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
              <p v-if="currentProject === projects[0].name">{{ $t(`work.${projects[0].name}.description`) }}</p>
              <p v-else-if="currentProject === projects[1].name">{{ $t(`work.${projects[1].name}.description`) }}</p>
              <p v-else-if="currentProject === projects[2].name">{{ $t(`work.${projects[2].name}.description`) }}</p>
              <p v-else-if="currentProject === projects[3].name">{{ $t(`work.${projects[3].name}.description`) }}</p>
              <p v-else-if="currentProject === projects[4].name">{{ $t(`work.${projects[4].name}.description`) }}</p>
            </Transition>
          </div>
          <ul class="work__data" :data-theme="theme">
            <Transition name="slide-right" :duration="duration * 1.5" mode="out-in" appear>
              <li v-if="currentProject === projects[0].name" class="work__data__item">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[0].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[1].name" class="work__data__item">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[1].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[2].name" class="work__data__item">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[2].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[3].name" class="work__data__item">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[3].name}.date`) }}</p>
              </li>
              <li v-else-if="currentProject === projects[4].name" class="work__data__item">
                <h6>{{ $t("work.date") }}</h6>
                <p>{{ $t(`work.${projects[4].name}.date`) }}</p>
              </li>
            </Transition>
          </ul>
        </div>
        <div class="work__summary__actions">
          <Button
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
    background-repeat: no-repeat
    background-size: cover
    background-position: center
    transition: background var(--delay-snail) var(--ease-vroom)

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
      --offset: -90deg
      animation: wheel var(--duration-running) calc(var(--order, 1) * var(--delay-asynchrone) + var(--delay-running)) var(--ease-inverted-rebound) forwards

    :deep(.wheel-enter-active) .shard
      --offset: 90deg
      animation: wheel var(--duration-running) calc(var(--order, 1) * var(--delay-asynchrone) + var(--delay-running)) var(--ease-inverted-rebound) backwards reverse
</style>
