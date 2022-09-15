<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Audio',
    props: {
      src: {
        type: String,
        required: true
      },
      muted: {
        type: Boolean,
        default: false
      },
      autoplay: {
        type: Boolean,
        default: false
      },
      loop: {
        type: Boolean,
        default: false
      },
      volume: {
        type: Number,
        default: 1
      }
    },
    watch: {
      volume(to, from) {
        this.$el.volume = to
      }
    },
    mounted: function() {
      this.$el.volume = this.volume
    }
  })
</script>

<template>
  <audio
    :autoplay="autoplay"
    :muted="muted"
    :loop="loop"
    :volume="volume"
  >
    <source :src="src" type="audio/mpeg">
  </audio>
</template>

<style scoped lang="sass">

</style>
