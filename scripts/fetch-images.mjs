// Baixa as fotos externas das matérias (campo "imagem" com http) para
// public/uploads/remote/ antes do build, para o site servir as imagens do
// próprio domínio. Se o download falhar, o site usa o link original.
import { readdir, readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { remoteImageFile } from '../src/lib/remote-image.mjs';

const POSTS = 'src/content/posts';
const OUT = 'public/uploads/remote';
const UA = 'BlogDoClezio/1.0 (+https://blogdoclezio.com; build de imagens)';

await mkdir(OUT, { recursive: true });
const files = (await readdir(POSTS)).filter((f) => f.endsWith('.md'));
let ok = 0, skip = 0, fail = 0;

for (const f of files) {
  const text = await readFile(join(POSTS, f), 'utf8');
  const m = text.match(/^imagem:\s*"?(https?:\/\/[^"\n]+)"?\s*$/m);
  if (!m) continue;
  const url = m[1].trim();
  const dest = join('public', remoteImageFile(url));
  try { await access(dest); skip++; continue; } catch {}
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dest, Buffer.from(await res.arrayBuffer()));
    ok++;
  } catch (e) {
    fail++;
    console.warn(`[imagens] não baixou ${f}: ${e.message} (vai usar o link original)`);
  }
}
console.log(`[imagens] baixadas: ${ok}, já existiam: ${skip}, falharam: ${fail}`);
