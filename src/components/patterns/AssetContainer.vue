<script lang="ts">
  import { defineComponent } from 'vue'
  import { store } from '@/utilities/store'
  import Button from '@/components/ui/Button.vue'
  import Container from '@/components/ui/Container.vue'
  import { Dribbble, Codepen } from 'lucide-vue-next'

  export default defineComponent({
    name: 'AssetContainer',
    components: {
      Button,
      Container,
      Dribbble,
      Codepen
    },
    props: {
      title: String,
      thumbnail: String,
      hdnail: String,
      alt: String,
      type: String,
      sourceName: String,
      sourceLink: String,
      unmagnify: {
        type: Boolean,
        default: false
      },
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        store,
        isMagnified: false,
        assetWidth: 0 as unknown
      }
    },
    methods: {
      magnifier(e: any) {
        const width = e.target.children[0].children[0].children[0].offsetWidth

        this.isMagnified = !this.isMagnified
        this.assetWidth = width + 16 + 'px'
      }
    },
    watch: {
      unmagnify(to, from) {
        to == true ? this.isMagnified = false : this.isMagnified
      }
    }
  })
</script>

<template>
  <Container
    @click="magnifier"
    @keyup.enter="magnifier"
    @focus="store.isFocus = true"
    @blur="store.isFocus = false"
    class="container"
    isInteractive
  >
    <div class="asset-container__content" :data-theme="theme">
      <div class="asset-container__asset">
        <Transition name="fade" mode="in-out" :style="`--delay: ${isMagnified ? '0ms' : 'var(--delay-jogging)'}`">
          <img v-if="!isMagnified" :src="thumbnail" :alt="alt" />
          <video v-else-if="isMagnified && type === 'video'" autoplay muted loop>
            <source :src="hdnail" type="video/mp4" />
          </video>
          <img v-else-if="isMagnified && type === 'image'" :src="hdnail" :alt="alt" />
        </Transition>
      </div>
      <div class="asset-container__description">
        <h5>{{ title }}</h5>
        <Transition name="switch" mode="out-in" style="--delay: var(--delay-hare)">
          <Button
            v-if="isMagnified"
            type="secondary"
            :path="sourceLink"
            layout="ICON-ONLY"
            theme="DEFAULT"
          >
            <template #icon>
              <Component :is="sourceName" :size="24" />
            </template>
          </Button>
        </Transition>
      </div>
    </div>
  </Container>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/base.sass' as device

  // Structure
  .container
    width: v-bind("isMagnified ? assetWidth : '30vh'")
    padding: var(--spacing-s-100)
    cursor: pointer

  .asset-container
    &__content
      --container-padding: var(--spacing-s-100)

      display: flex
      flex-flow: column nowrap
      gap: var(--container-padding) 0
      height: 100%
      pointer-events: none

    &__asset
      --container-padding: var(--spacing-s-100)

      flex: 1
      display: flex
      justify-content: center
      overflow: hidden
      border-radius: calc(var(--regular-border-radius) - var(--container-padding))
      transition: var(--simple-transition)
      filter: v-bind("isMagnified ? 'brightness(1)' : 'brightness(.5)'")

      img, video
        height: 100%

    &__description
      display: flex
      flex: 0 0 var(--sizing-xl-300)
      flex-flow: row nowrap
      align-items: center
      padding: 0 var(--spacing-m-000)

      & > h5
        flex: 1
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        padding: var(--spacing-s-000) 0

      & > a.button
        pointer-events: auto

  // Aspect
  .asset-container__content
    &[data-theme="DARK"]
      --text-color: var(--color-soil)
</style>
