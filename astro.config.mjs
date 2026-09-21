import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://brendanrohan.github.io',
  base: '/MVPfolio',
  build: {
    assets: '_assets'
  }
});
