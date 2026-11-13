// Configurações gerais do Blog do Clézio.

export const SITE = {
  name: 'Blog do Clézio',
  shortName: 'Clézio',
  tagline: 'Política, bastidores e serviço de Parnamirim e do Rio Grande do Norte',
  locale: 'pt_BR',
  city: 'Parnamirim',
  state: 'Rio Grande do Norte',
  author: 'Clézio',
  // Enquanto for false, o site fica fora do Google (noindex) e mostra as
  // matérias de exemplo e os espaços de anúncio. No lançamento, mude para true.
  launched: false,
  social: {
    whatsappChannel: 'https://whatsapp.com/channel/0029VbE8AD9JP21DVIasC73K',
    instagram: 'https://www.instagram.com/blogdoclezio/',
    instagramHandle: '@blogdoclezio',
  },
};

export const CATEGORIES = [
  { slug: 'politica', name: 'Política', description: 'Política de Parnamirim, do Rio Grande do Norte e do Brasil.' },
  { slug: 'parnamirim', name: 'Parnamirim', description: 'Notícias da prefeitura, da Câmara e dos bairros de Parnamirim.' },
  { slug: 'rn', name: 'RN', description: 'Governo, Assembleia e municípios do Rio Grande do Norte.' },
  { slug: 'brasil', name: 'Brasil', description: 'O que acontece em Brasília e afeta o potiguar.' },
  { slug: 'economia', name: 'Economia', description: 'Emprego, negócios e dinheiro no RN.' },
  { slug: 'servico', name: 'Serviço', description: 'Concursos, prazos, IPTU, feriados e guias úteis para quem mora em Parnamirim.' },
  { slug: 'bastidores', name: 'Bastidores', description: 'O que se comenta nos corredores da política potiguar.' },
  { slug: 'opiniao', name: 'Opinião', description: 'A coluna e as análises do Clézio.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
