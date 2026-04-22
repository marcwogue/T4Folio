import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaHome, FaPlay, FaTv, FaLayerGroup, FaHandScissors, FaEnvelope } from 'react-icons/fa';

interface FloatingNavProps {
    activeSection: string;
    scrollToSection: (id: string) => void;
}

export default function FloatingNav({ activeSection, scrollToSection }: FloatingNavProps) {
    const { t } = useTranslation();

    const tabs = [
        { id: 'studio', icon: <FaHome size={14} />, label: 'videoPortfolio.footer.tabs.studio' },
        { id: 'showreel', icon: <FaPlay size={12} />, label: 'videoPortfolio.footer.tabs.showreel' },
        { id: 'retrotv', icon: <FaTv size={14} />, label: 'videoPortfolio.footer.tabs.retrotv' },
        { id: 'work', icon: <FaLayerGroup size={14} />, label: 'videoPortfolio.footer.tabs.work' },
        { id: 'services', icon: <FaHandScissors size={14} />, label: 'videoPortfolio.footer.tabs.services' },
        { id: 'contact', icon: <FaEnvelope size={14} />, label: 'videoPortfolio.footer.tabs.contact' }
    ];

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-flex items-center gap-2 px-3 py-3 rounded-full bg-base-300/40 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                {tabs.map((tab) => {
                    const isActive = activeSection === tab.id;
                    return (
                        <motion.button
                            key={tab.id}
                            onClick={() => scrollToSection(tab.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`relative flex items-center justify-center gap-2 h-10 px-4 rounded-full transition-all duration-500 overflow-hidden ${isActive
                                ? 'bg-primary text-primary-content shadow-lg shadow-primary/20'
                                : 'text-base-content/60 hover:text-base-content hover:bg-white/5'
                                }`}
                        >
                            <span className="relative z-10 shrink-0">{tab.icon}</span>

                            <motion.span
                                initial={false}
                                animate={{
                                    width: isActive ? 'auto' : 0,
                                    opacity: isActive ? 1 : 0,
                                    marginLeft: isActive ? 4 : 0
                                }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                                className="text-[10px] font-black tracking-widest uppercase overflow-hidden whitespace-nowrap relative z-10"
                            >
                                {t(tab.label)}
                            </motion.span>

                            {isActive && (
                                <motion.div
                                    layoutId="nav-bg"
                                    className="absolute inset-0 bg-primary z-0"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.button>
                    );
                })}
            </motion.div>
        </div>
    );
}
