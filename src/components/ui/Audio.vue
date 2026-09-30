<script lang="ts">
  import { defineComponent } from 'vue'
import { store } from '@/utilities/store'

  export default defineComponent({
    name: 'Audio',
    props: {
      src: {
        type: String,
        required: true,
      },
      muted: {
        type: Boolean,
        default: false,
      },
      autoplay: {
        type: Boolean,
        default: false,
      },
      loop: {
        type: Boolean,
        default: false,
      },
      play: {
        type: Boolean,
        default: false,
      },
      volume: {
        type: Number,
        default: 1,
      },
    },
    data: function () {
      return {
        store,
      }
    },
    watch: {
      volume(to) {
        this.$el.volume = to
      },
      play(to) {
        if (to) this.$el.play()
        else {
          this.$el.pause()
          this.$el.currentTime = 0
        }
      },
      muted(to) {
        if (!to) this.resume()
      },
      'store.isAudioUnlocked'(to: boolean) {
        if (to) this.resume()
      },
    },
    methods: {
      resume() {
        if (!this.autoplay || this.muted || !this.$el.paused) return

        this.$el.play().catch(() => {
          // Still not allowed: the next interaction will come back here.
        })
      },
    },
    mounted: function () {
      this.$el.volume = this.volume
    },
  })
</script>

<template>
  <audio :autoplay="autoplay" :muted="muted" :loop="loop" :volume="volume">
    <source :src="src" type="audio/mpeg" />
  </audio>
</template>

<style scoped lang="sass"></style>
