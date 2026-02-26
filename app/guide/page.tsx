import React from 'react';
import JsonLd from '@/components/JsonLd';
import { DOMAIN, BRAND_NAME, GUIDE_HERO_TITLE, GUIDE_HERO_SUBTITLE, GUIDE_CTA_TITLE, GUIDE_CTA_SUBTITLE, GUIDE_CTA_TEXT, GUIDES } from '@/lib/constants';
import { CheckCircle2, ChevronRight } from 'lucide-react';

export const revalidate = 3600; // Cache for an hour for static-like content

export default function GuidePage() {
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
                "name": "Guide",
                "item": `${DOMAIN}/guide`
            }
        ]
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto px-6 py-4">
            <JsonLd data={breadcrumbSchema} />

            <header className="mb-16 mt-8">
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] text-zinc-900">
                    {GUIDE_HERO_TITLE}
                </h1>
                <p className="mt-6 text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                    {GUIDE_HERO_SUBTITLE}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {GUIDES.map((guide: any, idx: number) => (
                    <div key={idx} className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 hover:shadow-xl hover:shadow-zinc-100 transition-all group">
                        <h2 className="text-2xl font-serif font-bold text-zinc-900 mb-4 group-hover:text-brand-600 transition-colors">
                            {guide.title}
                        </h2>
                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            {guide.description}
                        </p>

                        <ul className="space-y-4 mb-8">
                            {guide.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex items-center gap-3 text-zinc-700">
                                    <CheckCircle2 className="w-5 h-5 text-brand-500 shrink-0" />
                                    <span>{step}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="flex items-center gap-2 font-semibold text-zinc-900 group-hover:gap-4 transition-all">
                            Leggi la guida completa <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <section className="mt-24 bg-zinc-900 text-white p-12 rounded-[2rem] overflow-hidden relative">
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">{GUIDE_CTA_TITLE}</h2>
                    <p className="text-zinc-400 text-lg mb-8">
                        {GUIDE_CTA_SUBTITLE}
                    </p>
                    <button className="bg-white text-zinc-900 px-8 py-4 rounded-full font-bold hover:bg-brand-500 hover:text-white transition-all">
                        {GUIDE_CTA_TEXT}
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-600/20 to-transparent pointer-events-none"></div>
            </section>
        </div>
    );
}
