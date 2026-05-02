import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import medias from '../../data/medias.json';

/* ──────────────────────────────────────────────
   Video list from medias.json
   ────────────────────────────────────────────── */
const VIDEOS = medias.videoPortfolio.retroTV.videos;

function getAspectRatio(src: string): number {
    return src.includes('shorts') ? 9 / 16 : 16 / 9;
}

/* ──────────────────────────────────────────────
   Horizontal video strip (wheel-like)
   ────────────────────────────────────────────── */
function VideoStrip({
    videos,
    activeIndex,
    onSelect,
}: {
    videos: typeof VIDEOS;
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    const stripRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!stripRef.current) return;
        const activeEl = stripRef.current.children[activeIndex] as HTMLElement;
        if (activeEl) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, [activeIndex]);

    return (
        <div className="w-full max-w-5xl mx-auto relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-linear-to-r from-base-100 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-linear-to-l from-base-100 to-transparent z-10 pointer-events-none" />

            <div
                ref={stripRef}
                className="flex gap-4 overflow-x-auto py-4 px-8 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
                {videos.map((video, i) => {
                    const isActive = i === activeIndex;
                    return (
                        <button
                            key={video.src}
                            onClick={() => onSelect(i)}
                            className={`
                                relative shrink-0 snap-center rounded-2xl overflow-hidden
                                transition-all duration-400 ease-out cursor-pointer group
                                ${isActive
                                    ? 'w-44 h-28 ring-2 ring-purple-500 ring-offset-2 ring-offset-base-100 scale-105 shadow-lg shadow-purple-500/30'
                                    : 'w-36 h-24 opacity-50 hover:opacity-80 hover:scale-102'
                                }
                            `}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                                alt={video.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-linear-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300">
                                {isActive && (
                                    <div className="w-8 h-8 rounded-full bg-purple-500/80 backdrop-blur-sm flex items-center justify-center">
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                                            <polygon points="0,0 12,7 0,14" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="absolute bottom-1.5 left-2 right-2">
                                <span className={`text-[9px] font-bold tracking-wider uppercase text-white ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                                    {video.name}
                                </span>
                            </div>
                            {isActive && (
                                <div className="absolute -inset-[2px] rounded-2xl border-2 border-purple-400 animate-pulse pointer-events-none" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Main exported component (2D Version)
   ────────────────────────────────────────────── */
export default function RetroTV() {
    const { t } = useTranslation();
    const [activeVideoIndex, setActiveVideoIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const activeVideo = VIDEOS[activeVideoIndex];
    const aspectRatio = getAspectRatio(activeVideo.src);
    const isPortrait = aspectRatio < 1;

    const handleSelectVideo = useCallback((index: number) => {
        setActiveVideoIndex(index);
        setIsPlaying(false);
    }, []);

    return (
        <div className="relative h-[90vh] flex flex-col items-center justify-center py-4 px-4 overflow-hidden">
            {/* Titre et Badge */}
            <div className="shrink-0 mb-4 text-center">
                <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-widest uppercase mb-1">
                    {t('videoPortfolio.retroTV.badge')}
                </span>
                <p className="text-[10px] text-base-content/50 font-bold tracking-[0.2em] uppercase">
                    {isPortrait ? `📱 ${t('videoPortfolio.retroTV.mobile')}` : `📺 ${t('videoPortfolio.retroTV.crt')}`} - {activeVideo.name}
                </p>
            </div>

            {/* Conteneur principal du lecteur vidéo (Hauteur flexible sans dépasser) */}
            <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center min-h-0">
                <div 
                    className="relative bg-black rounded-xl overflow-hidden shadow-2xl shadow-purple-500/10 border border-base-content/10 group transition-all duration-500 mx-auto"
                    style={{
                        aspectRatio: isPortrait ? '9/16' : '16/9',
                        height: isPortrait ? '100%' : 'auto',
                        width: isPortrait ? 'auto' : '100%',
                        maxHeight: '100%',
                        maxWidth: '100%'
                    }}
                >
                    {/* Overlay personnalisé avec miniature et gros bouton Play */}
                    {!isPlaying && (
                        <div 
                            className="absolute inset-0 z-20 cursor-pointer flex items-center justify-center bg-black group-hover:opacity-90 transition-opacity"
                            onClick={() => setIsPlaying(true)}
                        >
                            <img 
                                src={`https://img.youtube.com/vi/${activeVideo.youtubeId}/maxresdefault.jpg`}
                                onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${activeVideo.youtubeId}/hqdefault.jpg`; }}
                                className="absolute inset-0 w-full h-full object-cover opacity-80" 
                                alt={activeVideo.name}
                            />
                            <div className="relative z-30 w-16 h-16 bg-purple-600/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.6)] group-hover:scale-110 transition-transform">
                                <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z"/>
                                </svg>
                            </div>
                        </div>
                    )}

                    {/* Iframe YouTube sans interface (controls=0) */}
                    {isPlaying && (
                        <iframe
                            key={activeVideo.youtubeId}
                            className="absolute inset-0 w-full h-full"
                            src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    )}
                </div>
            </div>

            {/* Ruban de la playlist (Hauteur fixe en bas) */}
            <div className="shrink-0 w-full mt-2">
                <VideoStrip
                    videos={VIDEOS}
                    activeIndex={activeVideoIndex}
                    onSelect={handleSelectVideo}
                />
            </div>
        </div>
    );
}
