import React from 'react';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import Breadcrumbs from '@/components/Breadcrumbs';
import { getLiveArticles, DOMAIN } from '@/lib/constants';

interface ArticlePageProps {
    params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params;
    const articles = await getLiveArticles();
    const article = articles.find((a) => a.slug === slug);

    if (!article) {
        notFound();
    }

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.description,
        "image": [article.image],
        "datePublished": article.date,
        "author": [{
            "@type": "Person",
            "name": article.author,
            "jobTitle": article.authorRole
        }]
    };

    return (
        <article className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <JsonLd data={articleSchema} />

            <Breadcrumbs items={[{ label: 'Magazine', path: '/#articoli' }, { label: article.title }]} />

            <header className="mt-10 mb-16">
                <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.map(tag => (
                        <span key={tag} className="bg-brand-50 text-brand-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-4xl md:text-6xl font-serif font-bold text-zinc-900 leading-[1.15] mb-8">
                    {article.title}
                </h1>

                <div className="flex items-center gap-6 p-6 bg-zinc-50 rounded-2xl">
                    <div className="w-14 h-14 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-zinc-500 border-2 border-white shadow-sm">
                        {article.author.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-zinc-900">{article.author}</p>
                        <p className="text-sm text-zinc-500">{article.authorRole} • {article.date}</p>
                    </div>
                </div>
            </header>

            <div className="relative rounded-[2rem] overflow-hidden mb-16 shadow-2xl bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.image} alt={article.alt} className="w-full aspect-[16/9] object-cover" />
            </div>

            <div className="prose prose-zinc prose-lg max-w-none">
                <p className="text-2xl font-medium text-zinc-600 leading-relaxed italic border-l-4 border-brand-500 pl-8 mb-12">
                    {article.excerpt}
                </p>

                {/* Iniezione Automatica Link Interno (SEO Dinamico) */}
                {articles.length > 1 && (
                    <div className="my-12 p-8 bg-zinc-50 rounded-3xl border border-zinc-100 group hover:border-brand-200 transition-colors">
                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-2 block">Leggi anche</span>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold !mt-0 !mb-0">
                            <a
                                href={`${DOMAIN}/article/${articles.filter(a => a.slug !== slug)[Math.floor(Math.random() * (articles.length - 1))].slug}`}
                                className="text-zinc-900 hover:text-brand-600 no-underline transition-colors"
                            >
                                {articles.filter(a => a.slug !== slug)[Math.floor(Math.random() * (articles.length - 1))].title}
                            </a>
                        </h2>
                    </div>
                )}

                <div
                    className="text-zinc-800 space-y-8 leading-loose text-lg article-content"
                    dangerouslySetInnerHTML={{ __html: article.content.replace(/\[DOMAIN_LINK_ID\]/g, DOMAIN) }}
                />
            </div>

            <footer className="mt-24 pt-10 border-t border-zinc-100">
                {/* Articoli Correlati (SEO Mesh) */}
                {articles.length > 1 && (
                    <div className="mb-16">
                        <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-8 flex items-center gap-3">
                            <span className="w-8 h-px bg-brand-500"></span>
                            Articoli Correlati
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles
                                .filter(a => a.slug !== slug)
                                .sort(() => 0.5 - Math.random()) // Mischia l'ordine
                                .slice(0, 3) // Prendine al massimo 3
                                .map((rel) => (
                                    <a
                                        key={rel.slug}
                                        href={`${DOMAIN}/article/${rel.slug}`}
                                        className="group block p-5 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-brand-200 hover:bg-white transition-all hover:shadow-xl hover:shadow-zinc-200/50"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-3">{rel.category || 'Approfondimento'}</p>
                                        <h4 className="text-lg font-bold text-zinc-900 leading-snug group-hover:text-brand-600 transition-colors">
                                            {rel.title}
                                        </h4>
                                    </a>
                                ))}
                        </div>
                    </div>
                )}

                <p className="text-zinc-500 italic mb-8">
                    Ogni progetto è un&apos;opportunità per ridefinire gli standard.
                    Con Next.js, non stiamo solo costruendo un sito, stiamo costruendo un vantaggio competitivo reale e misurabile.
                </p>
            </footer>
        </article>
    );
}
