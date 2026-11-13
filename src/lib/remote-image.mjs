import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

// Caminho local (dentro de public/) para uma imagem externa.
export function remoteImageFile(url) {
  const ext = (url.split('?')[0].match(/\.(jpe?g|png|webp|gif|avif)$/i)?.[0] ?? '.jpg').toLowerCase();
  const hash = createHash('sha1').update(url).digest('hex').slice(0, 16);
  return `uploads/remote/${hash}${ext}`;
}

// Usa a cópia local se ela foi baixada no build; senão, o link original.
export function resolveImage(src) {
  if (!src || !/^https?:\/\//.test(src)) return src;
  const file = remoteImageFile(src);
  return existsSync(join(process.cwd(), 'public', file)) ? `/${file}` : src;
}
