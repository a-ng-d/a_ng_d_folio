<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Logotype',
    props: {
      theme: {
        type: String,
        default: 'DEFAULT'
      }
    },
    data: function() {
      return {
        width: 50 as number,
        duration: 800 as string,
        easing: '.86 .12 .12 .86' as string,
        delay: 100 as number
      }
    }
  })
</script>

<template>
  <svg class="logotype" id="logotype" width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" :data-theme="theme">
    <line
      x1="379.151"
      y1="211.151"
      x2="339.851"
      y2="279.219"
      :stroke-width="width"
      stroke-dasharray="100"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="200"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 5 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-6"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-6.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="428.151"
      y1="126.151"
      x2="415.651"
      y2="147.801"
      :stroke-width="width"
      stroke-dasharray="30"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="60"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 4 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-5"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-5.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="342.151"
      y1="126.151"
      x2="279.651"
      y2="234.404"
      :stroke-width="width"
      stroke-dasharray="130"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="260"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 3 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-4"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-4.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="256.151"
      y1="126.151"
      x2="193.651"
      y2="234.404"
      :stroke-width="width"
      stroke-dasharray="130" stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="260"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 2 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-3"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-3.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="169.651"
      y1="127.151"
      x2="107.151"
      y2="235.404"
      :stroke-width="width"
      stroke-dasharray="130"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="260"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 1 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-2"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-2.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="84.1506"
      y1="126.151"
      x2="71.6506"
      y2="147.801"
      :stroke-width="width"
      stroke-dasharray="30"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="60"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 0 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-1"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-1.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="257.151"
      y1="348.151"
      x2="239.651"
      y2="378.462"
      :stroke-width="width"
      stroke-dasharray="40"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="80"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 6 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-7"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-7.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
    <line
      x1="243.151"
      y1="298.151"
      x2="225.651"
      y2="328.462"
      :stroke-width="width"
      stroke-dasharray="40"
      stroke-dashoffset="0"
      stroke-linecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="80"
        :dur="duration + 'ms'"
        :begin="'logotype.mouseenter + ' + delay * 7 + 'ms'"
        repeatCount="1"
        fill="freeze"
        calcMode="spline"
        :keySplines="easing"
        keyTimes="0; 1"
        id="part-8"
      />
      <animate
        attributeName="stroke-width"
        :from="width"
        to="0"
        :dur="duration / 4 + 'ms'"
        :begin="'part\-8.begin + ' + duration / 4 + 'ms'"
        repeatCount="1"
      />
    </line>
  </svg>
</template>


<style scoped lang="sass">
  // Structure
  .logotype
    width: var(--logotype-size)
    height: var(--logotype-size)
    stroke: var(--logotype-color)
    transition: var(--grandma-transition)

  // Aspect
  .logotype
    --logotype-color: var(--color-soil)

    &[data-theme="DARK"]
      --logotype-color: var(--color-cream)
</style>
