import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import pages from 'vite-plugin-pages';
import components from 'vite-plugin-components';
import usePluginImport from 'vite-plugin-importer';

import { resolve } from 'path';
import { readFileSync } from 'fs';
import postcss from 'postcss';
import lessParser from 'postcss-less';
import postcssImport from 'postcss-import';

function GloalStylesLoader(...paths: string[]) {
  const styles = Promise.all(
    paths.map((path) =>
      postcss()
        // @ts-ignore
        .use(postcssImport())
        .process(readFileSync(path, 'utf8'), {
          from: path,
          parser: lessParser,
        })
    )
  ).then((results) => results.join(''));
  return (content: string) => styles.then((res) => res + content);
}

const VantResolver = () => (name: string) => {
  if (name.startsWith('Van')) {
    const importName = name.slice(3);
    const styleName =
      importName[0].toLowerCase() +
      importName.slice(1).replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
    return {
      importName,
      path: 'vant',
      sideEffects: `vant/es/${styleName}/style/less`,
    };
  }
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    jsx(),
    pages({
      exclude: ['**/components/**'],
      extensions: ['vue'],
      importMode: 'sync',
      routeBlockLang: 'yaml',
    }),
    components({
      deep: true,
      extensions: ['vue', 'tsx'],
      customComponentResolvers: [VantResolver()],
    }),
    usePluginImport({
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: (name) => `${name}/style/less`,
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
      { find: /^~/, replacement: '' },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: GloalStylesLoader(
          './src/styles/variables.less',
          './src/styles/mixins.less'
        ),
      },
    },
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
          libs: ['lodash', 'vant', 'axios', 'hammerjs'],
          vender: ['vue', 'pinia', 'vue-router'],
        },
      },
    },
  },
});
