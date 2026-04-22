import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRocket } from 'react-icons/fa';

export default function HireMeCard() {
    const { t } = useTranslation();

    return (
        <section className="py-0 h-full col-span-3">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative bg-hero-bg rounded-[3rem] p-10 md:p-12 h-full overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center gap-8"
            >
                <div className="relative z-10 flex flex-col items-center text-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-hero-accent/20 flex items-center justify-center text-hero-accent">
                        <FaRocket size={32} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-3xl md:text-4xl font-black text-hero-text tracking-tight uppercase">
                            {t('home.cta.title')}
                        </h2>
                        <p className="text-hero-text-muted text-xl font-medium">
                            {t('home.cta.subtitle')}
                        </p>
                    </div>

                    <button className="px-12 py-5 rounded-full bg-hero-accent text-base-content font-black text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl">
                        {t('home.cta.button')}
                    </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            </motion.div>
        </section>
    );
}
