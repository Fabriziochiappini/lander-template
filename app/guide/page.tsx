import React from 'react';
import JsonLd from '@/components/JsonLd';
import { DOMAIN, BRAND_NAME } from '@/lib/constants';
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

    const guides = [
        {
            title: "Come ottimizzare il tuo sito per i motori di ricerca",
            description: "Scopri le basi della SEO e come applicarle al tuo progetto digitale per scalare le classifiche di Google.",
            steps: ["Ricerca delle parole chiave", "Ottimizzazione on-page", "Link building strategica", "Monitoraggio dei risultati"]
        },
        {
            title: "Guida alla creazione di contenuti di valore",
            description: "Impara a scrivere articoli che non solo piacciono ai motori di ricerca, ma convertono i visitatori in clienti.",
            steps: ["Identificazione del target", "Strutturazione dell'articolo", "Uso corretto degli heading", "Call to action efficaci"]
        },
        {
            title: "Performance Web: Perché la velocità è tutto",
            description: "Analizziamo l'impatto dei Core Web Vitals sul posizionamento e sull'esperienza utente.",
            steps: ["Ottimizzazione immagini", "Caching avanzato", "Riduzione del tempo di risposta server", "Utilizzo di CDN"]
        }
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-7xl mx-auto px-6 py-4">
            <JsonLd data={breadcrumbSchema} />

            <header className="mb-16 mt-8">
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-[1.1] text-zinc-900">
                    Guide & Risorse SEO
                </h1>
                <p className="mt-6 text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                    Le nostre guide pratiche per aiutarti a navigare nel mondo del digital marketing e del posizionamento organico.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {guides.map((guide, idx) => (
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
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Hai bisogno di una strategia personalizzata?</h2>
                    <p className="text-zinc-400 text-lg mb-8">
                        Il nostro team di esperti è pronto ad analizzare il tuo progetto e fornirti una roadmap chiara per il successo online.
                    </p>
                    <button className="bg-white text-zinc-900 px-8 py-4 rounded-full font-bold hover:bg-brand-500 hover:text-white transition-all">
                        Contattaci Ora
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-brand-600/20 to-transparent pointer-events-none"></div>
            </section>
        </div>
    );
}
