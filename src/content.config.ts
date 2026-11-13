import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './site';

const slugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    linhaFina: z.string(),
    categoria: z.enum(slugs),
    chapeu: z.string().optional(),
    tags: z.array(z.string()).default([]),
    autor: z.string().default('Clézio'),
    publicado: z.coerce.date(),
    atualizado: z.coerce.date().optional(),
    imagem: z.string().optional(),
    legenda: z.string().optional(),
    credito: z.string().optional(),
    creditoUrl: z.string().url().optional(),
    destaque: z.boolean().default(false),
    rascunho: z.boolean().default(false),
    exemplo: z.boolean().default(false),
  }),
});

export const collections = { posts };
