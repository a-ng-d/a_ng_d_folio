<script lang="ts">
  import { defineComponent } from 'vue'
  import Button from '@/components/ui/Button.vue'
  import Container from '@/components/ui/Container.vue'
  import Label from '@/components/ui/Label.vue'
  import { doMap } from '@/utilities/operations'
  import { ChevronUp, ChevronDown, Check } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Dropdown',
    components: {
      Button,
      Container,
      Label,
      ChevronUp,
      ChevronDown,
      Check
    },
    props: {
      label: String,
      options: {
        type: Array,
        default: []
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        isExpanded: false,
        activeOption: 0 as number,
        allOptions: this.options as Array<{name: string, action: any, isActive: boolean}>
      }
    },
    methods: {
      setOption(callback: any, name: string, order: number) {
        (this.allOptions[(this.activeOption) as number] as any).isActive = false;
        (this.activeOption as number) = order;
        (this.allOptions[order] as any).isActive = true;
        this.isExpanded = false;
        callback?.()
      },
      openOptions() {
        this.isExpanded = true
        setTimeout(() => window.addEventListener("click",  this.closeOptions), 100)
      },
      closeOptions(e: any) {
        if (e.target.closest('.dropdown__list') == null) this.isExpanded = false
      },
      map(current: number) {
        return doMap(current, 0, this.allOptions.length - 1, this.allOptions.length - 1, 0)
      }
    },
    created: function() {
      this.activeOption = this.allOptions.findIndex(option => {
        if (option.isActive == true)
          return true
      })
    },
    updated: function() {
      if (this.isExpanded == false) window.removeEventListener("click",  this.closeOptions)
    }
  })
</script>

<template>
  <div class="dropdown" :class="isExpanded ? 'dropdown--expanded' : 'dropdown--collapsed'">
    <Label
      v-if="label != undefined"
      :label="label"
    />
    <Button
      type="secondary"
      :label="allOptions[activeOption].name"
      layout="ICON-RIGHT"
      :theme="theme"
      @click="openOptions"
      extensible
    >
      <template #icon>
        <Transition name="switch" mode="out-in">
          <ChevronUp v-if="isExpanded" :size="24" />
          <ChevronDown v-else :size="24" />
        </Transition>
      </template>
    </Button>
    <Transition name="switch" mode="out-in">
      <Container class="dropdown__list" v-if="isExpanded">
        <ul class="dropdown__options" @keyup.escape="isExpanded = false">
          <li
            v-for="(option, index) in allOptions"
            :key="option.name"
            class="dropdown__option"
            :class="option.isActive ? 'dropdown__option--active' : ''"
            @click="setOption(option.action, option.name, index)"
            @keyup.enter="setOption(option.action, option.name, index)"
            :tabindex="option.isActive ? '-1' : '0'"
          >
            <Transition name="switch" mode="out-in">
              <i v-if="option.isActive" class="dropdown__option__icon"><Check :size="24" /></i>
            </Transition>
            <Label
              class="dropdown__option__label"
              :label="option.name"
            />
          </li>
        </ul>
      </Container>
    </Transition>
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
      min-width: 100%
      min-height: 100%
      position: absolute
      bottom: calc((var(--spacing-m-200) + var(--sizing-xs-000)) * -1)
      z-index: 5
      transform: translateY(calc(v-bind("map(activeOption)") * var(--button-height-size)))

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
        pointer-events: none

      &__icon
        display: flex
        flex: 0 0 var(--button-height-size)
        justify-content: center

  // Aspect
  .dropdown
    &__option
      --item-border: transparent
      --item-background: transparent

  // Event
  .dropdown
    &__option:hover
      --amplitude: var(--spacing-s-000)
      --item-background: var(--color-soft-wind)

      animation: excited var(--duration-running) var(--ease-peps)

  .dropdown
      &__option:focus
        --item-background: var(--color-soft-wind)
        --item-border: var(--color-clear-water)

        transform: var(--focus-scale)
        outline: none
        z-index: 2
</style>
