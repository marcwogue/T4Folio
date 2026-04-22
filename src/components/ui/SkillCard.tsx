import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
    icon: ReactNode;
    title: string;
    description?: string;
    level?: number;
    className?: string;
    glowColor?: 'cyan' | 'purple';
}

export default function SkillCard({ icon, title, description, level, className = '', glowColor = 'cyan' }: Props) {
    return (
        <motion.div
            whileHover={{ scale: 1.03, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`glass-card p-6 flex flex-col items-center text-center gap-3 cursor-default ${className}`}
        >
            <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
                className={`text-3xl ${glowColor === 'cyan' ? 'text-neon-cyan' : 'text-neon-purple'}`}
            >
                {icon}
            </motion.div>
            <h3 className="font-semibold text-sm">{title}</h3>
            {description && <p className="text-xs opacity-60">{description}</p>}
            {level !== undefined && (
                <div className="w-full mt-2">
                    <div className="h-1 rounded-full bg-base-300 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut' }}
                            className={`h-full rounded-full ${glowColor === 'cyan'
                                    ? 'bg-linear-to-r from-neon-cyan to-neon-blue'
                                    : 'bg-linear-to-r from-neon-purple to-neon-pink'
                                }`}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
