// Índice de busca do blog: gerado a cada publicação, lido pela página /busca/.
import { getPosts, postUrl, kicker } from '../lib/posts';
import { resolveImage } from '../lib/remote-image.mjs';

export async function GET() {
  const posts = await getPosts();
  const items = posts.map((p) => ({
    t: p.data.title,
    d: p.data.linhaFina,
    u: postUrl(p),
    k: kicker(p),
    c: p.data.categoria,
    g: p.data.tags,
    i: resolveImage(p.data.imagem) ?? null,
    p: p.data.publicado.toISOString(),
    b: (p.body ?? '').replace(/[#>*_`\[\]()|-]/g, ' ').replace(/https?:\S+/g, ' ').replace(/\s+/g, ' ').slice(0, 1500),
  }));
  return new Response(JSON.stringify(items), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}
