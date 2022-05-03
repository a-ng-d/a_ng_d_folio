<script lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import About from '@/contexts/About.vue'
  import Networks from '@/contexts/Networks.vue'
  import Career from '@/contexts/Career.vue'
  import Stories from '@/contexts/Stories.vue'
  import Talks from '@/contexts/Talks.vue'
  import Workshops from '@/contexts/Workshops.vue'
  import { RotateCcw } from 'lucide-vue-next'

  export default {
    name: "Id",
    components: {
      MainMenu,
      Footer,
      Button,
      About,
      Networks,
      Career,
      Stories,
      Talks,
      Workshops,
      RotateCcw
    },
    data() {
      return {
        theme: "default"
      }
    }
  }
</script>

<template>
  <main class="page">
    <MainMenu
      logotypeColor="var(--color-soil)"
      background="var(--color-soft-wind)"
    >
      <template #left-part>
        <Button type="primary" path="/" layout="indicator" :theme="theme">
          <template #icon>
            <RotateCcw
              :size="24"
            />
          </template>
          <template #label>
            {{ $t("id.back") }}
          </template>
        </Button>
      </template>
    </MainMenu>
    <article class="article">
      <About :theme="theme" />
      <Networks :theme="theme" />
      <Career :theme="theme" />
      <Stories :theme="theme" />
      <Talks :theme="theme" />
      <Workshops :theme="theme" />
    </article>
    <Footer
      alignment="center"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .page
    height: fit-content

  // Structure
  .article
    grid-area: main
</style>
