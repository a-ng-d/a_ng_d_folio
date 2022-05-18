<script lang="ts">
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { Heart, Briefcase, FlaskConical, Mail, Archive } from 'lucide-vue-next'

  export default {
    name: 'Universes',
    components: {
      Footer,
      Button,
      Heart,
      Briefcase,
      FlaskConical,
      Mail,
      Archive
    },
    data() {
      return {
        theme: 'dark'
      }
    }
  }
</script>

<template>
  <main class="page">
    <section class="menu">
      <Button
        type="primary"
        path="/_core"
        layout="icon-only"
        :animation="['slide-up', '0']"
        :theme="theme"
      >
        <template #icon>
          <Heart
            :size="24"
          />
        </template>
      </Button>
      <Button
        type="primary"
        path="/_work"
        layout="icon-only"
        :animation="['slide-up', '0']"
        :theme="theme"
      >
        <template #icon>
          <Briefcase
            :size="24"
          />
        </template>
      </Button>
      <Button
        type="primary"
        path="/_lab"
        layout="icon-only"
        :animation="['slide-up', '0']"
        :theme="theme"
      >
        <template #icon>
          <FlaskConical
            :size="24"
          />
        </template>
      </Button>
      <Button
        type="primary"
        path="/_contact"
        layout="icon-only"
        :animation="['slide-up', '0']"
        :theme="theme"
      >
        <template #icon>
          <Mail
            :size="24"
          />
        </template>
      </Button>
      <Button
        type="primary"
        path="/_archive"
        layout="icon-only"
        :animation="['slide-up', '0']"
        :theme="theme"
      >
        <template #icon>
          <Archive
            :size="24"
          />
        </template>
      </Button>
    </section>
    <Footer
      alignment="left"
      :theme="theme"
    />
  </main>
</template>

<style scoped lang="sass">
  .menu
    grid-area: main
    display: flex
</style>
