import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import jsx from '@vitejs/plugin-vue-jsx'
import voie from 'vite-plugin-voie'
import markdown from 'vite-plugin-md'
import components from 'vite-plugin-components'

import { resolve } from 'path'
import { readFileSync } from 'fs'
import postcss from 'postcss'
import lessParser from 'postcss-less'
import postcssImport from 'postcss-import'

function loadGloalStyles(...paths: string[]) {
  const styles = Promise.all(
    paths.map((path) =>
      postcss().use(postcssImport()).process(readFileSync(path, 'utf8'), {
        from: path,
        parser: lessParser,
      })
    )
  ).then((results) => results.join(''))
  return (content: string) => styles.then((res) => res + content)
}

const VantResolver = () => (name: string) => {
  if (name.startsWith('Van')) {
    const importName = name.slice(3)
    const styleName =
      importName[0].toLowerCase() +
      importName.slice(1).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
    return {
      importName,
      path: 'vant',
      sideEffects: `vant/es/${styleName}/style/index`,
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    jsx(),
    voie({
      extensions: ['vue', 'md'],
    }),
    components({
      deep: true,
      extensions: ['vue'],
      customLoaderMatcher: (path) => path.endsWith('.md'),
      customComponentResolvers: [VantResolver()],
    }),
    markdown({
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true,
      },
      wrapperClasses: 'markdown-body',
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '/src'),
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: loadGloalStyles('./src/styles/variables.less', './src/styles/mixins.less'),
      },
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://my-json-server.typicode.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    polyfillDynamicImport: true,
    chunkSizeWarningLimit: 200,
    rollupOptions: {
      output: {
        manualChunks: {
          libs: ['vue-request', 'lodash', 'vant', 'axios', 'hammerjs'],
          vender: ['vue', 'pinia', 'vue-router'],
        },
      },
    },
  },
})
