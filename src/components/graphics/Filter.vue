<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Filter'
  })
</script>

<template>
  <svg width="0" height="0" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" style="position:absolute">
    <defs>
      <!-- Gradient -->
      <linearGradient id="gradient-biscarosse-sunset" x1=0 y1=0 x2=0 y2=1>
        <stop offset="0%" stop-color="var(--color-soft-wind)" />
        <stop offset="75%" stop-color="var(--color-candy-floss)" />
        <stop offset="100%" stop-color="var(--color-creamy-sun)" />
      </linearGradient>

      <!-- Filter -->
      <filter id="zouuu">
        <feTurbulence baseFrequency="0,0.1" numOctaves="0" stitchTiles="stitch" result="df157ce3-42d8-47ba-baa8-ac4e51a14c2f">
          <animate attributeName="numOctaves" attributeType="XML" from="0" to="2" begin="0s" dur=".4s" fill="freeze" repeatCount="1" />
        </feTurbulence>
        <feGaussianBlur stdDeviation="0,0" edgeMode="wrap" result="570c3db1-8511-4053-a043-77721e21ba5b" in="SourceGraphic">
          <animate attributeName="stdDeviation" attributeType="XML" from="0,0" to="8,2" begin="0s" dur=".4s" fill="freeze" repeatCount="1" />
        </feGaussianBlur>
        <feDisplacementMap scale="0" xChannelSelector="B" yChannelSelector="B" result="3ba30029-81b7-4b54-86dd-530317acafa2" in="570c3db1-8511-4053-a043-77721e21ba5b" in2="df157ce3-42d8-47ba-baa8-ac4e51a14c2f">
          <animate attributeName="scale" attributeType="XML" from="0" to="8" begin="0s" dur=".4s" fill="freeze" repeatCount="1" />
        </feDisplacementMap>
      </filter>
      <filter id="uuuoz">
        <feTurbulence baseFrequency="0,0.1" numOctaves="0" stitchTiles="stitch" result="df157ce3-42d8-47ba-baa8-ac4e51a14c2f">
          <animate attributeName="numOctaves" attributeType="XML" from="2" to="0" dur=".4s" fill="freeze" />
        </feTurbulence>
        <feGaussianBlur stdDeviation="0,0" edgeMode="wrap" result="570c3db1-8511-4053-a043-77721e21ba5b" in="SourceGraphic">
          <animate attributeName="stdDeviation" attributeType="XML" from="8,2" to="0,0" dur=".4s" fill="freeze" />
        </feGaussianBlur>
        <feDisplacementMap scale="0" xChannelSelector="B" yChannelSelector="B" result="3ba30029-81b7-4b54-86dd-530317acafa2" in="570c3db1-8511-4053-a043-77721e21ba5b" in2="df157ce3-42d8-47ba-baa8-ac4e51a14c2f">
          <animate attributeName="scale" attributeType="XML" from="8" to="0" dur=".4s" fill="freeze" />
        </feDisplacementMap>
      </filter>

      <filter id="glitched">
        <feColorMatrix in="SourceGraphic" mode="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />

				<feOffset in="r" result="r" dx="-5" dy="0">
					<animate attributeName="dx" attributeType="XML" values="-1; .5; 3; -2; .4; .5; 2; 1; -.5; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0;" dur=".5s" repeatCount="indefinite"/>
					<animate attributeName="dy" attributeType="XML" values="2; -1; .4; 2; 1; 3; -.5; 2; 1; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0;" dur="1s" repeatCount="indefinite"/>
				</feOffset>

				<feColorMatrix in="SourceGraphic" mode="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="g"/>

				<feOffset in="g" result="g" dx="-5" dy="0">
					<animate attributeName="dx" attributeType="XML" values="0; 0; 0; 0; 0; 0; 0; 0; 2; -1; .4; 2; 1; 3; -.5; 2; 1; 0; 0; 0; 0; 0; 0; 0; 0;" dur="1.5s" repeatCount="indefinite"/>
					<animate attributeName="dy" attributeType="XML" values="0; 0; 0; 0; 0; 0; 0; 0; -1; .5; 3; -2; .4; .5; 2; 1; -.5; 0; 0; 0; 0; 0; 0; 0; 0;" dur="1s" repeatCount="indefinite"/>
				</feOffset>

				<feColorMatrix in="SourceGraphic" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="b"/>

				<feOffset in="b" result="b" dx="5" dy="0">
					<animate attributeName="dx" attributeType="XML" values="0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 2; -1; .4; 2; 1; 3; -.5; 2; 1;" dur="0.35s" repeatCount="indefinite"/>
					<animate attributeName="dy" attributeType="XML" values="0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; 0; -1; .5; 3; -2; .4; .5; 2; 1; -.5;" dur="0.35s" repeatCount="indefinite"/>
				</feOffset>

				<feBlend in="r" in2="g" mode="screen" result="blend" />

				<feBlend in="blend" in2="b" mode="screen" result="blend" />
      </filter>
    </defs>
  </svg>
</template>
