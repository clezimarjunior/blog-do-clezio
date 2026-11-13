# Blog do Clézio

Site do Blog do Clézio — política, bastidores e serviço de Parnamirim e do RN.
Feito com [Astro](https://astro.build) e publicado na Cloudflare (Workers Static Assets).

## Como publicar uma matéria

**Pelo painel (sem código):** entre em [app.pagescms.org](https://app.pagescms.org) com o GitHub,
abra este repositório e vá em **Matérias → Adicionar**. Ao salvar, a Cloudflare publica o site sozinha em cerca de 1 minuto.

**Pelo código:** crie um arquivo `.md` em `src/content/posts/`. O nome do arquivo vira o endereço da matéria.

```md
---
title: "Título da matéria"
linhaFina: "Resumo de uma frase."
categoria: parnamirim   # politica, parnamirim, rn, brasil, economia, servico, bastidores, opiniao
chapeu: "Câmara"        # opcional
tags: ["Câmara de Parnamirim"]
publicado: 2026-11-13T10:42:00-03:00
imagem: /uploads/foto.jpg   # opcional
legenda: "Legenda da foto"
credito: "Nome do fotógrafo"
destaque: false   # true = vira a manchete principal da home
rascunho: false   # true = não aparece no site
---

Texto da matéria em Markdown.
```

## Lançamento

Hoje o site está em **modo prévia**: fora do Google (`noindex`), com matérias de exemplo e espaços de anúncio visíveis.
Para lançar, em `src/site.ts` mude `launched: false` para `launched: true` e apague os arquivos `exemplo-*.md` em `src/content/posts/`.
Depois disso, cadastre o site no Google Search Console e envie `/sitemap-index.xml` e `/news-sitemap.xml`.

Antes de lançar, complete os campos entre colchetes em `src/pages/sobre.astro`, `politica-editorial.astro`, `anuncie.astro` e `privacidade.astro`,
e os links das redes em `src/site.ts`.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm install` | Instala as dependências |
| `npm run dev` | Site local em `localhost:4321` |
| `npm run build` | Gera o site em `dist/` |
| `npm run deploy` | Publica direto na Cloudflare (precisa de `wrangler login`) |

## Deploy automático na Cloudflare

Cloudflare → **Workers & Pages → Create → Import a repository** → escolha este repositório.
Build command: `npm run build` · Deploy command: `npx wrangler deploy`.
A cada commit na branch `main`, o site é publicado de novo.
