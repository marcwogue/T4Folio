import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SkillsCircular() {
    const { t } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0);
    const radius = 170; // Reduced radius for "watch" feel

    const skills = [
        { name: t('gamePortfolio.skills.items.csharp.name'), color: "#00ffb3", angle: 0, mastery: 95, desc: t('gamePortfolio.skills.items.csharp.desc') },
        { name: t('gamePortfolio.skills.items.unity.name'), color: "#0066ff", angle: 75, mastery: 90, desc: t('gamePortfolio.skills.items.unity.desc') },
        { name: t('gamePortfolio.skills.items.shader.name'), color: "#ff00ff", angle: 180, mastery: 85, desc: t('gamePortfolio.skills.items.shader.desc') },
        { name: t('gamePortfolio.skills.items.optimization.name'), color: "#00f0ff", angle: 240, mastery: 92, desc: t('gamePortfolio.skills.items.optimization.desc') },
        { name: t('gamePortfolio.skills.items.design.name'), color: "#ffff00", angle: 300, mastery: 88, desc: t('gamePortfolio.skills.items.design.desc') },
    ];

    const nextSkill = () => {
        setActiveIndex((prev) => (prev + 1) % skills.length);
    };

    const activeSkill = skills[activeIndex];

    return (
        <section className="relative min-h-screen py-32 bg-base-100 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">

            <div className="relative z-10 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-brand font-black text-base-content uppercase tracking-widest">
                    {t('gamePortfolio.skills.title').split('_')[0]}<span className="text-game-neon-blue">_</span>{t('gamePortfolio.skills.title').split('_')[1]}
                </h2>
                <div className="w-32 h-1 bg-game-neon-blue mx-auto mt-4 rounded-full" />
            </div>

            <div className="relative w-full max-w-6xl h-[500px] flex items-center justify-center">

                {/* Information Card (Left of LOBBY) */}
                <div className="absolute left-[2%] lg:left-[5%] z-30 hidden md:block w-72">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.9, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.9, x: 20 }}
                            className="bg-base-200/80 backdrop-blur-2xl border-2 border-base-content/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden"
                            style={{ borderColor: `${activeSkill.color}40` }}
                        >
                            <div
                                className="absolute top-0 left-0 w-1 h-full"
                                style={{ backgroundColor: activeSkill.color }}
                            />

                            <span className="text-base-content/40 text-[10px] font-black tracking-widest uppercase mb-2 block">
                                {t('gamePortfolio.skills.selected')}
                            </span>
                            <h3 className="text-2xl font-brand font-bold text-base-content mb-2 uppercase leading-tight">
                                {activeSkill.name}
                            </h3>
                            <p className="text-base-content/60 text-[11px] font-game leading-relaxed mb-6 h-12 overflow-hidden">
                                {activeSkill.desc}
                            </p>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-base-content/40 text-[10px] font-bold uppercase tracking-widest">{t('gamePortfolio.skills.efficiency')}</span>
                                    <span className="text-lg font-brand font-bold" style={{ color: activeSkill.color }}>
                                        {activeSkill.mastery}%
                                    </span>
                                </div>
                                <div className="h-1.5 w-full bg-base-content/5 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${activeSkill.mastery}%` }}
                                        className="h-full"
                                        style={{ backgroundColor: activeSkill.color, boxShadow: `0 0 10px ${activeSkill.color}` }}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                            <stop offset="50%" stopColor="rgba(0,102,255,0.2)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                        </linearGradient>
                    </defs>

                    {/* Outer Circle Ring */}
                    <circle
                        cx="500" cy="500" r={radius}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeDasharray="5 10"
                        className="opacity-10 text-base-content"
                    />

                    {/* Radial Line to Active Skill */}
                    <motion.line
                        animate={{
                            x2: 500 + radius * Math.cos((activeSkill.angle * Math.PI) / 180),
                            y2: 500 + radius * Math.sin((activeSkill.angle * Math.PI) / 180)
                        }}
                        x1="500" y1="500"
                        stroke={activeSkill.color}
                        strokeWidth="2"
                        className="opacity-40"
                    />
                </svg>

                {/* Central Node (LOBBY) */}
                <motion.div
                    onClick={nextSkill}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "backOut" }}
                    className="relative z-20 w-40 h-40 bg-base-200/80 backdrop-blur-3xl border-2 border-base-content/20 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(var(--bc),0.1)] group cursor-pointer"
                >
                    <div className="absolute inset-2 border border-dashed border-base-content/20 rounded-full animate-[spin_20s_linear_infinite]" />
                    <span className="text-2xl font-brand font-black text-base-content group-hover:text-game-neon-blue transition-colors">
                        {t('gamePortfolio.skills.lobby')}
                    </span>
                    <div className="absolute -bottom-3 bg-game-neon-blue px-3 py-1 rounded text-[9px] font-black text-white uppercase tracking-tighter shadow-lg group-hover:bg-game-neon-green transition-colors">
                        {t('gamePortfolio.skills.next')}
                    </div>
                </motion.div>

                {/* Satellite Skill Nodes */}
                {skills.map((skill, index) => {
                    const x = radius * Math.cos((skill.angle * Math.PI) / 180);
                    const y = radius * Math.sin((skill.angle * Math.PI) / 180);
                    const isActive = index === activeIndex;

                    return (
                        <motion.div
                            key={index}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: isActive ? 1.1 : 1,
                                opacity: isActive ? 1 : 0.6,
                                x: x,
                                y: y
                            }}
                            transition={{ duration: 0.4 }}
                            className="absolute z-20"
                            style={{
                                left: "50%",
                                top: "50%",
                                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
                            }}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div
                                className={`px-4 py-3 bg-base-200/80 backdrop-blur-xl border ${isActive ? 'border-base-content/40 shadow-lg' : 'border-base-content/10'} rounded-lg flex flex-col items-center justify-center min-w-[130px] group cursor-pointer hover:border-base-content/30 transition-all duration-300`}
                                style={{ boxShadow: isActive ? `0 0 25px ${skill.color}40` : 'none' }}
                            >
                                <div
                                    className={`w-full h-0.5 mb-2 rounded-full ${isActive ? 'opacity-100' : 'opacity-30'} group-hover:opacity-100 transition-opacity`}
                                    style={{ backgroundColor: skill.color }}
                                />
                                <span className={`text-[10px] font-game font-bold ${isActive ? 'text-base-content' : 'text-base-content/60'} uppercase tracking-wider group-hover:text-base-content transition-colors`}>
                                    {skill.name}
                                </span>

                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="text-[8px] text-base-content/40 mt-1 font-medium"
                                    >
                                        {t('gamePortfolio.skills.mastered')} {skill.mastery}%
                                    </motion.span>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Mobile Skill Info */}
            <div className="mt-8 md:hidden w-full px-6">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-200/80 backdrop-blur-2xl border border-base-content/10 p-5 rounded-xl text-center"
                    style={{ borderLeft: `3px solid ${activeSkill.color}` }}
                >
                    <h3 className="text-lg font-brand font-bold text-base-content mb-1 uppercase">
                        {activeSkill.name}
                    </h3>
                    <p className="text-base-content/50 text-[10px] font-game leading-relaxed">
                        {activeSkill.desc}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
