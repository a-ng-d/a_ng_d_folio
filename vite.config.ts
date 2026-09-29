import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'unplugin-vue-markdown/vite'
import container from 'markdown-it-container'
import workContent from './build/vite-plugin-work-content'

const SECTIONS = ['challenge', 'success', 'credit', 'takeaways', 'ending']

export default defineConfig({
  plugins: [
    vue({ include: [/\.vue$/, /\.md$/] }),
    Markdown({
      wrapperDiv: false,
      markdownItSetup(md) {
        md.use(container, 'section', {
          render: (tokens: never[], idx: number) =>
            (tokens[idx] as { nesting: number }).nesting === 1
              ? '<section>'
              : '</section>\n',
        })
        for (const name of SECTIONS)
          md.use(container, name, {
            render: (tokens: never[], idx: number) =>
              (tokens[idx] as { nesting: number }).nesting === 1
                ? `<section class="${name}">`
                : '</section>\n',
          })
      },
    }),
    workContent(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  build: {
    target: 'esnext',
  },
})
