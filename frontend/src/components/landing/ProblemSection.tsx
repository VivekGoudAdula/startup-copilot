import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { AnimatedCat } from '../AnimatedCat';

const painPoints = [
    "No idea if market exists",
    "Competitor confusion",
    "No clear MVP roadmap",
    "Weak landing copy"
];

export const ProblemSection: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-background">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left: Cat Animation in a Premium Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-center p-8"
                    >
                        <AnimatedCat className="scale-[2] w-full max-w-[500px]" />

                        {/* Background subtle glow to make the isolated cat pop */}
                        <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full -z-10" />
                    </motion.div>

                    {/* Right: Content */}
                    <div className="space-y-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-5xl md:text-7xl font-display font-black leading-tight tracking-tight text-white mb-8">
                                Great Ideas die <br />
                                in <span className="text-red-500 italic">uncertainty.</span>
                            </h2>
                        </motion.div>

                        <div className="space-y-6">
                            {painPoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                    whileHover={{ x: 10 }}
                                    className="flex items-center gap-4 group"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/10 transition-all duration-300">
                                        <Sparkles size={18} className="text-slate-500 group-hover:text-accent transition-colors" />
                                    </div>
                                    <span className="text-xl md:text-2xl text-slate-400 group-hover:text-white transition-colors">
                                        {point}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
