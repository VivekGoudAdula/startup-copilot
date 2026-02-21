import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Lightbulb, PlayCircle } from 'lucide-react';
import { AnimatedCat } from './AnimatedCat';

interface ContinueDraftScreenProps {
    onContinue: () => void;
    onNewIdea: () => void;
    onExplore: () => void;
}

export const ContinueDraftScreen: React.FC<ContinueDraftScreenProps> = ({
    onContinue,
    onNewIdea,
    onExplore
}) => {
    return (
        <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden italic">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-200/10 blur-[150px] rounded-full" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-xl text-center space-y-12 relative z-10"
            >
                <div className="space-y-6">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight uppercase">
                        Still thinking? <br />
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Let’s build something today.</span>
                    </h1>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={onContinue}
                        className="w-full group relative p-8 bg-indigo-600 rounded-[2.5rem] text-white flex items-center justify-between overflow-hidden shadow-2xl shadow-indigo-200 transition-all hover:scale-[1.02]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <div className="flex items-center gap-6">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                                <PlayCircle size={24} />
                            </div>
                            <div className="text-left">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">Resume Draft</span>
                                <h3 className="text-xl font-black uppercase">Continue Last Idea</h3>
                            </div>
                        </div>
                        <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </button>

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={onNewIdea}
                            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-indigo-600 transition-all group"
                        >
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Lightbulb size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Start Project</span>
                        </button>

                        <button
                            onClick={onExplore}
                            className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-violet-600 transition-all group"
                        >
                            <div className="w-10 h-10 bg-violet-50 text-violet-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Sparkles size={20} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-900">Explore Ideas</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
