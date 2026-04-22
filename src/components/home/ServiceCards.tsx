import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowUpRight } from 'react-icons/fi';
import { IoColorPaletteOutline, IoGameControllerOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useTransition } from '../../context/TransitionContext';

export default function ServiceCards() {
    const { t } = useTranslation();
    const { startTransition } = useTransition();

    const services = [
        {
            title: t('home.services.content.title'),
            description: t('home.services.content.description'),
            link: t('home.services.content.link'),
            icon: <IoColorPaletteOutline size={20} className="text-t4zor-orange" />,
            path: '/video'
        },
        {
            title: t('home.services.game.title'),
            description: t('home.services.game.description'),
            link: t('home.services.game.link'),
            icon: <IoGameControllerOutline size={20} className="text-t4zor-orange" />,
            path: '/gamedev'
        }
    ];

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {services.map((service, index) => (
                        <Link
                            to={service.path}
                            key={index}
                            onClick={(e) => {
                                if (service.path === '/gamedev') {
                                    e.preventDefault();
                                    startTransition(service.path, 'minecraft');
                                } else if (service.path === '/video') {
                                    e.preventDefault();
                                    startTransition(service.path, 'wave');
                                }
                            }}
                        >
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="group relative bg-[#13131a] rounded-4xl md:rounded-[2.5rem] p-6 md:p-10 border border-white/5 overflow-hidden transition-all hover:border-white/10"
                            >
                                <div className="flex flex-col gap-6 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                                        {service.icon}
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <h3 className="text-3xl font-black text-white tracking-tight leading-tight uppercase">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/40 leading-relaxed max-w-sm">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3 text-white font-bold text-sm group-hover:text-t4zor-orange transition-colors">
                                        <span>{service.link}</span>
                                        <FiArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Subtle Background Gradient */}
                                <div className="absolute inset-0 bg-linear-to-br from-white/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
