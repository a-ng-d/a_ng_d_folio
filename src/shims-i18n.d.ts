import '@vue/runtime-core'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, named?: Record<string, unknown>) => string
  }
}
