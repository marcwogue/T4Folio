import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaHandScissors, FaChartLine } from 'react-icons/fa';

export default function CoreDisciplines() {
    const { t } = useTranslation();

    return (
        <section id="services" className="mb-32">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-base-content">{t('videoPortfolio.disciplines.title') || "Core Disciplines"}</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
                <div className="space-y-6">
                    {[
                        { key: 'postProd', icon: <FaHandScissors /> },
                        { key: 'highFreq', icon: <FaChartLine /> }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-base-200 border border-base-300 hover:border-purple-500/30 transition-all group"
                        >
                            <div className="flex gap-6 items-start">
                                <div className="w-14 h-14 rounded-2xl bg-primary/20 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-content">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2 text-base-content">{t(`videoPortfolio.disciplines.items.${item.key}.title`) || item.key}</h3>
                                    <p className="text-base-content/60 leading-relaxed text-sm">{t(`videoPortfolio.disciplines.items.${item.key}.desc`) || "..."}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
