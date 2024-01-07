import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { extname, relative, resolve } from 'path'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss(), tsconfigPaths(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: glob
        .sync('lib/**/*.{ts,tsx}')
        .map((file) => [
          relative('lib', file.slice(0, file.length - extname(file).length)),
          fileURLToPath(new URL(file, import.meta.url)),
        ])
        .reduce((entries, [key, value]) => {
          entries[key] = value
          return entries
        }, {}),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
