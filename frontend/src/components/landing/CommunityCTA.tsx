'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const CommunityCTA: React.FC = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
            return;
        }

        setStatus('loading');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 5000);
        }, 1500);
    };

    return (
        <section className="relative py-32 px-6 overflow-hidden bg-[#0B0F19]">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4F9CF9]/10 blur-[160px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <h2 className="text-6xl sm:text-7xl lg:text-8xl font-display font-black text-white mb-6 tracking-tight italic leading-[0.95]">
                        Join our <span className="text-glow text-accent">Community.</span>
                    </h2>
                    <p className="text-slate-400 text-xl md:text-2xl font-medium max-w-2xl mx-auto uppercase tracking-widest opacity-80">
                        Have any idea? Reach us out.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-2xl mx-auto"
                >
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className={`
              relative flex flex-col md:flex-row items-center gap-3 p-2 bg-[#111827]/40 backdrop-blur-xl 
              border-2 rounded-2xl lg:rounded-full transition-all duration-300
              ${status === 'error' ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]' :
                                status === 'success' ? 'border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]' :
                                    'border-white/5 focus-within:border-[#4F9CF9]/30 focus-within:shadow-[0_0_30px_rgba(79,156,249,0.1)]'}
            `}>
                            <div className="flex-1 flex items-center w-full px-4">
                                <Mail className={`w-5 h-5 mr-3 transition-colors ${status === 'error' ? 'text-red-400' : 'text-gray-500 group-focus-within:text-[#4F9CF9]'}`} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full py-4 font-medium"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full md:w-auto px-8 py-4 bg-[#4F9CF9] text-white rounded-xl lg:rounded-full font-black flex items-center justify-center gap-2 
                       hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_10px_20px_-5px_rgba(79,156,249,0.4)] hover:shadow-[#4F9CF9]/50"
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>Submit</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Status Notifications */}
                    <AnimatePresence>
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute -bottom-16 left-0 right-0 flex justify-center"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 font-bold text-sm shadow-lg backdrop-blur-sm">
                                    <CheckCircle2 size={16} />
                                    <span>Thanks for joining 🚀</span>
                                </div>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute -bottom-16 left-0 right-0 flex justify-center"
                            >
                                <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 font-bold text-sm shadow-lg backdrop-blur-sm">
                                    <AlertCircle size={16} />
                                    <span>Invalid email address</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
