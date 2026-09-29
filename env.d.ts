/// <reference types="vite/client" />
declare const __APP_VERSION__: string
declare module 'v-lazy-image'
declare module '*.vue'
declare module '*.json' {
  const value: any
  export default value
}

declare module 'virtual:work-content' {
  import type { WorkProject } from '@/content/types'
  export const projects: WorkProject[]
}
