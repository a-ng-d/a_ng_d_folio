<script lang="ts">
  export default {
    name: 'Landscape',
    props: {
      background: String
    },
    mounted() {
      const canvas = document.getElementById('scene'),
 			ctx = canvas.getContext('2d'),
 			scrW = document.body.clientWidth,
			scrW_1_4 = scrW / 4,
			scrW_1_2 = scrW / 2,
			scrW_3_4 = (scrW / 4) * 3,
 			scrH = document.body.clientHeight,
			scrH_1_4 = scrH / 4,
			scrH_1_2 = scrH / 2,
			scrH_3_4 = (scrH / 4) * 3,
			bleed = 100;

      // particles arrays
      let bg_particles = [],
      		mid_particles = [],
      		fg_particles = [];

      canvas.width = scrW;
      canvas.height = scrH;

      // style guide
      const colors = {
      	deepBlack: '#000028',
      	titaniumWhite: '#FFFFFF',
      	soil: '#4F4C4D',
      	sandstone: '#B3ABAD',
      	clay: '#CCC4C6',
      	cream: '#EDEDED',
      	creamySun: '#F5D546',
      	softWind: '#C7E3FE',
      	candyFloss: '#E0D1F3',
      	clearWater: '#64B1FC',
      	get biscarosseSunset() {
      		return [
      			{
      				position: 0,
      				color: this.softWind
      			},
      			{
      				position: .8,
      				color: this.candyFloss
      			},
      			{
      				position: 1,
      				color: this.creamySun
      			}
      		]
      	},
      	get softSteel() {
      		return [
      			{
      				position: 0,
      				color: this.clay
      			},
      			{
      				position: .4,
      				color: this.cream
      			},
      			{
      				position: 1,
      				color: this.softWind
      			}
      		]
      	}
      },
      groups = {
      	background: [
      		colors.sandstone,
      		colors.clay,
      		colors.cream,
      		colors.softSteel
      	],
      	middle: [
      		colors.creamySun,
      		colors.softWind,
      		colors.candyFloss,
      		colors.biscarosseSunset
      	],
      	foreground: [
      		colors.clearWater
      	],
      	cloud: [
      		colors.titaniumWhite
      	]
      };

      class inV {

      	constructor(x, y, width, color) {
      		this.x = x;
      		this.y = y;
      		this.width = width;
      		this.height = scrH - y;
      		this.color = color;
      		this.opacity = Math.abs(1 - map(this.y, 0, scrH, 1, 0));
      	}

      	gradient() {
      		let grd = ctx.createLinearGradient(
      			this.x + this.width / 2,
      			this.y,
      			this.x + this.width / 2,
      			this.y + this.height
      		);

      		for (let i = 0 ; i < this.color.length ; i++) {
      			grd.addColorStop(this.color[i].position, this.color[i].color)
      		}

      		this.color = grd
      	}

      	draw() {
      		if (typeof this.color === 'object') {
      			this.gradient();
      		};

      		ctx.globalAlpha = this.opacity;
      		ctx.fillStyle = this.color;
      		ctx.fillRect(this.x, this.y, this.width, this.height)
      	}

      };

      function makeParticles() {

      	bg_particles = [];
      	mid_particles = [];
      	fg_particles = [];

      	for (let i = 0 ; i < 100 ; i++) {
      		bg_particles.push(new inV(
      			randomBetween(-bleed, scrW + bleed),
      			randomBetween(scrH_1_4, scrH_1_2),
      			randomBetween(20, scrW),
      			groups.background[randomBetween(0, groups.background.length)]
      		));
      		mid_particles.push(new inV(
      			randomBetween(-bleed, scrW + bleed),
      			randomBetween(scrH_3_4, scrH),
      			randomBetween(20, scrW_1_2),
      			groups.middle[randomBetween(0, groups.middle.length)]
      		))
      		fg_particles.push(new inV(
      			randomBetween(-bleed, scrW + bleed),
      			randomBetween(scrH - 50, scrH),
      			randomBetween(20, scrW_1_2),
      			groups.foreground[randomBetween(0, groups.foreground.length)]
      		))
      	};

      	bg_particles.sort((a, b) => a.opacity - b.opacity);
      	mid_particles.sort((a, b) => a.opacity - b.opacity);
      	fg_particles.sort((a, b) => a.opacity - b.opacity);

      };

      function render() {

      	makeParticles();
      	ctx.clearRect(0, 0, scrW, scrH);

      	bg_particles.forEach((el) => el.draw());
      	mid_particles.forEach((el) => el.draw());
      	fg_particles.forEach((el) => el.draw())

      	//window.requestAnimationFrame(render)

      };

      render();

      // generic functions
      function randomBetween(min, max) {
      	return Math.floor(min + Math.random() * max)
      };
      function map(value, oldMin, oldMax, newMin, newMax) {
      	var oldRange = oldMax - oldMin
      	var newRange = newMax - newMin
      	return ((value - oldMin) * newRange / oldRange) + newMin
      }
    }
  }
</script>

<template>
  <div class="background"></div>
  <canvas id="scene"></canvas>
</template>

<style lang="sass">
  canvas#scene,
  .background
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    background-color: var(--background-color)

  canvas#scene
    z-index: -1

  .background
    mix-blend-mode: hard-light
    background: v-bind(background)
</style>
