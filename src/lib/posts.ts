import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, categoryBySlug } from '../site';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('posts', ({ data }) => {
    if (data.rascunho) return false;
    if (SITE.launched && data.exemplo) return false;
    return true;
  });
  return all.sort((a, b) => b.data.publicado.valueOf() - a.data.publicado.valueOf());
}

export const postUrl = (p: Post) => `/${p.data.categoria}/${p.id}/`;

export const kicker = (p: Post) => p.data.chapeu ?? categoryBySlug(p.data.categoria)?.name ?? '';

const TZ = 'America/Fortaleza';

export function formatDateLong(d: Date) {
  return new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ }).format(d);
}

export function formatDateTime(d: Date) {
  const date = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: TZ }).format(d);
  const time = new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: TZ }).format(d).replace(':', 'h');
  return `${date} · ${time}`;
}

export function formatDateShort(d: Date) {
  return new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'short', timeZone: TZ }).format(d).replace('.', '');
}
