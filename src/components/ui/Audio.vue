<script lang="ts">
import { defineComponent } from 'vue'

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
        isWaiting: false as boolean,
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
    },
    methods: {
      resume() {
        if (!this.autoplay || this.muted || !this.$el.paused) return

        this.$el.play().catch(this.waitForVisitor)
      },
      waitForVisitor() {
        if (this.isWaiting) return

        this.isWaiting = true
        document.addEventListener('pointerdown', this.retry, { once: true })
        document.addEventListener('keydown', this.retry, { once: true })
      },
      retry() {
        this.stopWaiting()
        this.resume()
      },
      stopWaiting() {
        this.isWaiting = false
        document.removeEventListener('pointerdown', this.retry)
        document.removeEventListener('keydown', this.retry)
      },
    },
    mounted: function () {
      this.$el.volume = this.volume
      this.resume()
    },
    unmounted: function () {
      this.stopWaiting()
    },
  })
</script>

<template>
  <audio :autoplay="autoplay" :muted="muted" :loop="loop" :volume="volume">
    <source :src="src" type="audio/mpeg" />
  </audio>
</template>

<style scoped lang="sass"></style>
