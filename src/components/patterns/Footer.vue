<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import Label from '@/components/ui/Label.vue'
  import Audio from '@/components/ui/Audio.vue'
  import { Volume, Volume2 } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Footer',
    components: {
      Label,
      Audio,
      Volume,
      Volume2
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
    data: function() {
      return {
        store,
        version: __APP_VERSION__,
        state: '',
        flex: this.alignment === 'LEFT' ? 'flex-start' :
              this.alignment === 'CENTER' ? 'center' :
              this.alignment === 'RIGHT' ? 'flex-end' :
              'flex-start'
      }
    }
  })
</script>

<template>
  <footer class="footer" :data-theme="theme">
    <div class="footer__tag">
      <span class="footer__tag__content">{{ $t("global.author") }}</span>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content">{{ $t("global.license", { year: new Date().getFullYear() }) }}</span>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <RouterLink
        class="footer__tag__link"
        to="/_attribution"
        @mouseover="state = 'OVER'"
        @mouseout="state = 'NORMAL'"
        @touchstart.passive="state = 'OVER'"
        @touchend.passive="state = 'NORMAL'"
        @focus="state = 'FOCUS'"
        @blur="state = 'NORMAL'"
      >
        <Label
          :label="$t('footer.attribution')"
          underlined
          :theme="theme === 'DEFAULT' ? 'DARK' : 'DEFAULT'"
        />
      </RouterLink>
      <span class="footer__tag__content">{{ $t("global.separator") }}</span>
      <span class="footer__tag__content">{{ `${$t("global.version")} ${version}` }}</span>
    </div>
    <div class="footer__tag footer__sound" @click="store.isSoundOn = !store.isSoundOn">
      <Volume2 v-if="store.isSoundOn" :size="16" />
      <Volume v-else :size="16" />
    </div>
    <Audio
      v-if="state === 'OVER'"
      src="/sounds/interaction-over.mp3"
      autoplay
      :volume=".5"
    />
    <Audio
      v-else-if="state === 'FOCUS'"
      src="/sounds/interaction-focus.mp3"
      autoplay
      :volume=".5"
    />
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
      transition: var(--slow-transition)

      &__content, &__link, .label
        @include text.caption

      &__content
        transition: var(--slow-transition)

      &__link
        transition: var(--simple-transition)

      .label
        transition: var(--slow-transition)

        &:after
          --border-size: 2rem

    &__sound
      cursor: pointer

  @include device.mobile
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
    &__tag__link:hover, &__sound:hover
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
