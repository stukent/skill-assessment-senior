import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: './src/test/environment.ts',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
