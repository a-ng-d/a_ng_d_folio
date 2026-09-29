/// <reference types="vite/client" />
declare const __APP_VERSION__: string
declare module 'v-lazy-image'
declare module '*.vue'
declare module '*.json' {
  const value: Record<string, unknown>
  export default value
}

declare module 'virtual:work-content' {
  import type { WorkProject } from '@/content/types'
  export const projects: WorkProject[]
}

declare module 'virtual:asset-sizes' {
  export const sizes: Record<string, [number, number]>
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}
