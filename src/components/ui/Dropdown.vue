<script lang="ts">
  import { defineComponent } from 'vue'
  import type { Option } from '@/utilities/types'
  import { store } from '@/utilities/store'
  import Button from '@/components/ui/Button.vue'
  import Container from '@/components/ui/Container.vue'
  import Label from '@/components/ui/Label.vue'
  import { ChevronDown, Check } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Dropdown',
    components: {
      Button,
      Container,
      Label,
      ChevronDown,
      Check,
    },
    props: {
      label: String,
      options: {
        type: Array,
      },
      alt: String,
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        store,
        isExpanded: false as boolean,
        activeOption: 0 as number,
        listTop: 0 as number,
        listLeft: 0 as number,
        listWidth: 0 as number,
        allOptions: this.options as Array<Option>,
      }
    },
    watch: {
      isExpanded(to) {
        if (to == false) {
          window.removeEventListener('click', this.closeOptions)
          window.removeEventListener('scroll', this.dismiss, true)
          window.removeEventListener('resize', this.dismiss)
        } else {
          window.addEventListener('scroll', this.dismiss, true)
          window.addEventListener('resize', this.dismiss)
          setTimeout(
            () => (this.$refs.option as Array<HTMLElement>)[0].focus(),
            200
          )
        }
      },
    },
    methods: {
      setOption(callback: () => void, name: string, order: number) {
        this.allOptions[this.activeOption].isActive = false
        setTimeout(() => (this.activeOption = order), 900)
        this.allOptions[order].isActive = true
        this.isExpanded = false
        callback?.()
      },
      /**
       * Places the open list against its own button.
       *
       * The list is rendered to the body so that no scrolling ancestor can
       * clip it, which means its position has to be measured rather than
       * declared. An estimate is used on opening so nothing flashes, then
       * refined once the list exists and its padding can be read off it.
       *
       * The active option is laid over the button, as before, and the whole
       * list is held inside the viewport so the topmost dropdowns stay usable.
       */
      placeList(measured?: HTMLElement) {
        const anchor = (this.$el as HTMLElement).querySelector('.button'),
          rect = (anchor || this.$el).getBoundingClientRect(),
          optionHeight = rect.height,
          count = this.allOptions.length,
          height =
            measured !== undefined
              ? measured.getBoundingClientRect().height
              : count * optionHeight + optionHeight * 0.75,
          padding = (height - count * optionHeight) / 2,
          room = window.innerHeight - height - 8

        this.listLeft = rect.left
        this.listWidth = rect.width
        this.listTop = Math.min(
          Math.max(rect.top - padding - this.activeOption * optionHeight, 8),
          room > 8 ? room : 8
        )
      },
      openOptions() {
        this.placeList()
        this.isExpanded = true
        this.$nextTick(() => {
          const list = this.$refs.list as { $el?: HTMLElement } | undefined
          if (list !== undefined && list.$el !== undefined)
            this.placeList(list.$el)
        })
        setTimeout(
          () => window.addEventListener('click', this.closeOptions),
          200
        )
      },
      closeOptions(e: Event) {
        if ((e.target as HTMLElement).closest('.dropdown__list') == null)
          this.isExpanded = false
      },
      dismiss() {
        this.isExpanded = false
      },
      browseOptions(e: FocusEvent) {
        const relatedTarget: EventTarget | null = e.relatedTarget
        if (relatedTarget != null)
          (relatedTarget as Element).closest('.dropdown__option') == null
            ? (this.isExpanded = false)
            : null
      },
    },
    created: function () {
      this.activeOption = this.allOptions.findIndex((option) => {
        if (option.isActive == true) return true
      })
    },
    unmounted: function () {
      window.removeEventListener('click', this.closeOptions)
      window.removeEventListener('scroll', this.dismiss, true)
      window.removeEventListener('resize', this.dismiss)
    },
  })
</script>

<template>
  <div
    class="dropdown"
    @keydown.esc="isExpanded = false"
    @focusout="browseOptions"
    :data-theme="theme"
  >
    <Label v-if="label != undefined" :label="label" :theme="theme" />
    <Button
      type="secondary"
      :label="allOptions[activeOption].name"
      layout="ICON-RIGHT"
      :alt="alt"
      :theme="theme"
      @click="openOptions"
      @keyup.space="openOptions"
      extensible
      :tabindex="isExpanded ? '-1' : '0'"
    >
      <template #icon>
        <ChevronDown :size="24" />
      </template>
    </Button>
    <Teleport to="body">
      <Transition name="switch" style="--delay: 0ms">
        <Container
          class="dropdown__list"
          v-if="isExpanded"
          ref="list"
          :style="`top: ${listTop}px; left: ${listLeft}px; min-width: ${listWidth}px`"
        >
          <ul class="dropdown__options">
            <li
              v-for="(option, index) in allOptions"
              :key="option.name"
              class="dropdown__option"
              :class="option.isActive ? 'dropdown__option--active' : ''"
              @click="setOption(option.action, option.name, index)"
              @keyup.space="setOption(option.action, option.name, index)"
              @focus="store.isFocus = true"
              @blur="store.isFocus = false"
              tabindex="0"
              ref="option"
            >
              <Transition name="switch">
                <i v-if="option.isActive" class="dropdown__option__icon"
                  ><Check :size="24"
                /></i>
              </Transition>
              <Label class="dropdown__option__label" :label="option.name" />
            </li>
          </ul>
        </Container>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped lang="sass">
  // Structure
  .dropdown
    display: flex
    flex-flow: column nowrap
    gap: var(--layout-label-gap) 0

    &__list
      padding: var(--spacing-m-200)
      position: fixed
      z-index: 5

    &__options
      padding: 0
      display: flex
      flex-flow: column nowrap
      gap: 0 var(--layout-paragraph-gap)

    &__option
      flex: 0 1 var(--button-height-size)
      display: flex
      align-items: center
      padding: 0 var(--spacing-l-000) 0 var(--button-height-size)
      cursor: pointer
      border-radius: calc(var(--button-height-size) / 2)
      transition: var(--simple-transition)
      box-shadow: 0 0 0 var(--spacing-xs-000) var(--item-border)
      background-color: var(--item-background)

      &--active
        padding: 0 var(--spacing-l-000) 0 0

      &__icon
        display: flex
        flex: 0 0 var(--button-height-size)
        justify-content: center

        :deep(svg)
          stroke: var(--text-color)

  // Aspect
  .dropdown
    &__option
      --item-border: transparent
      --item-background: transparent

  .dropdown
    &[data-theme="DARK"]
      --text-color: var(--color-soil)

  // Event
  .dropdown
    &__option:hover
      --amplitude: var(--spacing-s-000)
      --item-background: var(--color-soft-wind)

      animation: excited var(--duration-running) var(--ease-peps)

    &__option:focus
      --item-background: var(--color-soft-wind)
      --item-border: var(--color-clear-water)

      transform: var(--focus-scale)
      outline: none
      z-index: 2

    &__option:active
      transform: var(--active-scale)
</style>
