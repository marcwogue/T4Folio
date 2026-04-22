import { motion } from 'framer-motion';
import { IoLogoGithub, IoChatbubblesOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import links from '../../constants/links.json';

export default function GameCTA() {
    const { t } = useTranslation();
    return (
        <section className="relative py-32 px-6 lg:px-24 bg-base-100 overflow-hidden transition-colors duration-300">
            {/* Background Text Accent */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center">
                <span className="text-[20vw] font-black text-base-content leading-none select-none font-brand uppercase">
                    T4ZOR
                </span>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-5xl md:text-7xl font-brand font-black text-base-content uppercase tracking-tighter mb-6 relative inline-block">
                        {t('gamePortfolio.cta.title')}
                        <div className="absolute -bottom-2 left-0 w-full h-1 bg-game-neon-blue rounded-full" />
                    </h2>
                    <p className="text-base-content/60 text-lg md:text-xl font-game max-w-2xl mx-auto leading-relaxed mt-10">
                        {t('gamePortfolio.cta.description')}
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                    <motion.a
                        href={links.contact.mailPrimary}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-game-neon-blue rounded-xl text-white font-brand font-black tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(var(--p),0.3)] flex items-center gap-3 group cursor-pointer"
                    >
                        <IoChatbubblesOutline size={20} className="group-hover:animate-bounce" />
                        {t('gamePortfolio.cta.startChat')}
                    </motion.a>

                    <motion.a
                        href={links.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-base-content/5 border border-base-content/10 rounded-xl text-base-content font-brand font-black tracking-widest uppercase text-sm hover:bg-base-content/10 transition-colors flex items-center gap-3 group cursor-pointer"
                    >
                        <IoLogoGithub size={20} className="group-hover:rotate-12 transition-transform" />
                        {t('gamePortfolio.cta.viewGithub')}
                    </motion.a>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-linear-to-t from-base-100/50 to-transparent" />
        </section>
    );
}
