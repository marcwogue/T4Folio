import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IoClose, IoDownloadOutline } from 'react-icons/io5';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    const { t } = useTranslation();

    const handleDownload = (lang: 'fr' | 'en') => {
        const fileUrl = lang === 'fr' ? '/resume_fr.pdf' : '/resume_en.pdf';
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = lang === 'fr' ? 'Resume_Alex_Rivier_FR.pdf' : 'Resume_Alex_Rivier_EN.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-110"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-base-100 border border-base-300 rounded-[2.5rem] p-8 z-120 shadow-2xl overflow-hidden"
                    >
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full -ml-16 -mb-16 blur-3xl" />

                        <div className="relative flex flex-col items-center">
                            {/* Header */}
                            <button
                                onClick={onClose}
                                className="absolute -top-2 -right-2 p-2 rounded-full bg-base-200 hover:bg-base-300 transition-colors text-base-content/60 hover:text-base-content"
                            >
                                <IoClose size={20} />
                            </button>

                            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                                <IoDownloadOutline size={32} />
                            </div>

                            <h2 className="text-2xl font-bold text-base-content mb-2 text-center">
                                {t('resumeModal.title')}
                            </h2>
                            <p className="text-base-content/60 text-sm mb-8 text-center max-w-[280px]">
                                {t('sidebar.downloadResume')}
                            </p>

                            {/* Buttons */}
                            <div className="w-full flex flex-col gap-4">
                                <button
                                    onClick={() => handleDownload('fr')}
                                    className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-xl bg-base-100 flex items-center justify-center text-lg group-hover:bg-white/20">🇫🇷</span>
                                        <span>{t('resumeModal.fr')}</span>
                                    </div>
                                    <IoDownloadOutline size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>

                                <button
                                    onClick={() => handleDownload('en')}
                                    className="group relative flex items-center justify-between w-full p-4 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 font-semibold"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="w-10 h-10 rounded-xl bg-base-100 flex items-center justify-center text-lg group-hover:bg-white/20">🇬🇧</span>
                                        <span>{t('resumeModal.en')}</span>
                                    </div>
                                    <IoDownloadOutline size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>

                            <button
                                onClick={onClose}
                                className="mt-8 text-sm font-medium text-base-content/40 hover:text-base-content transition-colors"
                            >
                                {t('resumeModal.close')}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
