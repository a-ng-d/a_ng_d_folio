<script lang="ts">
  export default {
    name: 'Footer',
    props: {
      alignment: {
        type: String,
        default: 'left'
      },
      theme: {
        type: String,
        default: 'default'
      }
    },
    data() {
      return {
        flex: this.alignment === 'left' ? 'flex-start' :
              this.alignment === 'center' ? 'center' :
              this.alignment === 'right' ? 'flex-end' :
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
      <RouterLink class="footer__tag__link" to="/_attribution">{{ $t("footer.attribution") }}</RouterLink>
    </div>
  </footer>
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  .footer
    grid-area: footer
    display: flex
    flex-flow: row nowrap
    justify-content: v-bind(flex)
    align-self: center
    padding: var(--layout-column-gap)

    &__tag
      display: flex
      flex-flow: row nowrap
      align-items: center
      height: var(--footer-tag-height-size)
      border-radius: calc(var(--footer-tag-height-size) / 2)
      gap: calc(var(--footer-tag-height-size) / 8)
      padding: 0 calc(var(--footer-tag-height-size) / 2)
      color: var(--text-color)
      background-color: var(--background-color)

      &__content, &__link
        @include text.caption

  // Variants
  //// Light
  .footer[data-theme="default"]
    .footer__tag
      --text-color: var(--color-cream)

  //// Dark
  .footer[data-theme="dark"]
    .footer__tag
      --text-color: var(--color-soil)
      --background-color: var(--color-cream)
</style>
