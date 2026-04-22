import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function GameHero() {
    const { t } = useTranslation();

    return (
        <section className="relative min-h-[70vh] flex flex-col justify-center items-start px-6 lg:px-24 bg-base-100 overflow-hidden pt-32 transition-colors duration-300">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 border border-game-neon-blue rounded-full animate-pulse" />
                <div className="absolute top-40 right-40 w-96 h-96 border border-game-neon-green/30 rounded-full" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col mb-12"
                >
                    <span className="text-game-neon-cyan text-xs font-bold tracking-[0.5em] uppercase mb-4 opacity-70">
                        {t('gamePortfolio.hero.status')}
                    </span>
                    <div className="relative inline-block">
                        <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-brand font-black text-base-content leading-none tracking-tighter uppercase">
                            T4ZOR<span className="text-game-neon-blue">_</span>
                        </h1>
                        <div className="absolute -bottom-4 left-0 w-1/3 h-4 bg-game-neon-blue rounded-full shadow-[0_0_20px_rgba(0,102,255,0.5)]" />
                    </div>
                </motion.div>

                <div className="flex flex-col md:flex-row items-end gap-8 md:gap-16">
                    {/* Description Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="w-full max-w-lg"
                    >
                        <p className="text-base-content text-xl md:text-base-content font-game leading-relaxed">
                            {t('gamePortfolio.hero.description')}
                        </p>
                    </motion.div>

                    {/* Level Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-base-200/50 backdrop-blur-xl border border-base-content/10 p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center min-w-[200px]"
                    >
                        <span className="text-game-accent-orange text-[10px] font-black tracking-[0.3em] uppercase mb-1">
                            {t('gamePortfolio.hero.rank')}
                        </span>
                        <div className="text-4xl md:text-5xl font-brand font-bold text-base-content uppercase">
                            {t('gamePortfolio.hero.level').split(' ')[0]} <span className="text-game-accent-orange">{t('gamePortfolio.hero.level').split(' ')[1]}</span>
                        </div>
                        <span className="text-base-content/40 text-[10px] mt-2 font-medium">85% {t('gamePortfolio.hero.xpEarned')}</span>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-base-content/10 to-transparent" />
        </section>
    );
}

