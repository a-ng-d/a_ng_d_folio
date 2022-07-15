<script lang="ts">
  import Label from '@/components/ui/Label.vue'
  export default {
    name: 'Footer',
    components: {
      Label
    },
    props: {
      alignment: {
        type: String,
        default: 'LEFT'
      },
      animation: {
        type: Array,
        default: ['normal', '0']
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data() {
      return {
        flex: this.alignment === 'LEFT' ? 'flex-start' :
              this.alignment === 'CENTER' ? 'center' :
              this.alignment === 'RIGHT' ? 'flex-end' :
              'flex-start'
      }
    }
  }
</script>

<template>
  <footer class="footer" :data-theme="theme">
    <div class="footer__tag">
      <span class="footer__tag__content">{{ $t("footer.author") }}</span>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content">{{ $t("footer.license", { year: new Date().getFullYear() }) }}</span>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <RouterLink class="footer__tag__link" to="/_attribution">
        <Label
          :label="$t('footer.attribution')"
          underlined
          :theme="theme === 'DEFAULT' ? 'DARK' : 'DEFAULT'"
        />
      </RouterLink>
    </div>
  </footer>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/text-styles.sass' as text
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .footer
    grid-area: footer
    display: flex
    justify-content: v-bind(flex)
    align-self: center
    padding: var(--layout-column-gap)

    &__tag
      display: flex
      align-items: center
      min-height: var(--footer-tag-height-size)
      border-radius: calc(var(--footer-tag-height-size) / 2)
      gap: calc(var(--footer-tag-height-size) / 8)
      padding: calc(var(--footer-tag-height-size) / 4) calc(var(--footer-tag-height-size) / 2)
      color: var(--text-color)
      background-color: var(--background-color)

      &__content, &__link, .label
        @include text.caption
        transition: var(--simple-transition)

      .label
        &:after
          --border-size: 2rem

  @include device.mobile
    .footer
      justify-content: center

  // Aspect
  .footer
    .footer__tag
      --text-color: var(--color-cream)
      --background-color: var(--color-soil)
      --border-color: var(--color-cream)

  [data-theme="DARK"]
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
      background-color: var(--background-color)
      border-radius: var(--full-border-radius)

      .label
        &:after
          --border-color: var(--color-clear-water)

          height: 50%
          left: calc(var(--border-size) * 4)
</style>
