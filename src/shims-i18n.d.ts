import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, named?: Record<string, unknown>) => string
  }
}
