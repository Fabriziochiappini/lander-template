import React from 'react';

interface YouTubeVideoProps {
    videoId: string;
    title?: string;
}

const YouTubeVideo: React.FC<YouTubeVideoProps> = ({ videoId, title = "Video di Approfondimento" }) => {
    if (!videoId) return null;

    return (
        <section className="my-24 overflow-hidden rounded-[2.5rem] bg-zinc-900 shadow-2xl">
            <div className="relative aspect-video w-full">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                ></iframe>
            </div>
            <div className="p-8 md:p-12 text-center bg-zinc-900 border-t border-zinc-800">
                <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-2">Approfondimento Video</h3>
                <p className="text-zinc-400 max-w-2xl mx-auto italic">
                    Abbiamo selezionato questo contenuto per aiutarti a comprendere meglio le sfide e le soluzioni nel nostro settore.
                </p>
            </div>
        </section>
    );
};

export default YouTubeVideo;
