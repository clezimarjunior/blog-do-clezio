// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Troque pelo domínio definitivo quando ele estiver apontado para a Cloudflare.
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://blogdoclezio.com.br';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
    }),
  ],
});
