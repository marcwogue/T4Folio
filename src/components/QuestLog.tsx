import { motion } from 'framer-motion';
import {  IoLogoPython, IoCodeWorking, IoCarSharp } from 'react-icons/io5';
import { SiUnrealengine, SiCplusplus } from 'react-icons/si';

const quests = [
    {
        id: "quest_01",
        title: "EVENTOKEN_X",
        description: "Lead technical architect for a blockchain-based gaming ecosystem. Unity Integration, Web3 architecture, Liquid Pools.",
        icon: <IoLogoPython size={24} />,
        tags: ["UNITY", "WEB3", "C#"],
        status: "COMPLETED",
        color: "game-neon-green"
    },
    {
        id: "quest_02",
        title: "AZE_SARL",
        description: "Developed a VR training module for industrial safety. Oculus Quest 2 integration, Physics-based interaction.",
        icon: <SiUnrealengine size={24} />,
        tags: ["UNREAL", "VR", "C++"],
        status: "COMPLETED",
        color: "game-neon-blue"
    },
    {
        id: "quest_03",
        title: "NEO_RUNNER",
        description: "High-octane mobile runner with procedurally generated levels and custom shader effects.",
        icon: <IoCarSharp size={24} />,
        tags: ["MOBILE", "SHADERS", "C#"],
        status: "IN_PROGRESS",
        color: "game-accent-orange"
    }
];

export default function QuestLog() {
    return (
        <section className="relative py-24 px-6 lg:px-24 bg-game-bg-dark">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <h2 className="text-3xl font-brand font-black text-white uppercase tracking-widest">
                        COMPLETED<span className="text-game-neon-green">_</span>QUESTS
                    </h2>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {quests.map((quest, index) => (
                        <motion.div
                            key={quest.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`group relative bg-game-card backdrop-blur-xl border-l-4 border-t border-b border-r border-white/5 hover:border-white/20 transition-all rounded-r-2xl overflow-hidden ${quest.color === 'game-neon-green' ? 'border-l-game-neon-green' :
                                    quest.color === 'game-neon-blue' ? 'border-l-game-neon-blue' : 'border-l-game-accent-orange'
                                }`}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-3 rounded-lg bg-white/5 text-white ${quest.color === 'game-neon-green' ? 'text-game-neon-green' :
                                            quest.color === 'game-neon-blue' ? 'text-game-neon-blue' : 'text-game-accent-orange'
                                        }`}>
                                        {quest.icon}
                                    </div>
                                    <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                                        {quest.status} // {quest.id}
                                    </span>
                                </div>

                                <h3 className="text-2xl font-brand font-bold text-white mb-4 group-hover:text-game-neon-cyan transition-colors">
                                    {quest.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed mb-8 font-game">
                                    {quest.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {quest.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-bold text-white/50 group-hover:text-white transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Corner Accents */}
                            <div className={`absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity ${quest.color === 'game-neon-green' ? 'bg-game-neon-green' :
                                    quest.color === 'game-neon-blue' ? 'bg-game-neon-blue' : 'bg-game-accent-orange'
                                }`} style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
