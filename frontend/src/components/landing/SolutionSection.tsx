import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Map, PenTool, Check, ChevronDown } from 'lucide-react';
import NeonGradient from '../NeonGradient';

export const SolutionSection: React.FC = () => {
    const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

    return (
        <section id="features" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-black leading-tight text-white italic"
                    >
                        From idea → clarity → <span className="text-accent">execution.</span>
                    </motion.h2>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Pillar 1: Idea Validation */}
                    <FeatureCard
                        icon={<Target className="text-accent" />}
                        title="1️⃣ Idea Validation"
                        glowColor="rgba(79, 156, 249, 0.4)"
                        neonColors="from-blue-500 via-cyan-400 to-blue-700"
                    >
                        <div className="space-y-6 mt-6">
                            <div className="relative w-32 h-32 mx-auto">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-white/5"
                                    />
                                    <motion.circle
                                        initial={{ strokeDasharray: "0, 1000" }}
                                        whileInView={{ strokeDasharray: "330, 1000" }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                        cx="64"
                                        cy="64"
                                        r="58"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray="364.4"
                                        className="text-accent drop-shadow-[0_0_12px_rgba(79,156,249,0.8)]"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-black text-white">92</span>
                                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Score</span>
                                </div>
                            </div>
                            <ul className="space-y-3 text-sm text-slate-400">
                                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> SWOT Analysis</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Competitor Insights</li>
                                <li className="flex items-center gap-2"><Check size={14} className="text-accent" /> Risk Breakdown</li>
                            </ul>
                        </div>
                    </FeatureCard>

                    {/* Pillar 2: Roadmap Generator */}
                    <FeatureCard
                        icon={<Map className="text-purple-400" />}
                        title="2️⃣ MVP Roadmap"
                        glowColor="rgba(192, 132, 252, 0.4)"
                        neonColors="from-purple-600 via-fuchsia-500 to-pink-600"
                    >
                        <div className="space-y-3 mt-6">
                            {[
                                { t: "Week 1", d: "Problem Validation & High-fidelity mockup" },
                                { t: "Month 1", d: "Core MVP build & Beta user tests" },
                                { t: "Quarter 1", d: "Public Launch & Metrics tracking" }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
                                    onClick={() => setActiveAccordion(activeAccordion === i ? null : i)}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-bold text-white">{item.t}</span>
                                        <ChevronDown size={14} className={`text-slate-500 transition-transform ${activeAccordion === i ? 'rotate-180' : ''}`} />
                                    </div>
                                    <AnimatePresence>
                                        {activeAccordion === i && (
                                            <motion.p
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="text-xs text-slate-500 mt-2 leading-relaxed overflow-hidden"
                                            >
                                                {item.d}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </FeatureCard>

                    {/* Pillar 3: Copy Generator */}
                    <FeatureCard
                        icon={<PenTool className="text-emerald-400" />}
                        title="3️⃣ Landing Copy"
                        glowColor="rgba(52, 211, 153, 0.4)"
                        neonColors="from-emerald-500 via-teal-400 to-green-600"
                    >
                        <div className="mt-6 space-y-4">
                            <div className="aspect-video rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
                                <div className="space-y-2">
                                    <div className="h-2 w-2/3 bg-emerald-400/20 rounded-full" />
                                    <div className="h-2 w-full bg-white/10 rounded-full" />
                                    <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                </div>
                                <div className="flex justify-end">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="p-2 rounded-lg bg-accent/20 text-accent cursor-pointer"
                                    >
                                        <PenTool size={14} />
                                    </motion.div>
                                </div>
                            </div>
                            <p className="text-xs text-slate-500 leading-relaxed italic">
                                “High-converting headlines, value props, and 30-sec pitch scripts in one click.”
                            </p>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, children, glowColor, neonColors }: { icon: React.ReactNode, title: string, children: React.ReactNode, glowColor: string, neonColors?: string }) => (
    <motion.div
        whileHover={{ y: -10 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
    >
        <NeonGradient
            colors={neonColors || "from-pink-600 via-purple-600 to-blue-500"}
            rounded="rounded-[2.5rem]"
            className="h-full"
        >
            <div className="p-8 rounded-[2.5rem] bg-[#0a0a12] h-full">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                    {icon}
                </div>
                <h3 className="text-2xl font-display font-black text-white italic">{title}</h3>
                {children}
            </div>
        </NeonGradient>
    </motion.div>
);
