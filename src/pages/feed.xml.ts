import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPosts, postUrl } from '../lib/posts';
import { SITE } from '../site';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: SITE.name,
    description: SITE.tagline,
    site: context.site!,
    items: posts.slice(0, 50).map((p) => ({
      title: p.data.title,
      description: p.data.linhaFina,
      pubDate: p.data.publicado,
      link: postUrl(p),
      categories: [p.data.categoria, ...p.data.tags],
      author: p.data.autor,
    })),
    customData: '<language>pt-br</language>',
  });
}
