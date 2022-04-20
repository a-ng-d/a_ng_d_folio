<script setup lang="ts">
  import MainMenu from '@/components/pattern/MainMenu.vue'
  import Footer from '@/components/pattern/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { RotateCcw } from 'lucide-vue-next'
</script>

<template>
  <MainMenu
    logotypeColor="var(--color-soil)"
    context="left action"
  >
    <template #button>
      <Button type="secondary" path="/" layout="indicator" inverted>
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
  <main class="article">
    <section>

    </section>
  </main>
  <Footer
    alignment="center"
  />
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  // Structure
  
</style>
