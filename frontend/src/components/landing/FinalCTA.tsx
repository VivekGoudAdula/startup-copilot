import React from 'react';
import { motion } from 'motion/react';
import { Rocket } from 'lucide-react';

export const FinalCTA: React.FC = () => {
    return (
        <section className="py-40 bg-background relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative glass-card p-16 md:p-24 rounded-[3rem] border-white/10 text-center space-y-10 overflow-hidden"
                >
                    {/* Subtle background glow */}
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 blur-[100px] rounded-full" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-accent/10 blur-[100px] rounded-full" />

                    <div className="space-y-6 relative z-10">
                        <h2 className="text-5xl md:text-7xl font-display font-black leading-tight text-white italic tracking-tight">
                            You’re 3 steps <br />
                            closer to <span className="text-glow text-accent">launch.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
                            Adopt your AI Co-Founder today and stop letting great ideas die in spreadsheets.
                        </p>
                    </div>

                    <div className="relative z-10 flex justify-center">
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 50px rgba(79, 156, 249, 0.5)",
                                backgroundColor: "#5ba7ff"
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-accent text-white rounded-2xl font-black text-2xl flex items-center gap-3 transition-all group"
                        >
                            <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            🐾 Start Building Now
                        </motion.button>
                    </div>

                    <div className="text-slate-600 text-sm font-bold uppercase tracking-widest pt-4">
                        No credit card required. Pure execution.
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
