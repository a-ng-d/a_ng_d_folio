<script lang="ts">
  import chroma from 'chroma-js';
  export default {
    name: 'Particles',
    data() {
      return {
        radius: 8,
        columns: 0,
        rows: 0
      }
    },
    mounted() {
      this.modulus = 21;
      this.counter = 0;
      this.colors = [];
      this.getGrid(this.$el)
    },
    methods: {
      getGrid(el) {
        this.columns = Math.round(el.clientWidth / 8);
        this.rows = Math.round(el.clientHeight / 8) + 1;
        this.colors = chroma.scale(['#C7E3FE', '#E0D1F3', '#F5D546']).colors(this.columns * this.rows)
      },
      glitchFade(n) {
        if (n % this.modulus == 0) {
          this.counter = 0;
          this.modulus = this.getRandomArbitrary(1, 51)
        } else
          this.counter++;

        return this.counter * 10
      },
      getRandomArbitrary(min, max) {
        return Math.round(Math.random() * (max - min) + min)
      }
    }
  }
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <template v-for="i in rows">
      <template v-for="j in columns" :key="j + (columns * (i - 1))">
        <circle
          class="particle"
          :r="radius"
          :cx="(j - 1) * this.radius"
          :cy="(i - 1) * this.radius"
          :fill="this.colors[j + (columns * (i - 1)) - 1]"
          :style="`transition-delay: ${glitchFade(j + (columns * (i - 1)) - 1)}ms`"
        />
      </template>
    </template>
 </svg>
</template>

<style scoped lang="sass">
  .particle
    transition: var(--duration-turtoise) all var(--ease-peps)
    transform: scale(0)
    transform-origin: center center
    transform-box: fill-box
</style>
