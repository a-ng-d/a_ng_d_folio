<script lang="ts">
  export default {
    name: 'Particles',
    data() {
      return {
        counter: 0,
        radius: 8,
        columns: 0,
        rows: 0
      }
    },
    methods: {
      getGrid(e) {
        this.columns = Math.round(e.target.clientWidth / 8);
        this.rows = Math.round(e.target.clientHeight / 8)
      },
      canBreakLine(n) {
        console.log(n)
      }
    }
  }
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" @load="getGrid">
    <template v-for="i in rows">
      <template v-for="j in columns">
        <circle class="particle" :class="`particle__${j + (columns * (i - 1))}`" :r="radius" :cx="(j - 1) * this.radius" :cy="(i - 1) * this.radius"/>
      </template>
    </template>
 </svg>
</template>

<style scoped lang="sass">
  .particle
    transition: var(--duration-running) all var(--ease-peps)
    transform: scale(0)
    transform-origin: center center
    transform-box: fill-box
</style>
