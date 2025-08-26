import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.test.ts', 'src/**/*.test.ts', 'src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      // include all source files for coverage analysis, but exclude test files themselves
      all: true,
      include: ['src/**/*.{ts,js}'],
      exclude: ['src/**/*.test.ts', 'test/**']
    }
  }
});
