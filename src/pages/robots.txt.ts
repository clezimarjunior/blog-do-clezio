import type { APIContext } from 'astro';
import { SITE } from '../site';

export function GET(context: APIContext) {
  const sitemap = new URL('/sitemap-index.xml', context.site).href;
  const news = new URL('/news-sitemap.xml', context.site).href;
  const body = SITE.launched
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\nSitemap: ${news}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
