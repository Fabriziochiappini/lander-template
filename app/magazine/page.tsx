import React from 'react';
import JsonLd from '@/components/JsonLd';
import MagazineHero from '@/components/MagazineHero';
import ArticleGrid from '@/components/ArticleGrid';
import { getLiveArticles, DOMAIN } from '@/lib/constants';

export const revalidate = 0;

export default async function MagazinePage() {
  const articles = await getLiveArticles();

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-serif text-zinc-900">Nessun articolo disponibile al momento.</h1>
      </div>
    );
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": DOMAIN
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Magazine",
        "item": `${DOMAIN}/magazine`
      }
    ]
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto px-6 py-4">
      <JsonLd data={breadcrumbSchema} />

      <header className="mb-12 mt-8">
        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] text-zinc-900">
          Magazine & Approfondimenti
        </h1>
        <p className="mt-4 text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed">
          Esplora tutti i nostri articoli, le ultime novità e i contenuti in evidenza progettati per offrirti valore.
        </p>
      </header>

      {/* Hero Article component expects a single article */}
      <section className="mt-8">
        <MagazineHero article={articles[0]} />
      </section>

      {/* Grid for the rest */}
      <section className="mt-24">
        <div className="flex items-center justify-between mb-12 border-b border-zinc-100 pb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-zinc-900 italic">
            Tutti gli Articoli
          </h2>
          <div className="h-[1px] flex-grow mx-8 bg-zinc-100 hidden md:block"></div>
        </div>
        <ArticleGrid articles={articles.slice(1)} />
      </section>
    </div>
  );
}
