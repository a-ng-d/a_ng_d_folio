<script lang="ts">
  import { defineComponent } from 'vue'
  import { withTheme } from '@/composables/theme'
  import { store } from '@/utilities/store'
  import type { LocalWeather } from '@/utilities/weather'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
  import SimpleLink from '@/components/ui/SimpleLink.vue'
  import Button from '@/components/ui/Button.vue'
  import { Volume, Volume2 } from 'lucide-vue-next'

  export default defineComponent({
    name: 'Footer',
    mixins: [withTheme],
    components: {
      Button,
      SimpleExternalLink,
      SimpleLink,
      Volume,
      Volume2,
    },
    props: {
      alignment: {
        type: String,
        default: 'LEFT',
      },
    },
    data: function () {
      return {
        store,
        version: __APP_VERSION__ as string,
        flex:
          this.alignment === 'LEFT'
            ? 'flex-start'
            : this.alignment === 'CENTER'
            ? 'center'
            : this.alignment === 'RIGHT'
            ? 'flex-end'
            : ('flex-start' as string),
      }
    },
    computed: {
      ambience(): LocalWeather | null {
        return this.store.isLiveAmbience ? this.store.weather : null
      },
      time(): string {
        const now = new Date(this.store.clock),
          pad = (value: number) => String(value).padStart(2, '0')

        return `${pad(now.getHours())}:${pad(now.getMinutes())}`
      },
      readings(): Array<{ key: string; label: string; value: string }> {
        const weather = this.ambience

        if (weather === null) return []

        const parts = [
          { key: 'place', value: weather.place },
          { key: 'time', value: this.time },
          {
            key: 'light',
            value: this.$t(`footer.ambience.lights.${this.store.hour}`),
          },
        ]

        if (weather.temperature !== null)
          parts.push({
            key: 'temperature',
            value: this.$t('footer.ambience.degrees', {
              value: Math.round(weather.temperature),
            }),
          })

        if (weather.humidity !== null)
          parts.push({
            key: 'humidity',
            value: this.$t('footer.ambience.percent', {
              value: Math.round(weather.humidity),
            }),
          })

        if (weather.luminosity !== null)
          parts.push({
            key: 'luminosity',
            value: this.$t('footer.ambience.irradiance', {
              value: Math.round(weather.luminosity),
            }),
          })

        return parts.map((part) => ({
          ...part,
          label: this.$t(`footer.ambience.${part.key}`),
        }))
      },
    },
  })
</script>

<template>
  <footer class="footer" :data-theme="resolvedTheme">
    <div class="footer__tag">
      <span class="footer__tag__content small-label">{{
        $t('global.author')
      }}</span>
      <span class="footer__tag__content small-label">{{
        $t('global.separator')
      }}</span>
      <span class="footer__tag__content small-label">{{
        $t('global.license', { year: new Date().getFullYear() })
      }}</span>
      <span class="footer__tag__content small-label">{{
        $t('global.separator')
      }}</span>
      <SimpleExternalLink
        :label="$t('footer.repository')"
        href="https://github.com/a-ng-d/a_ng_d_folio"
        :alt="$t('actions.repository')"
        small
        :theme="resolvedTheme === 'DEFAULT' ? 'DARK' : 'DEFAULT'"
      />
      <span class="footer__tag__content small-label">{{
        $t('global.separator')
      }}</span>
      <SimpleLink
        :label="$t('footer.attribution')"
        path="/_attribution"
        :alt="$t('actions.attribution')"
        small
        :theme="resolvedTheme === 'DEFAULT' ? 'DARK' : 'DEFAULT'"
      />
      <span class="footer__tag__content small-label">{{
        $t('global.separator')
      }}</span>
      <span class="footer__tag__content small-label">{{
        `${$t('global.version')} ${version}`
      }}</span>
    </div>
    <div
      v-if="readings.length > 0"
      class="footer__tag footer__tag--ambience"
      :title="$t('footer.ambience.alt')"
    >
      <template v-for="(reading, index) in readings" :key="reading.key">
        <span v-if="index > 0" class="footer__tag__content small-label">{{
          $t('global.separator')
        }}</span>
        <span class="footer__tag__content small-label" :title="reading.label">{{
          reading.value
        }}</span>
      </template>
    </div>
    <Button
      v-if="store.device === 'DESKTOP'"
      type="secondary"
      layout="ICON-ONLY"
      @click="store.isSoundOn = !store.isSoundOn"
      style="height: calc(var(--footer-tag-height-size) - var(--border-size))"
      :alt="$t('actions.mute')"
      :theme="resolvedTheme"
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
    align-items: center
    padding: var(--layout-column-gap)
    gap: var(--layout-paragraph-gap)

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
      flex-wrap: wrap

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
</style>
