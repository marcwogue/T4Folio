import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

export default function VideoHero() {
    const { t } = useTranslation();

    return (
        <section id="studio" className="mb-16 md:mb-32">
            <div className="flex flex-col lg:flex-row gap-12 items-start justify-between">
                <div className="max-w-3xl">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-8"
                    >
                        {t('videoPortfolio.hero.badge') || "Creative Direction"}
                    </motion.span>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8"
                    >
                        {t('videoPortfolio.hero.title')}<br />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{t('videoPortfolio.hero.titleHighlight')}</span><br />
                        {t('videoPortfolio.hero.titleEnd')}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-base-content/60 max-w-xl leading-relaxed mb-10"
                    >
                        {t('videoPortfolio.hero.subtitle')}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap gap-4 items-center"
                    >
                        <button className="px-8 py-4 rounded-2xl bg-primary hover:bg-primary-focus text-white font-bold transition-all shadow-lg shadow-purple-500/20 active:scale-95">
                            {t('videoPortfolio.hero.ctaPrimary') || "GET IN TOUCH"}
                        </button>
                        <button className="px-8 py-4 rounded-2xl bg-base-200/10 border border-base-300 hover:bg-base-200 text-base-content font-bold transition-all active:scale-95">
                            {t('videoPortfolio.hero.ctaSecondary') || "LEARN MORE"}
                        </button>
                    </motion.div>
                </div>

                {/* Side Widgets */}
                <div className="hidden lg:flex flex-col gap-6 w-full max-w-[300px]">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="p-6 rounded-3xl bg-base-200/10 border border-base-300 backdrop-blur-xl"
                    >
                        <span className="text-[10px] font-black text-base-content/60 tracking-widest uppercase mb-4 block">{t('videoPortfolio.hero.activeProjects')}</span>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">{t('videoPortfolio.hero.project1.name') || "Stride Agency"}</span>
                                    <span className="text-[10px] text-green-400 font-bold uppercase tracking-wider">{t('videoPortfolio.hero.project1.status') || "Active Strategy"}</span>
                                </div>
                                <FaArrowRight className="text-base-content/20" />
                            </div>
                            <div className="h-px bg-base-200/10" />
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold">{t('videoPortfolio.hero.project2.name') || "Startup Vision"}</span>
                                    <span className="text-[10px] text-base-content/60 font-bold uppercase tracking-wider">{t('videoPortfolio.hero.project2.status') || "Production Case"}</span>
                                </div>
                                <FaArrowRight className="text-base-content/60" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
