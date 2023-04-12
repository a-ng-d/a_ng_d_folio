<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import TwoColumns from '@/components/layouts/TwoColumns.vue'
  import WrapColumn from '@/components/layouts/WrapColumn.vue'
  import LinkContainer from '@/components/patterns/LinkContainer.vue'
  import Figure from '@/components/patterns/Figure.vue'
  import SimpleExternalLink from '@/components/ui/SimpleExternalLink.vue'
  import { Info, Bot, Apple, Pointer } from 'lucide-vue-next'
  import { doMap } from '@/utilities/operations'
  import { assets } from '@/utilities/assets'

  export default defineComponent({
    name: '_jeprendsquoi',
    components: {
      OneColumn,
      TwoColumns,
      WrapColumn,
      LinkContainer,
      Figure,
      SimpleExternalLink,
      Info,
      Bot,
      Apple,
      Pointer,
    },
    props: {
      scrollProgress: {
        type: Number,
        required: true,
      },
      scrollLimit: {
        type: Number,
        required: true,
      },
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
    data: function () {
      return {
        isFullScreen: false as boolean,
        assets: assets,
      }
    },
    methods: {
      parallax(start: number, end: number) {
        return `${doMap(this.scrollProgress, 0, this.scrollLimit, start, end)}%`
      },
    },
  })
</script>

<template>
  <section class="challenge">
    <OneColumn :title="$t('work._jeprendsquoi.challenge.title')" :theme="theme">
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.challenge.paragraph-1') }}</p>
        <ul>
          <li>{{ $t('work._jeprendsquoi.challenge.point-1') }}</li>
          <li>{{ $t('work._jeprendsquoi.challenge.point-2') }}</li>
        </ul>
        <p>{{ $t('work._jeprendsquoi.challenge.paragraph-2') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn :title="$t('work._jeprendsquoi.part-1.title')" :theme="theme">
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-1') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[2]"
          caption
          :width="1440"
          :height="900"
          :alt="$t('work._jeprendsquoi.part-1.caption-1')"
          :theme="theme"
        >
          <template #caption>
            <i18n-t
              keypath="work._jeprendsquoi.part-1.caption-1"
              tag="p"
              class="discrete"
              scope="global"
            >
              <template #linkOne>
                <SimpleExternalLink
                  :label="$t('work._jeprendsquoi.externalLinks.linkOne.label')"
                  :href="$t('work._jeprendsquoi.externalLinks.linkOne.href')"
                  :alt="$t('work._jeprendsquoi.externalLinks.linkOne.alt')"
                  small
                  :theme="theme"
                />
              </template>
              <template #linkTwo>
                <SimpleExternalLink
                  :label="$t('work._jeprendsquoi.externalLinks.linkTwo.label')"
                  :href="$t('work._jeprendsquoi.externalLinks.linkTwo.href')"
                  :alt="$t('work._jeprendsquoi.externalLinks.linkTwo.alt')"
                  small
                  :theme="theme"
                />
              </template>
            </i18n-t>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[3]"
          caption
          :width="1440"
          :height="900"
          :alt="$t('work._jeprendsquoi.part-1.caption-2')"
        >
          <template #caption>
            <i18n-t
              keypath="work._jeprendsquoi.part-1.caption-2"
              tag="p"
              class="discrete"
              scope="global"
            >
              <template #linkThree>
                <SimpleExternalLink
                  :label="
                    $t('work._jeprendsquoi.externalLinks.linkThree.label')
                  "
                  :href="$t('work._jeprendsquoi.externalLinks.linkThree.href')"
                  :alt="$t('work._jeprendsquoi.externalLinks.linkThree.alt')"
                  small
                  :theme="theme"
                />
              </template>
            </i18n-t>
          </template>
        </Figure>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-1.paragraph-3') }}</p>
      </template>
    </OneColumn>
  </section>
  <section>
    <OneColumn :title="$t('work._jeprendsquoi.part-2.title')" :theme="theme">
      <template #plain>
        <i18n-t
          keypath="work._jeprendsquoi.part-2.paragraph-1"
          tag="p"
          scope="global"
        >
          <template #linkFour>
            <SimpleExternalLink
              :label="$t('work._jeprendsquoi.externalLinks.linkFour.label')"
              :href="$t('work._jeprendsquoi.externalLinks.linkFour.href')"
              :alt="$t('work._jeprendsquoi.externalLinks.linkFour.alt')"
              :theme="theme"
            />
          </template>
        </i18n-t>
      </template>
    </OneColumn>
    <WrapColumn :columns="4" :isFullScreen="isFullScreen" :theme="theme">
      <template #plain>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[4]"
          caption
          :width="750"
          :height="1334"
          :alt="$t('work._jeprendsquoi.part-2.caption-1')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-1') }}
            </p>
          </template>
        </Figure>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[5]"
          caption
          :width="750"
          :height="1334"
          :alt="$t('work._jeprendsquoi.part-2.caption-2')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-2') }}
            </p>
          </template>
        </Figure>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[6]"
          caption
          :width="750"
          :height="1334"
          :alt="$t('work._jeprendsquoi.part-2.caption-3')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-3') }}
            </p>
          </template>
        </Figure>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[7]"
          caption
          :width="750"
          :height="1334"
          :alt="$t('work._jeprendsquoi.part-2.caption-4')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-4') }}
            </p>
          </template>
        </Figure>
      </template>
    </WrapColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <p>{{ $t('work._jeprendsquoi.part-2.paragraph-2') }}</p>
      </template>
    </OneColumn>
    <OneColumn :theme="theme">
      <template #plain>
        <LinkContainer
          :description="$t('work._jeprendsquoi.part-2.info.description')"
          :cta="$t('work._jeprendsquoi.part-2.info.linkLabel')"
          href="https://yuka.io"
          :alt="$t('work._jeprendsquoi.part-2.info.alt')"
          :theme="theme"
        >
          <template #icon>
            <Info :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
    <TwoColumns :theme="theme">
      <template #left>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[8]"
          caption
          :width="640"
          :height="640"
          :alt="$t('work._jeprendsquoi.part-2.caption-7')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-7') }}
            </p>
          </template>
        </Figure>
      </template>
      <template #right>
        <Figure
          type="image"
          :src="assets._jeprendsquoi[9]"
          caption
          :width="640"
          :height="640"
          :alt="$t('work._jeprendsquoi.part-2.caption-8')"
          @isMagnified="isFullScreen = $event"
        >
          <template #caption>
            <p class="discrete">
              {{ $t('work._jeprendsquoi.part-2.caption-8') }}
            </p>
          </template>
        </Figure>
      </template>
    </TwoColumns>
  </section>
  <section class="ending"></section>
  <section class="takeaways">
    <OneColumn :title="$t('global.takeaways')" :theme="theme">
      <template #plain>
        <LinkContainer
          :description="
            $t('work._jeprendsquoi.takeaways.takeaway-1.description')
          "
          :cta="$t('work._jeprendsquoi.takeaways.takeaway-1.linkLabel')"
          href="https://play.google.com/store/apps/details?id=app.bravostudio.A01F6ZSK8YBS59Y8H0ZH6BN4D4F"
          :alt="$t('work._jeprendsquoi.takeaways.takeaway-1.alt')"
          :theme="theme"
        >
          <template #icon>
            <Bot :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._jeprendsquoi.takeaways.takeaway-2.description')
          "
          :cta="$t('work._jeprendsquoi.takeaways.takeaway-2.linkLabel')"
          href="https://apps.apple.com/fr/app/jeprendsquoi/id1672862298"
          :alt="$t('work._jeprendsquoi.takeaways.takeaway-2.alt')"
          :theme="theme"
        >
          <template #icon>
            <Apple :size="48" />
          </template>
        </LinkContainer>
        <LinkContainer
          :description="
            $t('work._jeprendsquoi.takeaways.takeaway-3.description')
          "
          :cta="$t('work._jeprendsquoi.takeaways.takeaway-3.linkLabel')"
          href="https://jeprendsquoi.app"
          :alt="$t('work._jeprendsquoi.takeaways.takeaway-3.alt')"
          :theme="theme"
        >
          <template #icon>
            <Pointer :size="48" />
          </template>
        </LinkContainer>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass">
  @use '@/assets/stylesheets/mixins' as device

  section.ending
    height: 100vh
    background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) 35% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 65% v-bind('parallax(300, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat
    background-color: var(--color-titanium-white) !important

  @include device.tablet
    section.ending
      background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) 25% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 75% v-bind('parallax(300, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-logotype.svg) 50% v-bind('parallax(200, 20)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-broccoli.png) 100% v-bind('parallax(100, -5)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-eggplant.png) 70% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pumpkin.png) 35% v-bind('parallax(100, 10)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-leek.png) 15% v-bind('parallax(200, 30)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-tomato.png) -5% v-bind('parallax(100, 50)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-pear.png) 10% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-cherry.png) 95% v-bind('parallax(200, 90)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-lemon.png) 85% v-bind('parallax(200, 50)') no-repeat
      background-color: var(--color-titanium-white) !important

  @include device.smartphone
    section.ending
      background: url(/images/_work/_jeprendsquoi/ending-asset-2.png) 50% v-bind('parallax(400, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-1.png) -155% v-bind('parallax(200, 100)') no-repeat, url(/images/_work/_jeprendsquoi/ending-asset-3.png) 300% v-bind('parallax(300, 100)') no-repeat
</style>
