import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import importToCDN from 'vite-plugin-cdn-import'
import { createHtmlPlugin } from 'vite-plugin-html'
import { name, title } from './package.json'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_PUBLIC_BASE,
    build: {
      outDir: name,
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      open: true,
    },
    plugins: [
      vue(),
      vueJsx(),
      createHtmlPlugin({
        minify: true,
        template: 'public/index.html',
        entry: '/src/main.ts',
        inject: {
          data: {
            title,
          },
          tags: [
            {
              tag: 'div',
              attrs: { id: 'root' },
              injectTo: 'body-prepend',
            },
          ],
        },
      }),
      importToCDN({
        prodUrl: `${env.VITE_PUBLIC_BASE}lib/{path}`,
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: 'vue.runtime.global.prod.js',
          },
          {
            name: 'vue-router',
            var: 'VueRouter',
            path: 'vue-router.global.min.js',
          },
          {
            name: 'axios',
            var: 'axios',
            path: 'axios.min.js',
          },
        ],
        enableInDevMode: true,
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
