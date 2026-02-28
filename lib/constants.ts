import { Article, Service } from './types';
import { createClient } from '@supabase/supabase-js';

// Helper to get dynamic content from environment variables
const getDynamicContent = () => {
  if (typeof process === 'undefined' || !process.env.SITE_CONTENT) return null;
  try {
    return JSON.parse(process.env.SITE_CONTENT);
  } catch (e) {
    console.error("Failed to parse SITE_CONTENT", e);
    return null;
  }
};

const dynamic = getDynamicContent();

const rawDomain = dynamic?.domain || 'https://sitowebprofessionale.online';
export const DOMAIN = rawDomain.startsWith('http') ? rawDomain : `https://${rawDomain}`;
export const BRAND_NAME = dynamic?.brandName || 'SitoWeb';
export const BRAND_TAGLINE = dynamic?.brandTagline || 'Professionale';
export const HERO_TITLE = dynamic?.heroTitle || 'Crea la tua Eccellenza Digitale Professionale.';
export const HERO_SUBTITLE = dynamic?.heroSubtitle || 'Dal 2018 aiutiamo professionisti e aziende a scalare i motori di ricerca con siti web ultra-veloci e design orientato alla conversione.';
export const SERVICES_TITLE = dynamic?.servicesTitle || 'Soluzioni Digitali di Eccellenza';
export const SERVICES_SUBTITLE = dynamic?.servicesSubtitle || 'Sviluppiamo ecosistemi digitali che combinano estetica superiore e architetture moderne ad alte prestazioni.';
export const FOOTER_QUOTE = dynamic?.footerQuote || 'Ogni progetto è un\'opportunità per ridefinire gli standard.';
export const SITE_TITLE = dynamic?.siteTitle || `${BRAND_NAME} ${BRAND_TAGLINE}`;
export const META_DESCRIPTION = dynamic?.metaDescription || "Il punto di riferimento per l'eccellenza digitale e strategie SEO avanzate.";
export const CAMPAIGN_ID = dynamic?.campaignId || null;

// Guide & Video Content
export const GUIDE_HERO_TITLE = dynamic?.guideHeroTitle || 'Guida alla Scelta Professionale';
export const GUIDE_HERO_SUBTITLE = dynamic?.guideHeroSubtitle || 'Suggerimenti pratici e checklist per massimizzare i tuoi risultati.';
export const GUIDES = dynamic?.guides || [];
export const GUIDE_CTA_TITLE = dynamic?.guideCtaTitle || 'Hai bisogno di supporto?';
export const GUIDE_CTA_SUBTITLE = dynamic?.guideCtaSubtitle || 'Contattaci oggi per una consulenza gratuita e personalizzata.';
export const GUIDE_CTA_TEXT = dynamic?.guideCtaText || 'Contattaci Ora';
export const YOUTUBE_VIDEO_ID = dynamic?.youtubeVideoId || ''; // Empty by default, populated by AI

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'
);

// Function to fetch articles from DB
export async function getLiveArticles(): Promise<Article[]> {
  if (!CAMPAIGN_ID) return ARTICLES;

  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('campaign_id', CAMPAIGN_ID)
      .order('published_at', { ascending: false });

    if (error) throw error;
    if (!data || data.length === 0) return ARTICLES;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((a: any) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
      description: a.excerpt,
      content: a.content,
      category: a.category,
      author: 'Redazione',
      authorRole: 'Esperto SEO',
      date: new Date(a.published_at).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' }),
      image: a.image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      alt: a.title,
      tags: a.tags || []
    }));
  } catch (err) {
    console.error("Failed to fetch live articles", err);
    return ARTICLES;
  }
}

// Fallback Articles (Mock data)
export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'benvenuti',
    title: 'Benvenuti nel tuo nuovo HUB di contenuti SEO',
    excerpt: 'I tuoi articoli generati dall\'AI appariranno qui tra pochi minuti.',
    description: 'Pagina di benvenuto del nuovo network ADSEO.',
    content: '<p>Il sistema sta generando i tuoi 5 articoli pilastro. Una volta terminato, questa sezione verrà aggiornata automaticamente con contenuti ottimizzati e pronti per scalare Google.</p>',
    category: 'Update',
    author: 'ADSEO Team',
    authorRole: 'System',
    date: 'Oggi',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    alt: 'HUB Digitale',
    tags: ['Tech', 'SEO']
  }
];

export const SERVICES: Service[] = dynamic?.services || [
  {
    id: 's1',
    title: 'Servizio di Eccellenza',
    description: 'Soluzioni su misura progettate per massimizzare i risultati e garantire standard qualitativi superiori nel settore.',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z'
  },
  {
    id: 's2',
    title: 'Esperienza e Qualità',
    description: 'L\'affidabilità dei nostri processi ci permette di offrire un supporto concreto e professionale per ogni esigenza.',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    id: 's3',
    title: 'Innovazione Costante',
    description: 'Adottiamo le migliori strategie per assicurarci che ogni aspetto del progetto sia curato nei minimi dettagli.',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  }
];
