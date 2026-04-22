import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaGamepad, FaAngleRight, FaAngleLeft, FaCog } from 'react-icons/fa';
import { HiHome, HiX } from 'react-icons/hi';
import { MdLanguage } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import { HiSun, HiMoon } from 'react-icons/hi';
import { IoColorPaletteOutline, IoGameControllerOutline } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { useTransition } from '../../context/TransitionContext';
import { IoCloudDownloadOutline } from 'react-icons/io5';
import { useState, useEffect, useRef } from 'react';
import ResumeModal from './ResumeModal';

interface SidebarProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export default function Sidebar({ isExpanded, onToggle }: SidebarProps) {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { startTransition } = useTransition();
    const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
    const location = useLocation();
    const touchStartX = useRef<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path;

    const navItems = [
        { path: '/', icon: <HiHome />, label: t('sidebar.labels.home') },
        {
            path: '/video',
            icon: <IoColorPaletteOutline />,
            label: t('sidebar.labels.creator'),
            subLabel: t('sidebar.labels.creatorSub')
        },
        {
            path: '/gamedev',
            icon: <IoGameControllerOutline />,
            label: t('sidebar.labels.developer'),
            subLabel: t('sidebar.labels.developerSub')
        },
    ];

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX.current = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (touchStartX.current === null) return;
            const touchEndX = e.touches[0].clientX;
            const diff = touchEndX - touchStartX.current;

            // Reveal if swipe from edge (first 30px) towards right
            if (touchStartX.current < 30 && diff > 50 && !isMobileMenuOpen) {
                setIsMobileMenuOpen(true);
                touchStartX.current = null;
            }

