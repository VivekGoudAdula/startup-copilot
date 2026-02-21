import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Cpu, Zap } from 'lucide-react';
import { NeonGradientCard } from '../ui/NeonGradientCard';

const steps = [
    {
        icon: <MousePointer2 size={24} />,
        title: "1. Enter Idea",
        desc: "Describe your vision in plain English."
    },
    {
        icon: <Cpu size={24} />,
        title: "2. AI Validates",
        desc: "Our AI cats crunch market data for you."
    },
    {
        icon: <Zap size={24} />,
        title: "3. Get Roadmap",
        desc: "Execute with a clear, data-driven plan."
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <section className="py-32 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-display font-black text-white italic"
                    >
                        How it <span className="text-accent">works.</span>
                    </motion.h2>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 w-full h-px bg-white/5 -translate-y-1/2 hidden md:block">
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="w-full h-full bg-accent origin-left opacity-30 shadow-[0_0_10px_#4F9CF9]"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative z-10">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="flex flex-col items-center text-center space-y-6 group"
                            >
                                <NeonGradientCard borderRadius="2xl" className="w-20 h-20">
                                    <div className="w-full h-full flex items-center justify-center text-accent group-hover:text-glow transition-colors">
                                        {step.icon}
                                    </div>
                                </NeonGradientCard>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-display font-black text-white italic">{step.title}</h3>
                                    <p className="text-slate-500 font-medium max-w-[200px]">{step.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
