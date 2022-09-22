<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import Label from '@/components/ui/Label.vue'
  import Button from '@/components/ui/Button.vue'
  import { Volume, Volume2 } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Footer',
    components: {
      Label,
      Button,
      Volume,
      Volume2
    },
    props: {
      alignment: {
        type: String,
        default: 'LEFT'
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        store,
        version: __APP_VERSION__ as string,
        flex: this.alignment === 'LEFT' ? 'flex-start' :
              this.alignment === 'CENTER' ? 'center' :
              this.alignment === 'RIGHT' ? 'flex-end' :
              'flex-start' as string
      }
    }
  })
</script>

<template>
  <footer class="footer" :data-theme="theme">
    <div class="footer__tag">
      <span class="footer__tag__content small-label">{{ $t("global.author") }}</span>
      <span class="footer__tag__content small-label">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content small-label">{{ $t("global.license", { year: new Date().getFullYear() }) }}</span>
      <span class="footer__tag__content small-label">{{ $t("global.separator") }}</span>
      <RouterLink
        class="footer__tag__link"
        to="/_attribution"
        @focus="store.isFocus = true"
        @blur="store.isFocus = false"
      >
        <Label
          :label="$t('footer.attribution')"
          underlined
          small
          :theme="theme === 'DEFAULT' ? 'DARK' : 'DEFAULT'"
        />
      </RouterLink>
      <span class="footer__tag__content small-label">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content small-label">{{ `${$t("global.version")} ${version}` }}</span>
    </div>
    <Button
      v-if="store.device === 'DESKTOP'"
      type="secondary"
      layout="ICON-ONLY"
      @click="store.isSoundOn = !store.isSoundOn"
      style="height: calc(var(--footer-tag-height-size) - var(--border-size))"
      :theme="theme"
    >
      <template #icon>
        <Volume2 v-if="store.isSoundOn" :size="16" />
        <Volume v-else :size="16" />
      </template>
    </Button>
  </footer>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  // Structure
  .footer
    --icon-size-regular: var(--sizing-m-000)
    grid-area: footer
    display: flex
    justify-content: v-bind(flex)
    align-self: center
    padding: var(--layout-column-gap)
    gap: 0 var(--layout-paragraph-gap)

    &__tag
      display: flex
      align-items: center
      min-height: var(--footer-tag-height-size)
      border-radius: calc(var(--footer-tag-height-size) / 2)
      gap: calc(var(--footer-tag-height-size) / 8)
      padding: calc(var(--footer-tag-height-size) / 4) calc(var(--footer-tag-height-size) / 2)
      color: var(--text-color)
      background-color: var(--background-color)
      transition: var(--grandma-transition)

      &__link
        transition: var(--simple-transition)

        :deep(.label p)
          transition: var(--grandma-transition)

  @include device.smartphone
    .footer
      justify-content: center

  // Aspect
  .footer
    .footer__tag
      --text-color: var(--color-cream)
      --background-color: var(--color-soil)
      --border-color: var(--color-cream)

      flex-wrap: wrap

    &[data-theme="DARK"]
      .footer__tag
        --text-color: var(--color-soil)
        --background-color: var(--color-cream)
        --border-color: var(--color-soil)

  // Events
  .footer
    &__tag__link:hover
      --amplitude: var(--spacing-s-000)

      animation: excited var(--duration-running) var(--ease-peps)

      .label
        &:after
          --border-color: var(--color-creamy-sun)

          height: 50%
          left: calc(var(--border-size) * 4)

        &[data-theme="DARK"]:after
          --border-color: var(--color-sandstone)

    &__tag__link:focus
      transform: var(--focus-scale)
      padding: 0 var(--spacing-m-000)

    &__tag__link:active
      transform: var(--active-scale)
      padding: 0

    &__tag__link:focus, &__tag__link:active
      background-color: var(--background-color)
      border-radius: var(--full-border-radius)

      .label
        &:after
          --border-color: var(--color-clear-water)

          height: 50%
          left: calc(var(--border-size) * 4)
</style>
