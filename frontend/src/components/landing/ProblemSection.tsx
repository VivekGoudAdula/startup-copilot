import React from 'react';
import { motion } from 'motion/react';

const problemCards = [
    { text: "“Is this investable?”", color: "from-rose-500/20 to-transparent" },
    { text: "“Who are competitors?”", color: "from-amber-500/20 to-transparent" },
    { text: "“What do I build first?”", color: "from-blue-500/20 to-transparent" },
    { text: "“Will anyone buy this?”", color: "from-emerald-500/20 to-transparent" }
];

export const ProblemSection: React.FC = () => {
    return (
        <section className="py-32 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
                <div className="space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-black leading-tight text-white italic"
                    >
                        Great ideas die in <br />
                        <span className="text-rose-500">uncertainty.</span>
                    </motion.h2>

                    <div className="space-y-6">
                        {[
                            "No idea if market exists",
                            "Competitor confusion",
                            "No clear MVP roadmap",
                            "Weak landing copy"
                        ].map((pain, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-4 text-xl text-slate-400"
                            >
                                <div className="w-2 h-2 rounded-full bg-rose-500/50" />
                                {pain}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative h-[400px] flex items-center justify-center">
                    {problemCards.map((card, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            whileInView={{
                                opacity: 1,
                                scale: 1,
                                y: i * 20 - 40,
                                rotate: i * 2 - 2,
                                zIndex: problemCards.length - i
                            }}
                            whileHover={{
                                scale: 1.05,
                                y: i * 20 - 60,
                                rotate: 0,
                                transition: { type: "spring", stiffness: 300 }
                            }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                            className={`absolute w-72 p-8 glass-card border-white/5 bg-gradient-to-br ${card.color} rounded-2xl shadow-2xl backdrop-blur-2xl cursor-default group`}
                        >
                            <p className="text-lg font-bold text-white/80 group-hover:text-white transition-colors">
                                {card.text}
                            </p>
                            <div className="absolute top-4 right-4 text-white/5 font-black text-6xl">?</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
