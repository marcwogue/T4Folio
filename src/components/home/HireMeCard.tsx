import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaRocket } from 'react-icons/fa';

export default function HireMeCard() {
    const { t } = useTranslation();

    return (
        <section className="py-0 h-full col-span-3">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative bg-hero-bg rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 h-full overflow-hidden shadow-2xl flex flex-col justify-center items-center text-center gap-6 md:gap-8"
            >
                <div className="relative z-10 flex flex-col items-center text-center gap-6 md:gap-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-hero-accent/20 flex items-center justify-center text-hero-accent">
                        <FaRocket size={28} className="md:w-[32px] md:h-[32px]" />
                    </div>

                    <div className="flex flex-col gap-3 md:gap-4">
                        <h2 className="text-2xl md:text-4xl font-black text-hero-text tracking-tight uppercase">
                            {t('home.cta.title')}
                        </h2>
                        <p className="text-hero-text-muted text-base md:text-xl font-medium">
                            {t('home.cta.subtitle')}
                        </p>
                    </div>

                    <button className="px-12 py-5 rounded-full bg-hero-accent text-base-200 font-black text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl">
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
