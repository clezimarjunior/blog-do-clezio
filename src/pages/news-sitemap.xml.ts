// Sitemap de notícias para o Google News: só matérias das últimas 48 horas
// (contadas a partir da última publicação do site).
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { SITE } from '../site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const posts = await getPosts();
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const recent = posts.filter((p) => p.data.publicado.valueOf() >= cutoff);
  const items = recent
    .map(
      (p) => `  <url>
    <loc>${new URL(postUrl(p), context.site).href}</loc>
    <news:news>
      <news:publication><news:name>${esc(SITE.name)}</news:name><news:language>pt</news:language></news:publication>
      <news:publication_date>${p.data.publicado.toISOString()}</news:publication_date>
      <news:title>${esc(p.data.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${items}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
