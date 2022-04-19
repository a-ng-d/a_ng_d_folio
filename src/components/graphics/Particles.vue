<script lang="ts">
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
      this.counter = 0
    },
    methods: {
      getGrid(e) {
        this.columns = Math.round(e.target.clientWidth / 8);
        this.rows = Math.round(e.target.clientHeight / 8) + 1
      },
      glitchFade(n) {
        if (n % this.modulus == 0) {
          this.counter = 0;
          this.modulus = this.getRandomArbitrary(1, 51)
        }
        else
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
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" @load="getGrid">
    <template v-for="i in rows">
      <template v-for="j in columns" :key="j + (columns * (i - 1))">
        <circle
          class="particle"
          :r="radius"
          :cx="(j - 1) * this.radius"
          :cy="(i - 1) * this.radius"
          :style="`transition-delay: ${glitchFade(j + (columns * (i - 1)))}ms`"
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
