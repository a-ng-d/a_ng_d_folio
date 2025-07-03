<script lang="ts">
  import { defineComponent } from 'vue'
  import OneColumn from '@/components/layouts/OneColumn.vue'
  import Label from '@/components/ui/Label.vue'

  export default defineComponent({
    name: 'About',
    components: {
      OneColumn,
      Label,
    },
    props: {
      theme: {
        type: String,
        default: 'DEFAULT',
      },
    },
  })
</script>

<template>
  <section>
    <OneColumn :title="$t('id.about.title')" :theme="theme">
      <template #plain>
        <div>
          <i18n-t keypath="id.about.experience" tag="p">
            <template v-slot:iobeya>
              <Label :label="$t('global.iobeya')" highlighted :theme="theme" />
            </template>
            <template v-slot:razorfish>
              <Label
                :label="$t('global.razorfish')"
                highlighted
                :theme="theme"
              />
            </template>
            <template v-slot:axeptio>
              <Label :label="$t('global.axeptio')" highlighted :theme="theme" />
            </template>
            <template v-slot:year>
              {{ new Date().getFullYear() - 2015 }}
            </template>
          </i18n-t>
          <p>{{ $t('id.about.mission') }}</p>
          <i18n-t keypath="id.about.activities" tag="p">
            <template #team>
              <Label :label="$t('global.team')" highlighted :theme="theme" />
            </template>
            <template #thinking>
              <Label
                :label="$t('global.thinking')"
                highlighted
                :theme="theme"
              />
            </template>
            <template #system>
              <Label :label="$t('global.system')" highlighted :theme="theme" />
            </template>
          </i18n-t>
          <i18n-t keypath="id.about.side" tag="p">
            <template #uicp>
              <Label :label="$t('global.uicp')" highlighted :theme="theme" />
            </template>
          </i18n-t>
        </div>
      </template>
    </OneColumn>
  </section>
</template>

<style scoped lang="sass"></style>