            // Hide if swipe left
            if (isMobileMenuOpen && diff < -50) {
                setIsMobileMenuOpen(false);
                touchStartX.current = null;
            }
        };

        const handleTouchEnd = () => {
            touchStartX.current = null;
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMobileMenuOpen]);

    const toggleLang = () => {
        const newLang = i18n.language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
    };

    return (
        <>
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-55 md:hidden"
                    />
                )}
            </AnimatePresence>

            <motion.aside
                initial={false}
                animate={{
                    width: isExpanded ? '280px' : '88px',
                    x: (window.innerWidth < 768 && !isMobileMenuOpen) ? '-100%' : '0%'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className={`fixed top-0 left-0 h-screen bg-base-200 border-r border-base-300 z-60 flex flex-col transition-all duration-300 ease-in-out shadow-2xl ${isMobileMenuOpen ? 'w-[280px] px-4' : ''}`}
                style={{
                    width: (window.innerWidth < 768) ? '280px' : undefined
                }}
            >
                {/* Header Section */}
                <div className="flex items-center px-6 h-24 border-b border-base-300 relative">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 ${isExpanded || isMobileMenuOpen
                            ? 'bg-[#5841d8] text-white shadow-[0_0_20px_rgba(88,65,216,0.3)]'
                            : 'bg-transparent text-primary shadow-none'
                            }`}>
                            <IoColorPaletteOutline size={28} />
                        </div>
                        {(isExpanded || isMobileMenuOpen) && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-col"
                            >
                                <span className="font-bold text-lg text-base-content leading-tight">Portfolio Hub</span>
                                <span className="text-[10px] font-bold text-base-content/60 tracking-widest uppercase">{t('sidebar.selectDiscipline')}</span>
                            </motion.div>
                        )}
                    </div>

                    {/* Toggle Button - Hidden on mobile */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle();
                        }}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#5841d8] text-white hidden md:flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-100 border-4 border-theme-surface shadow-lg shadow-purple-500/20"
                    >
                        {isExpanded ? <FaAngleLeft size={14} /> : <FaAngleRight size={14} />}
                    </button>

                    {/* Close button for mobile */}
                    {isMobileMenuOpen && (
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="absolute right-4 top-4 text-base-content/40 hover:text-base-content md:hidden"
                        >
                            <HiX size={24} />
                        </button>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 flex flex-col gap-3 py-10 px-4 no-scrollbar overflow-y-auto">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={(e) => {
                                setIsMobileMenuOpen(false);
                                if (item.path === '/gamedev') {
                                    e.preventDefault();
                                    startTransition(item.path, 'minecraft');
                                } else if (item.path === '/video') {
                                    e.preventDefault();
                                    startTransition(item.path, 'wave');
                                }
                            }}
                            className={`relative flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 ${isActive(item.path)
                                ? 'bg-base-100 text-base-content border border-base-300'
                                : 'text-base-content/60 hover:text-base-content border-base-300 border-dashed'
                                }`}
                        >
                            <span className={`text-2xl shrink-0 ${isActive(item.path) ? 'text-[#5841d8]' : ''}`}>
                                {item.icon}
                            </span>

                            {(isExpanded || isMobileMenuOpen) && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-col"
                                >
                                    <span className="font-semibold text-[15px] whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </motion.div>
                            )}

                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="sidebarActive"
                                    className="absolute -left-1 w-2 h-8 bg-[#5841d8] rounded-full blur-[2px]"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Bottom Section */}
                <div className="p-6 space-y-6 bg-linear-to-t from-black/20 to-transparent">
                    <div className="flex flex-col gap-2">
                        <button
                            onClick={() => setIsResumeModalOpen(true)}
                            className={`flex items-center gap-4 py-3 rounded-2xl text-base-content/40 hover:text-base-content hover:bg-base-content/5 transition-all text-sm font-medium ${(isExpanded || isMobileMenuOpen) ? 'px-4' : 'justify-center'}`}
                        >
                            <IoCloudDownloadOutline size={26} />
                            {(isExpanded || isMobileMenuOpen) && <span>{t('sidebar.downloadResume')}</span>}
                        </button>

                        <button
                            onClick={toggleLang}
                            className={`flex items-center gap-4 py-3 rounded-2xl text-base-content/40 hover:text-base-content hover:bg-base-content/5 transition-all text-sm font-medium ${(isExpanded || isMobileMenuOpen) ? 'px-4' : 'justify-center'}`}
                        >
                            <MdLanguage size={26} />
                            {(isExpanded || isMobileMenuOpen) && <span>{i18n.language === 'fr' ? 'English' : 'Français'}</span>}
                        </button>

                        <button
                            onClick={toggleTheme}
                            className={`flex items-center gap-4 py-3 rounded-2xl text-base-content/40 hover:text-base-content hover:bg-base-content/5 transition-all text-sm font-medium ${(isExpanded || isMobileMenuOpen) ? 'px-4' : 'justify-center'}`}
                        >
                            {theme === 'dark' ? <HiSun size={26} className="text-yellow-400" /> : <HiMoon size={26} className="text-indigo-400" />}
                            {(isExpanded || isMobileMenuOpen) && <span>{theme === 'dark' ? t('sidebar.lightMode') : t('sidebar.darkMode')}</span>}
                        </button>
                    </div>

                    {/* Profile Card */}
                    <div className={`p-3 rounded-4xl transition-all duration-300 flex items-center gap-4 ${isExpanded || isMobileMenuOpen
                        ? 'bg-base-100 border border-base-300'
                        : 'bg-transparent border-transparent justify-center p-0'
                        }`}>
                        <div className={`w-10 h-10 rounded-full overflow-hidden shrink-0 ${(isExpanded || isMobileMenuOpen) ? 'bg-neutral-800' : 'bg-transparent'}`}>
                            {/* Avatar Placeholder */}
                            <img src="/logos.png" alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                        {(isExpanded || isMobileMenuOpen) && (
                            <div className="flex flex-col min-w-0">
                                <span className="text-sm font-bold text-base-content ">Kamdem Woyim Franck Romain</span>
                                <span className="text-[10px] text-base-content/60 font-bold uppercase tracking-wider">Multidisciplinary</span>
                            </div>
                        )}
                    </div>
                </div>

                <ResumeModal
                    isOpen={isResumeModalOpen}
                    onClose={() => setIsResumeModalOpen(false)}
                />
            </motion.aside>
        </>
    );
}
