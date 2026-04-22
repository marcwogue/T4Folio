import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ExperienceLog() {
    const { t } = useTranslation();

    const experiences = [
        {
            period: t('gamePortfolio.experience.items.azesarl.period'),
            company: t('gamePortfolio.experience.items.azesarl.company'),
            role: t('gamePortfolio.experience.items.azesarl.role'),
            desc: t('gamePortfolio.experience.items.azesarl.desc'),
            achievements: t('gamePortfolio.experience.items.azesarl.achievements', { returnObjects: true }) as string[]
        },
        {
            period: t('gamePortfolio.experience.items.eventonk.period'),
            company: t('gamePortfolio.experience.items.eventonk.company'),
            role: t('gamePortfolio.experience.items.eventonk.role'),
            desc: t('gamePortfolio.experience.items.eventonk.desc'),
            achievements: t('gamePortfolio.experience.items.eventonk.achievements', { returnObjects: true }) as string[]
        },
        {
            period: t('gamePortfolio.experience.items.lmvox.period'),
            company: t('gamePortfolio.experience.items.lmvox.company'),
            role: t('gamePortfolio.experience.items.lmvox.role'),
            desc: t('gamePortfolio.experience.items.lmvox.desc'),
            achievements: t('gamePortfolio.experience.items.lmvox.achievements', { returnObjects: true }) as string[]
        }
    ];

    return (
        <section className="relative py-24 px-6 lg:px-24 bg-base-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-brand font-black text-base-content uppercase tracking-widest">
                        {t('gamePortfolio.experience.title').split('_')[0]}<span className="text-game-neon-blue">_</span>{t('gamePortfolio.experience.history')}
                    </h2>
                    <div className="h-px flex-1 bg-base-content/10" />
                </div>

                <div className="space-y-6">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-base-200/50 backdrop-blur-xl border border-base-content/5 p-8 rounded-2xl relative group hover:border-game-neon-blue/30 transition-all"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                                <div>
                                    <span className="text-game-neon-blue text-[10px] font-black tracking-[0.3em] uppercase">
                                        {exp.period}
                                    </span>
                                    <h3 className="text-2xl font-brand font-bold text-base-content mt-1">
                                        {exp.role}
                                    </h3>
                                    <span className="text-base-content/40 text-xs font-bold tracking-widest uppercase">
                                        @ {exp.company}
                                    </span>
                                </div>
                                <div className="hidden md:block h-10 w-px bg-base-content/10" />
                                <div className="max-w-md">
                                    <p className="text-base-content/60 text-sm font-game leading-relaxed">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                                {exp.achievements.map((item, i) => (
                                    <span key={i} className="whitespace-nowrap px-4 py-2 bg-base-content/5 rounded-full text-[10px] font-bold text-base-content/40 border border-base-content/5 group-hover:border-base-content/10 transition-colors uppercase tracking-widest">
                                        + {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

