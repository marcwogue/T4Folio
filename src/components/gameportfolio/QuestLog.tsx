import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { IoLogoPython } from 'react-icons/io5';
import { SiUnrealengine, SiCplusplus } from 'react-icons/si';
import { useTranslation } from 'react-i18next';

// Import Swiper styles
import 'swiper/css';

// Slide Card Component to handle progress-based animations
const QuestCard = ({ quest }: { quest: any }) => {
    const swiper = useSwiper();
    const [progress, setProgress] = useState(0);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!swiper || !cardRef.current) return;

        // Swiper adds a 'progress' property to the slide DOM element when watchSlidesProgress is enabled
        const slideEl = cardRef.current.closest('.swiper-slide');
        if (!slideEl) return;

        const updateProgress = () => {
            const currentProgress = (slideEl as any).progress;
            if (typeof currentProgress === 'number') {
                setProgress(currentProgress);
            }
        };

        // Listen for progress and translate events to update the local progress state
        swiper.on('progress', updateProgress);
        swiper.on('setTranslate', updateProgress);

        // Initial update
        updateProgress();

        return () => {
            swiper.off('progress', updateProgress);
            swiper.off('setTranslate', updateProgress);
        };
    }, [swiper]);

    const absProgress = Math.abs(progress);
    // In Swiper, progress is 0 when the slide is at its "active" position.
    // We want the one closest to the active position to be scaled up (1.4x).
    const scale = Math.max(1, 1.4 - absProgress * 1.5);
    const isFocused = absProgress < 0.1;

    return (
        <motion.div
            ref={cardRef}
            animate={{
                scale: scale,
                opacity: Math.max(0.4, 1 - absProgress * 1.2)
            }}
            className={`relative w-[320px] md:w-[420px] h-[320px] bg-base-200/50 backdrop-blur-3xl p-8 flex flex-col justify-between transition-all duration-300 ${isFocused ? 'border-4 border-primary shadow-[0_0_40px_rgba(var(--p),0.4)] z-50' : 'border border-base-content/10'
                }`}
        >
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-base-content/5" style={{ color: quest.color }}>
                        {quest.icon}
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-base-content/30 uppercase">
                        {quest.status} // {quest.id}
                    </span>
                </div>

                <h3 className="text-2xl font-brand font-bold text-base-content mb-4 uppercase tracking-tighter">
                    {quest.title}
                </h3>
                <p className="text-base-content/60 text-sm leading-relaxed mb-6 font-game line-clamp-3">
                    {quest.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 relative z-10">
                {quest.tags.map((tag: any) => (
                    <span key={tag} className="px-2 py-1 bg-base-content/5 border border-base-content/10 text-[9px] font-bold text-base-content/40 uppercase">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Background Glow */}
            <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${quest.color}, transparent 80%)` }}
            />
        </motion.div>
    );
};

export default function QuestLog() {
    const { t } = useTranslation();

    const quests = [
        {
            id: "quest_01",
            title: t('gamePortfolio.quests.items.quest01.title'),
            description: t('gamePortfolio.quests.items.quest01.desc'),
            icon: <IoLogoPython size={24} />,
            tags: ["UNITY", "WEB3", "C#"],
            status: t('gamePortfolio.quests.status.completed'),
            color: "game-neon-green"
        },
        {
            id: "quest_02",
            title: t('gamePortfolio.quests.items.quest02.title'),
            description: t('gamePortfolio.quests.items.quest02.desc'),
            icon: <SiUnrealengine size={24} />,
            tags: ["UNREAL", "VR", "C++"],
            status: t('gamePortfolio.quests.status.completed'),
            color: "game-neon-blue"
        },
        {
            id: "quest_03",
            title: t('gamePortfolio.quests.items.quest03.title'),
            description: t('gamePortfolio.quests.items.quest03.desc'),
            icon: <SiCplusplus size={24} />,
            tags: ["MOBILE", "SHADERS", "C#"],
            status: t('gamePortfolio.quests.status.inProgress'),
            color: "game-accent-orange"
        },
        {
            id: "quest_04",
            title: t('gamePortfolio.quests.items.quest04.title'),
            description: t('gamePortfolio.quests.items.quest04.desc'),
            icon: <IoLogoPython size={24} />,
            tags: ["PHYSICS", "MULTIPLAYER"],
            status: t('gamePortfolio.quests.status.archived'),
            color: "game-neon-cyan"
        },
        {
            id: "quest_05",
            title: t('gamePortfolio.quests.items.quest05.title'),
            description: t('gamePortfolio.quests.items.quest05.desc'),
            icon: <SiUnrealengine size={24} />,
            tags: ["HORROR", "AUDIO"],
            status: t('gamePortfolio.quests.status.completed'),
            color: "#a855f7"
        }
    ];

    return (
        <section className="relative py-24 bg-base-100 overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="px-6 lg:px-24 mb-16 relative z-20">
                <div className="flex items-center gap-4">
                    <h2 className="text-3xl font-brand font-black text-base-content uppercase tracking-widest leading-none">
                        {t('gamePortfolio.quests.title').split('_')[0]}<span className="text-game-neon-blue">_</span>{t('gamePortfolio.quests.title').split('_')[1]}
                    </h2>
                    <div className="h-px flex-1 bg-base-content/10" />
                </div>
                <p className="text-base-content/40 text-[10px] font-black tracking-[0.4em] uppercase mt-4">
                    {t('gamePortfolio.quests.subtitle')}
                </p>
            </div>

            <div className="swiper-container-wrapper relative py-20 px-6 lg:px-24">
                <Swiper
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    spaceBetween={40}
                    loop={true}
                    speed={2000}
                    watchSlidesProgress={true}
                    autoplay={{
                        delay: 125,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    modules={[Autoplay]}
                    className="mission-swiper overflow-visible!"
                >
                    {quests.map((quest) => (
                        <SwiperSlide key={quest.id} className="w-auto! py-12">
                            <QuestCard quest={quest} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>



            {/* Footer Text */}
            <div className="mt-12 text-center pointer-events-none">
                <motion.span
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-base-content/20 text-[10px] font-black tracking-[0.6em] uppercase"
                >
                    {t('gamePortfolio.quests.autoplay')}
                </motion.span>
            </div>
        </section>
    );
}
