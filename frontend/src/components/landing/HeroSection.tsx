import React from 'react';
import { motion } from 'motion/react';
import { MousePointer2, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HeroRobotScene } from './HeroRobotScene';

export const HeroSection: React.FC = () => {
    const navigate = useNavigate();
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

                    <h1 className="text-6xl md:text-8xl font-display font-black leading-[1.1] tracking-tight text-white italic">
                        Meet Your <span className="text-glow text-accent whitespace-nowrap">AI Co-Founder.</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                        Validate ideas. Build MVPs. Outpace doubt. <br />
                        <span className="text-white/60">Crafted for builders who move at lightspeed.</span>
                    </p>

                    <div className="flex justify-center lg:justify-start">
                        <motion.button
                            onClick={() => navigate('/login')}
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 0 40px rgba(79, 156, 249, 0.6)",
                                background: "linear-gradient(135deg, #4f9cf9 0%, #6366f1 100%)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative px-10 py-5 bg-accent text-white rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all overflow-hidden shadow-2xl shadow-accent/20"
                        >
                            {/* Animated Shine Effect */}
                            <motion.div
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                            />

                            <Sparkles size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                            <span>Get Started</span>
                            <MousePointer2 size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
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
                    <div className="relative z-10 w-full h-[500px]">
                        <HeroRobotScene />
                    </div>

                    {/* Decorative glow behind cat */}
                    <div className="absolute inset-0 bg-accent/20 blur-[80px] rounded-full -z-10" />
                </motion.div>
            </div>
        </section>
    );
};
