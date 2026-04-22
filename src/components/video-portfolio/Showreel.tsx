import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaPlay } from 'react-icons/fa';

export default function Showreel() {
    const { t } = useTranslation();

    return (
        <section id="showreel" className="mb-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-base-200 border border-base-300 group cursor-pointer shadow-2xl"
            >
                <div className="absolute inset-0 bg-linear-to-t from-base-300/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-content shadow-[0_0_40px_rgba(var(--p),0.5)] group-hover:scale-110 transition-transform">
                        <FaPlay size={24} className="ml-1" />
                    </div>
                </div>

                <div className="absolute bottom-10 left-10">
                    <h2 className="text-3xl font-bold mb-2 text-base-content">{t('videoPortfolio.presentation.title') || "Showreel 2024"}</h2>
                    <p className="text-base-content/60">{t('videoPortfolio.presentation.subtitle') || "A glimpse into our creative process"}</p>
                </div>
            </motion.div>
        </section>
    );
}
