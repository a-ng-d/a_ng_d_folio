<script lang="ts">
  export default {
    name: 'Footer',
    props: {
      alignment: {
        type: String,
        default: 'left'
      },
      dark: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        flex: this.alignment === 'left' ? 'flex-start' :
              this.alignment === 'center' ? 'center' :
              this.alignment === 'right' ? 'flex-end' :
              'flex-start',
        currentYear: new Date().getFullYear()
      }
    }
  }
</script>

<template>
  <footer class="footer" :data-theme="dark ? 'dark' : 'light'">
    <div class="footer__tag">
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
  //// Light
  .footer[data-theme="light"]
    .footer__tag
      background-color: var(--color-soil)
      color: var(--text-color-dark)

  //// Dark
  .footer[data-theme="dark"]
    .footer__tag
      background-color: var(--color-cream)
      color: var(--text-color-light)
</style>
