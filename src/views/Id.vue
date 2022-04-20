<script setup lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import { RotateCcw } from 'lucide-vue-next'
</script>

<template>
  <main class="page">
    <MainMenu
      logotypeColor="var(--color-soil)"
    >
      <template #left-part>
        <Button type="primary" path="/" layout="indicator">
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
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  .page
    background: var(--gradient-biscarosse-sunset)
</style>
