<script setup lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
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
    <article class="article">
      <section>
        <OneColumn
          :title="$t('id.biography.title')"
        >
          <template #content>
            <p v-html="$t('id.biography.experience')"></p>
            <p v-html="$t('id.biography.mission')"></p>
            <p v-html="$t('id.biography.activities')"></p>
            <p v-html="$t('id.biography.side')"></p>
          </template>
        </OneColumn>
      </section>
    </article>
    <Footer
      alignment="center"
    />
  </main>
</template>

<style scoped lang="sass">
  @use '@/assets/text-styles.sass' as text

  .page
    background: var(--gradient-biscarosse-sunset)

  // Structure
  .article
    grid-area: main
</style>
