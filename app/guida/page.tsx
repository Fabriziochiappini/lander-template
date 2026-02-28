import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import YouTubeVideo from '@/components/YouTubeVideo';
import {
    GUIDE_HERO_TITLE,
    GUIDE_HERO_SUBTITLE,
    GUIDES,
    GUIDE_CTA_TITLE,
    GUIDE_CTA_SUBTITLE,
    GUIDE_CTA_TEXT,
    YOUTUBE_VIDEO_ID,
    BRAND_NAME
} from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Guida e Risorse | ${BRAND_NAME}`,
    description: GUIDE_HERO_SUBTITLE,
};

export default function GuidePage() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto px-6 py-12">
            <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Guida' }]} />

            <header className="mb-20 mt-12 text-center">
                <h1 className="text-4xl md:text-7xl font-serif font-bold leading-[1.1] text-zinc-900 max-w-4xl mx-auto">
                    {GUIDE_HERO_TITLE}
                </h1>
                <p className="mt-8 text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {GUIDE_HERO_SUBTITLE}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                {GUIDES.map((guide: any, idx: number) => (
                    <div key={idx} className="bg-white p-10 rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                        <div className="w-14 h-14 bg-zinc-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl mb-8 group-hover:bg-brand-600 transition-colors">
                            {idx + 1}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-zinc-900 mb-6">{guide.title}</h3>
                        <p className="text-zinc-500 mb-8 leading-relaxed">{guide.description}</p>
                        <ul className="space-y-4">
                            {guide.steps.map((step: string, sIdx: number) => (
                                <li key={sIdx} className="flex items-start gap-4 text-sm text-zinc-600">
                                    <span className="text-brand-500 mt-1 font-bold">✓</span>
                                    {step}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Video Section - Solo se ID presente */}
            {YOUTUBE_VIDEO_ID && (
                <div className="max-w-4xl mx-auto">
                    <YouTubeVideo videoId={YOUTUBE_VIDEO_ID} />
                </div>
            )}

            {/* Final CTA */}
            <section className="bg-zinc-900 rounded-[3rem] p-12 md:p-20 text-center text-white mt-12 overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-brand-500/10 to-transparent pointer-events-none"></div>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 relative z-10">{GUIDE_CTA_TITLE}</h2>
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10 leading-relaxed">
                    {GUIDE_CTA_SUBTITLE}
                </p>
                <button className="bg-white text-zinc-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-500 hover:text-white transition-all shadow-lg hover:shadow-brand-500/20 relative z-10">
                    {GUIDE_CTA_TEXT}
                </button>
            </section>
        </div>
    );
}
