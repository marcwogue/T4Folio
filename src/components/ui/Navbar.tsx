import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';
import { MdLanguage } from 'react-icons/md';

interface NavbarProps {
    isSidebarExpanded: boolean;
}

export default function Navbar({ isSidebarExpanded }: NavbarProps) {
    const { t, i18n } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' });
        }
    }, []);

    const toggleLang = () => {
        const newLang = i18n.language === 'fr' ? 'en' : 'fr';
        i18n.changeLanguage(newLang);
    };

    const navLinks = [
        { path: '/', label: t('sidebar.labels.home') },
        { path: '/video', label: t('sidebar.labels.creator') },
        { path: '/gamedev', label: t('sidebar.labels.developer') },
        { path: '/portfolio', label: t('nav.portfolio') },
        { path: '/about', label: t('nav.about') },
        { path: '/resume', label: t('nav.resume') },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav
            ref={navRef}
            className={`sticky top-0 z-50 transition-all duration-300 w-full ${scrolled
                ? 'glass py-2 shadow-lg'
                : 'bg-transparent py-4'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-14">
                    {/* Brand Name */}
                    <Link to="/" className="text-2xl font-black italic tracking-tighter text-white uppercase">
                        T4ZOR
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 ${isActive(link.path)
                                    ? 'text-white'
                                    : 'text-white/40 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-t4zor-orange rounded-full"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        {/* Language Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleLang}
                            className="text-[10px] font-black tracking-[0.2em] text-white/40 hover:text-white transition-all uppercase"
                        >
                            {i18n.language === 'fr' ? 'EN' : 'FR'}
                        </motion.button>

                        <Link
                            to="/cv"
                            className="hidden md:flex items-center px-6 py-2 bg-white text-black text-[10px] font-black tracking-widest uppercase rounded-full hover:bg-neutral-200 transition-all"
                        >
                            {t('nav.downloadCV')}
                        </Link>

                        {/* Theme Toggle */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="btn btn-ghost btn-sm btn-circle"
                            title={t('nav.toggleTheme')}
                        >
                            <AnimatePresence mode="wait">
                                {theme === 'dark' ? (
                                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <HiSun className="text-lg text-yellow-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <HiMoon className="text-lg text-indigo-500" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="btn btn-ghost btn-sm btn-circle md:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive(link.path)
                                        ? 'text-neon-cyan bg-neon-cyan/10'
                                        : 'hover:bg-base-200'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
