/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'pathe';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const plugins = [
    react({
        babel: {
            plugins: ['babel-plugin-macros', 'babel-plugin-styled-components'],
        },
    }),
];

export default defineConfig({
    define:
        process.env.VITEST === undefined
            ? {
                  'process.env': {},
                  'process.platform': null,
                  'process.version': null,
                  'process.versions': null,
              }
            : undefined,

    plugins,

    resolve: {
        alias: {
            '@': resolve(dirname(fileURLToPath(import.meta.url)), 'ui'),
            '@definitions': resolve(dirname(fileURLToPath(import.meta.url)), 'ui', 'api', 'definitions'),
            '@feature': resolve(dirname(fileURLToPath(import.meta.url)), 'ui', 'components', 'server', 'features'),
        },
    },

    test: {
        environment: 'happy-dom',
        include: ['ui/**/*.{spec,test}.{ts,tsx}'],
    },
});
