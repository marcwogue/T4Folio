import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';

export default function MobileHelper() {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasSeenHelper = localStorage.getItem('hasSeenMobileHelper');
        // Only show on mobile
        const isMobile = window.innerWidth < 768;

        if (!hasSeenHelper && isMobile) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('hasSeenMobileHelper', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="fixed left-6 top-16 z-100 md:hidden"
                >
                    <div className="relative bg-primary text-white p-4 rounded-2xl shadow-2xl flex flex-col gap-3 max-w-[200px]">
                        {/* Pointer Arrow */}
                        <div className="absolute left-1/2 -top-2 -translate-x-1/2 w-4 h-4 bg-primary rotate-45" />

                        <div className="flex items-center gap-3">
                            <motion.div
                                animate={{ x: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                <HiArrowRight size={20} />
                            </motion.div>
                            <span className="text-xs font-bold leading-tight">
                                {t('mobile.helper.swipeText') || "Swipe at the top to open the menu"}
                            </span>
                        </div>

                        <button
                            onClick={handleDismiss}
                            className="bg-white/20 hover:bg-white/30 transition-colors py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest"
                        >
                            {t('mobile.helper.gotIt') || "Got it"}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
