import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface TimelineItem {
    title: string;
    role: string;
    period: string;
    description: string;
    tasks: string[];
    icon: ReactNode;
}

interface Props {
    items: TimelineItem[];
    accentColor?: 'cyan' | 'purple';
}

export default function ExperienceTimeline({ items, accentColor = 'cyan' }: Props) {
    const color = accentColor === 'cyan' ? 'neon-cyan' : 'neon-purple';

    return (
        <div className="relative">
            {/* Vertical line */}
            <div className={`absolute left-6 top-0 bottom-0 w-px bg-linear-to-b from-${color} via-${color}/50 to-transparent`} />

            <div className="space-y-8">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.15 }}
                        className="relative pl-16"
                    >
                        {/* Dot */}
                        <motion.div
                            whileHover={{ scale: 1.3 }}
                            className={`absolute left-4 top-2 w-5 h-5 rounded-full border-2 border-${color} bg-base-100 flex items-center justify-center z-10`}
                        >
                            <div className={`w-2 h-2 rounded-full bg-${color}`} />
                        </motion.div>

                        {/* Card */}
                        <div className="glass-card p-6">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className={`text-2xl text-${color}`}>{item.icon}</span>
                                <div>
                                    <h3 className="font-bold text-lg">{item.title}</h3>
                                    <p className={`text-sm text-${color}`}>{item.role}</p>
                                </div>
                                <span className="ml-auto text-xs font-mono opacity-50 bg-base-300 px-3 py-1 rounded-full">
                                    {item.period}
                                </span>
                            </div>
                            <p className="text-sm opacity-70 mb-3">{item.description}</p>
                            <ul className="space-y-1">
                                {item.tasks.map((task, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + i * 0.1 }}
                                        className="text-sm opacity-60 flex items-start gap-2"
                                    >
                                        <span className={`text-${color} mt-1`}>▹</span>
                                        {task}
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
