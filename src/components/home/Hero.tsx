import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IoColorPaletteOutline, IoGameControllerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';
import links from '../../constants/links.json';

export default function Hero() {
    const { t } = useTranslation();
    const { startTransition } = useTransition();


    return (
        <section className="relative min-h-[90vh] bg-hero-bg flex flex-col justify-center overflow-hidden">
            {/* Background Text / Patterns */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
                <span className="text-[40vw] font-black text-hero-accent leading-none select-none">T4ZOR</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col pt-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                    {/* Left Side: Massive Title and Role */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 min-w-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col gap-0 w-full"
                        >
                            <h1 className="text-[min(12rem,20vw)] md:text-[clamp(8rem,15vw,18rem)] font-black text-hero-text leading-[0.8] tracking-tighter truncate md:overflow-visible">
                                {t('home.title')}
                            </h1>
                            <div className="flex flex-col mt-8 lg:mt-4">
                                <span className="text-hero-text-muted text-xs font-bold tracking-[0.3em] uppercase mb-2">
                                    FR / ED / V2
                                </span>
                                <span className="text-hero-text font-bold text-lg md:text-xl tracking-wide">
                                    {t('home.role')}
                                </span>
                            </div>
                        </motion.div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-hero-text-muted text-lg md:text-xl max-w-sm mt-8 leading-relaxed font-medium"
                        >
                            {t('home.heroSubtitle')}
                        </motion.p>
                    </div>

                    {/* Right Side: Path Selector */}
                    <div className="flex flex-col items-center lg:items-end gap-6 shrink-0">
                        <span className="text-hero-text-muted text-[10px] font-black tracking-[0.4em] uppercase mb-2">
                            {t('home.choosePath')}
                        </span>
                        <div className="flex gap-4">
                            <Link
                                to="/video"
                                onClick={(e) => {
                                    e.preventDefault();
                                    startTransition('/video', 'wave');
                                }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-32 h-32 rounded-3xl bg-hero-card-bg backdrop-blur-md border border-hero-text/10 flex flex-col items-center justify-center gap-3 text-hero-text hover:bg-hero-accent hover:text-white transition-all group shadow-lg"
                                >
                                    <IoColorPaletteOutline size={32} className="group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black tracking-widest">{t('home.creator')}</span>
                                </motion.button>
                            </Link>

                            <Link
                                to="/gamedev"
                                onClick={(e) => {
                                    e.preventDefault();
                                    startTransition('/gamedev', 'minecraft');
                                }}
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-32 h-32 rounded-3xl bg-hero-card-bg backdrop-blur-md border border-hero-text/10 flex flex-col items-center justify-center gap-3 text-hero-text hover:bg-hero-accent hover:text-white transition-all group shadow-lg"
                                >
                                    <IoGameControllerOutline size={32} className="group-hover:text-white transition-colors" />
                                    <span className="text-[10px] font-black tracking-widest">{t('home.developer')}</span>
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hero Footer Info */}
                <div className="mt-auto pt-24 pb-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-hero-text/10">
                    <div className="text-hero-text-muted text-[10px] font-black tracking-[0.3em] uppercase">
                        {t('home.location')}
                    </div>
                    <a
                        href={links.contact.mailPrimary}
                        className="flex items-center gap-4 group cursor-pointer"
                    >
                        <span className="text-hero-text font-bold tracking-widest text-xs">{t('home.sayHello')}</span>
                        <div className="w-12 h-px bg-hero-accent/30 group-hover:w-20 group-hover:bg-hero-accent transition-all duration-500" />
                    </a>
                </div>
            </div>
        </section>
    );
}
