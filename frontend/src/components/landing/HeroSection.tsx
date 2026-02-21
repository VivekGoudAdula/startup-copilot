import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Play } from 'lucide-react';
import { AnimatedCat } from '../AnimatedCat';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden premium-gradient">
            {/* Background Particles/Glows */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -left-40 w-96 h-96 bg-accent/20 blur-[120px] rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                        x: [0, -50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -right-40 w-96 h-96 bg-glow/10 blur-[120px] rounded-full"
                />

                {/* Subtle moving particles (CSS/SVG) */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
                            animate={{
                                y: ["-10%", "110%"],
                                opacity: [0, 1, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: i * 0.5
                            }}
                            className="absolute w-1 h-1 bg-white rounded-full"
                        />
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-8"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-sm font-medium backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                        Leading the Idea Revolution
                    </div>

                    <h1 className="text-6xl md:text-8xl font-display font-black leading-[0.95] tracking-tight text-white italic">
                        Meet Your <br />
                        <span className="text-glow text-accent">AI Co-Founder.</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                        Validate ideas. Build MVPs. Outpace doubt. <br />
                        <span className="text-white/60">Crafted for builders who move at lightspeed.</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 156, 249, 0.4)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all"
                        >
                            <MousePointer2 size={20} />
                            🐾 Get Started
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-3 backdrop-blur-sm"
                        >
                            <Play size={20} className="fill-white" />
                            Watch Demo
                        </motion.button>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className="relative perspective-1000"
                    style={{ perspective: '1000px' }}
                >
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: -5 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        className="relative z-10 glass-card p-12 rounded-[3rem] border-white/10"
                    >
                        <AnimatedCat state="idle" className="scale-125" />
                    </motion.div>

                    {/* Decorative glow behind cat */}
                    <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full -z-10" />
                </motion.div>
            </div>
        </section>
    );
};
