// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Theme: Astro Wellness by Domenico Tenace (MIT), https://github.com/DomeT99/astro-wellness
export default defineConfig({
  site: 'https://blandwebsite.com',
  integrations: [sitemap()],
  vite: {
    css: {
      preprocessorOptions: {
        // Bulma 1.0.4 still uses the legacy Sass if() function.
        scss: {
          silenceDeprecations: ['if-function'],
        },
      },
    },
  },
});
