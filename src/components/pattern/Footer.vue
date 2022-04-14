<script lang="ts">
  export default {
    name: 'Footer',
    props: {
      alignment: {
        type: String,
        default: 'left'
      },
      mode: {
        type: String,
        default: 'light'
      }
    },
    data() {
      return {
        flex: this.alignment === 'left' ? 'flex-start' :
              this.alignment === 'center' ? 'center' :
              this.alignment === 'right' ? 'flex-end' :
              'flex-start',
        mode: this.mode,
        currentYear: new Date().getFullYear()
      }
    }
  }
</script>

<template>
  <footer class="footer">
    <div class="footer__tag" :class="'footer__tag--' + mode">
      <span class="footer__tag__content">{{ $t("footer.author") }}</span>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content">{{ $t("footer.license", { year: currentYear }) }}</span>
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
    padding: var(--spacing-m-200)

    &__tag
      display: flex
      flex-flow: row nowrap
      align-items: center
      height: var(--sizing-l-000)
      border-radius: calc(var(--sizing-l-000) / 2)
      gap: var(--spacing-xs-000)
      padding: 0 var(--spacing-m-000)

      &__content, &__link
        @include text.caption

    // Variants
    &__tag--dark
      background-color: var(--color-cream)

      .footer__tag__content, .footer__tag__link
        color: var(--text-color-light)

    &__tag--light
      background-color: var(--color-soil)

      .footer__tag__content, .footer__tag__link
        color: var(--text-color-dark)
</style>
