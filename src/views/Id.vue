<script setup lang="ts">
  import MainMenu from '@/components/patterns/MainMenu.vue'
  import Footer from '@/components/patterns/Footer.vue'
  import Button from '@/components/ui/Button.vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import RichExternalLink from '@/components/ui/RichExternalLink.vue'
  import { RotateCcw, Twitter, Dribbble, BookOpen, Codepen, Github, Linkedin, Download } from 'lucide-vue-next'
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
          <template #plain>
            <div>
              <p v-html="$t('id.biography.experience')"></p>
              <p>{{ $t("id.biography.mission") }}</p>
              <p v-html="$t('id.biography.activities')"></p>
              <p>{{ $t("id.biography.side") }}</p>
            </div>
          </template>
        </OneColumn>
      </section>
      <section>
        <TwoColumns
          :title="$t('id.network.title')"
        >
          <template #left>
            <RichExternalLink
              :title="$t('id.network.twitter.title')"
              :description="$t('id.network.twitter.description')"
              color="var(--color-soft-wind)"
              :href="$t('id.network.twitter.href')"
              :alt="$t('id.network.twitter.alt')"
            >
              <template #icon>
                <Twitter
                  :size="48"
                />
              </template>
            </RichExternalLink>
            <RichExternalLink
              :title="$t('id.network.codepen.title')"
              :description="$t('id.network.codepen.description')"
              color="var(--color-deep-black)"
              :href="$t('id.network.codepen.href')"
              :alt="$t('id.network.codepen.alt')"
            >
              <template #icon>
                <Codepen
                  :size="48"
                  stroke="var(--color-titanium-white)"
                />
              </template>
            </RichExternalLink>
            <RichExternalLink
              :title="$t('id.network.github.title')"
              :description="$t('id.network.github.description')"
              color="var(--color-creamy-sun)"
              :href="$t('id.network.github.href')"
              :alt="$t('id.network.github.alt')"
            >
              <template #icon>
                <Github
                  :size="48"
                />
              </template>
            </RichExternalLink>
          </template>
          <template #right>
            <RichExternalLink
              :title="$t('id.network.dribbble.title')"
              :description="$t('id.network.dribbble.description')"
              color="var(--color-candy-floss)"
              :href="$t('id.network.dribbble.href')"
              :alt="$t('id.network.dribbble.alt')"
            >
              <template #icon>
                <Dribbble
                  :size="48"
                />
              </template>
            </RichExternalLink>
            <RichExternalLink
              :title="$t('id.network.medium.title')"
              :description="$t('id.network.medium.description')"
              color="var(--color-titanium-white)"
              :href="$t('id.network.medium.href')"
              :alt="$t('id.network.medium.alt')"
            >
              <template #icon>
                <BookOpen
                  :size="48"
                />
              </template>
            </RichExternalLink>
          </template>
        </TwoColumns>
      </section>
      <section>
        <TwoColumns
          :title="$t('id.career.title', { year: new Date().getFullYear() - 2015 })"
        >
          <template #left>
            <Button type="secondary" path="/" layout="indicator">
              <template #icon>
                <Download
                  :size="24"
                />
              </template>
              <template #label>
                {{ $t("id.career.resume") }}
              </template>
            </Button>
          </template>
          <template #right>
            <Button type="secondary" path="/" layout="indicator">
              <template #icon>
                <Linkedin
                  :size="24"
                />
              </template>
              <template #label>
                {{ $t("id.career.linkedIn") }}
              </template>
            </Button>
          </template>
        </TwoColumns>
        <OneColumn>
          <template #plain>
            <div>
              <h5>
                <span>{{ $t("id.career.ecv.start") }}</span>
                <span>{{ $t("global.separator") }}</span>
                <span>{{ $t("id.career.ecv.end") }}</span>
              </h5>
              <h4>{{ $t("id.career.ecv.title") }}</h4>
              <p>{{ $t("id.career.ecv.label") }}</p>
            </div>
            <div>
              <h5>
                <span>{{ $t("id.career.iobeya.start") }}</span>
                <span>{{ $t("global.separator") }}</span>
                <span>{{ $t("id.career.iobeya.end") }}</span>
              </h5>
              <h4>{{ $t("id.career.iobeya.title") }}</h4>
              <div>
                <h6>
                  <span>{{ $t("id.career.iobeya.uxDesign.start") }}</span>
                  <span>{{ $t("global.separator") }}</span>
                  <span>{{ $t("id.career.iobeya.uxDesign.end") }}</span>
                </h6>
                <p>{{ $t("id.career.iobeya.uxDesign.title") }}</p>
              </div>
              <div>
                <h6>
                  <span>{{ $t("id.career.iobeya.productDesign.start") }}</span>
                  <span>{{ $t("global.separator") }}</span>
                  <span>{{ $t("id.career.iobeya.productDesign.end") }}</span>
                </h6>
                <p>{{ $t("id.career.iobeya.productDesign.title") }}</p>
              </div>
              <div>
                <h6>
                  <span>{{ $t("id.career.iobeya.creativeTechnologist.start") }}</span>
                  <span>{{ $t("global.separator") }}</span>
                  <span>{{ $t("id.career.iobeya.creativeTechnologist.end") }}</span>
                </h6>
                <p>{{ $t("id.career.iobeya.creativeTechnologist.title") }}</p>
              </div>
            </div>
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
    background-attachment: fixed
    height: fit-content

  // Structure
  .article
    grid-area: main
</style>
