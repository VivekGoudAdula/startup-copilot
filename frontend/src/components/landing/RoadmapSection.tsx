import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Rocket, Users, Shield } from 'lucide-react';

const milestones = [
    {
        date: "📅 Week 1",
        title: "Problem Validation",
        desc: "Confirm market demand and draft your initial landing page copy.",
        icon: <Shield size={20} className="text-accent" />,
        items: ["Market Sentiment Analysis", "Competitor Matrix", "Landing Page Draft"]
    },
    {
        date: "📅 Month 1",
        title: "MVP Build",
        desc: "Focus on the core pillars of your product and sign up beta users.",
        icon: <Users size={20} className="text-purple-400" />,
        items: ["Feature Prioritization", "Tech Stack Selection", "Beta User Recruiting"]
    },
    {
        date: "📅 Quarter 1",
        title: "Public Launch",
        desc: "Scale your reach and track metrics that actually matter for growth.",
        icon: <Rocket size={20} className="text-emerald-400" />,
        items: ["Product Hunt Strategy", "Growth Analytics Setup", "Investor Pitch Deck"]
    }
];

export const RoadmapSection: React.FC = () => {
    return (
        <section id="roadmap" className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-24 space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl md:text-7xl font-display font-black text-white italic"
                    >
                        The execution <span className="text-glow text-accent">roadmap.</span>
                    </motion.h2>
                </div>

                <div className="relative border-l-2 border-white/5 pl-12 space-y-16">
                    {milestones.map((ms, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="relative"
                        >
                            {/* Timeline Point */}
                            <div className="absolute -left-[61px] top-0 w-6 h-6 rounded-full bg-background border-4 border-accent shadow-[0_0_15px_rgba(79,156,249,0.5)] z-10" />

                            <div className="glass-card p-8 rounded-[2rem] border-white/10 hover:border-accent/30 group transition-all duration-500 hover:shadow-[0_0_40px_rgba(79,156,249,0.1)]">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                                    <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-black text-slate-400 uppercase tracking-widest">
                                        {ms.date}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {ms.icon}
                                    </div>
                                </div>

                                <h3 className="text-3xl font-display font-black text-white mb-4 italic group-hover:text-accent transition-colors">
                                    {ms.title}
                                </h3>

                                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                                    {ms.desc}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {ms.items.map((item, j) => (
                                        <span key={j} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
