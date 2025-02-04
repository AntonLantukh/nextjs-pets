import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import type { UserConfig } from 'vitest/config';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    watch: false,
    include: ['**/*.test.ts', '**/*.test.tsx'],
    exclude: ['node_modules/**/*'],
    setupFiles: 'vite-setup.ts',
  },
} as UserConfig);
