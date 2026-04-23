import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import medias from '../../data/medias.json';

// Swiper styles (already imported in VideoPortfolio, but let's keep them here too if needed, though they are global usually)
// In this project they seem to be imported in the page. I'll let the page handle global style imports if possible, or include them here.
// But to be self-contained:
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

export default function VideoGallery() {
    const { t } = useTranslation();
    const swiperRef = useRef<SwiperType | null>(null);

    const galleryItems = medias.videoPortfolio.gallery;

    return (
        <section id="work" className="mb-32 overflow-hidden">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                <div className="max-w-2xl">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{t('videoPortfolio.gallery.title') || "Video Editing Gallery"}</h2>
                    <p className="text-base-content/50">{t('videoPortfolio.gallery.subtitle') || "Curated collection of high-impact edits."}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        className="w-12 h-12 rounded-full border border-base-300 flex items-center justify-center text-base-content/60 hover:text-base-content hover:border-base-content transition-all cursor-pointer bg-transparent active:scale-95"
                    >
                        <FaArrowRight className="rotate-180" />
                    </button>
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-content shadow-lg shadow-primary/20 cursor-pointer active:scale-95 transition-all"
                    >
                        <FaArrowRight />
                    </button>
                </div>
            </div>

            <div className="px-4 md:px-0">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards, Navigation]}
                    className="w-[280px] h-[380px] md:w-[350px] md:h-[480px]"
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {galleryItems.map((item, i) => (
                        <SwiperSlide key={i} className="rounded-[2.5rem] overflow-hidden bg-base-200 border border-base-300 shadow-2xl">
                            <div className="relative w-full h-full group">
                                <img src={item.thumb} alt={t(`videoPortfolio.gallery.items.${item.key}`)} className="w-full h-full object-cover transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                                <div className="absolute inset-0 bg-linear-to-t from-base-100/90 via-base-100/20 to-transparent" />

                                <div className="absolute top-6 left-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-base-200/30 backdrop-blur-md border border-base-300 uppercase`}>
                                        {t(`videoPortfolio.gallery.categories.${item.category}`) || item.category.toUpperCase()}
                                    </span>
                                </div>

                                <div className="absolute bottom-8 left-8 right-8">
                                    <h3 className="text-2xl font-bold leading-tight">{t(`videoPortfolio.gallery.items.${item.key}`) || item.key.toUpperCase()}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
