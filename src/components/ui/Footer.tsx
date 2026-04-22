import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaGithub, FaEnvelope, FaHeart } from 'react-icons/fa';
import links from '../../constants/links.json';

export default function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-base-300">
            {/* Gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linnear-to-r from-transparent via-neon-cyan to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-neon-cyan to-neon-purple flex items-center justify-center text-white font-bold text-lg">
                                <img src="/logos.png" alt="t4logos" className='rounded-xl object-cover' />
                            </div>
                            <span className="font-bold text-lg">{t('footer.labels.portfolio')}</span>
                        </div>
                        <p className="text-sm opacity-60 max-w-xs">
                            Kamdem Woyim Franck Romain
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col gap-2"
                    >
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-neon-cyan">{t('footer.headings.links')}</h4>
                        <a href={links.contact.mailPrimary} className="text-sm opacity-60 hover:opacity-100 hover:text-neon-cyan transition-all flex items-center gap-2">
                            <FaEnvelope className="text-xs" /> fakou009@gmail.com
                        </a>
                        <a href={links.contact.mailSecondary} className="text-sm opacity-60 hover:opacity-100 hover:text-neon-cyan transition-all flex items-center gap-2">
                            <FaEnvelope className="text-xs" /> T4zorgames@gmail.com
                        </a>
                    </motion.div>

                    {/* Social */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-neon-cyan">{t('footer.headings.social')}</h4>
                        <div className="flex gap-3">
                            <motion.a
                                whileHover={{ scale: 1.1, y: -2 }}
                                href={links.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-neon-cyan transition-colors"
                            >
                                <FaGithub />
                            </motion.a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-6 border-t border-base-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm opacity-50">
                        © {currentYear} Kamdem Woyim. {t('footer.rights')}
                    </p>
                    <p className="text-sm opacity-50 flex items-center gap-1">
                        {t('footer.madeWith')} <FaHeart className="text-red-500 text-xs" />
                    </p>
                </div>
            </div>
        </footer>
    );
}
