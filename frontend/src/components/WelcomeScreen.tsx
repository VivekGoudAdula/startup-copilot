import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Plus, ChevronRight, Layout, TrendingUp, Shield } from 'lucide-react';
import { CopilotCat } from './auth/CopilotCat';
import logo from '../public/images/logo.png';
import { ProjectData } from '../context/AuthContext';

interface WelcomeScreenProps {
    userName: string;
    project: ProjectData;
    onContinue: (project: ProjectData) => void;
    onNewIdea: () => void;
    onViewAll: () => void;
    isBestProject?: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
    userName,
    project,
    onContinue,
    onNewIdea,
    onViewAll,
    isBestProject
}) => {
    return (
        <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[55%] h-[55%] bg-indigo-200/20 blur-[160px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[55%] h-[55%] bg-violet-200/20 blur-[160px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            {/* ── Main content — no card, directly on screen ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="relative z-10 w-full max-w-3xl px-8 py-10 space-y-8"
            >
                {/* Logo + Greeting */}
                <div className="space-y-3">
                    <img src={logo} alt="Startup Copilot" className="h-10 w-auto object-contain" />
                    <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                        Welcome back,{' '}
                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            {userName} 👋
                        </span>
                    </h1>
                </div>

                {/* Project Panel — dark strip, no card border */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="relative overflow-hidden p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white shadow-2xl shadow-slate-300/30 group"
                >
                    {/* Faint rocket watermark */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-700">
                        <Rocket size={110} />
                    </div>

                    <div className="space-y-5 relative z-10">
                        {/* Header row */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Continue building</span>
                                <h2 className="text-2xl font-black uppercase italic leading-tight">{project.name}</h2>
                            </div>
                            {isBestProject && (
                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="shrink-0 bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-xl"
                                >
                                    <div className="flex items-center gap-2">
                                        <Shield size={11} className="text-emerald-400" />
                                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">AI Pick: Top Potential</span>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Stats row */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validation Score</span>
                                    <span className="text-xs font-black text-indigo-400">{project.validationScore}</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.validationScore}%` }}
                                        transition={{ delay: 0.8, duration: 1.4, ease: 'easeOut' }}
                                        className="h-full bg-indigo-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Execution Confidence</span>
                                    <span className="text-xs font-black text-emerald-400">{project.executionConfidence}%</span>
                                </div>
                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${project.executionConfidence}%` }}
                                        transition={{ delay: 1, duration: 1.4, ease: 'easeOut' }}
                                        className="h-full bg-emerald-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer row */}
                        <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    Last edited: {new Date(project.lastUpdated).toLocaleDateString()}
                                </span>
                            </div>
                            <button
                                onClick={() => onContinue(project)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all hover:gap-3"
                            >
                                Continue Building <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* AI Intelligence note */}
                {isBestProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex items-center gap-4"
                    >
                        <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
                            <TrendingUp size={18} />
                        </div>
                        <p className="text-sm font-medium text-slate-500 normal-case leading-relaxed">
                            <span className="font-black text-slate-700 uppercase italic mr-2 text-[10px] tracking-widest">AI Intelligence:</span>
                            We've analyzed all your ventures. This project holds the{' '}
                            <span className="text-emerald-600 font-bold">highest execution potential</span> based on market gaps and validation scores.
                        </p>
                    </motion.div>
                )}

                {/* Action buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-4"
                >
                    <button
                        onClick={onNewIdea}
                        className="flex items-center justify-center gap-3 py-5 px-6 bg-indigo-50 hover:bg-indigo-100 rounded-2xl text-indigo-700 transition-all group/new"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover/new:scale-110 transition-transform">
                            <Plus size={16} className="text-indigo-600" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Start New Idea</span>
                    </button>

                    <button
                        onClick={onViewAll}
                        className="flex items-center justify-center gap-3 py-5 px-6 bg-white border border-slate-100 hover:border-indigo-300 rounded-2xl text-slate-500 hover:text-indigo-600 transition-all group/all"
                    >
                        <div className="w-8 h-8 bg-slate-50 group-hover/all:bg-indigo-50 rounded-lg flex items-center justify-center transition-colors">
                            <Layout size={16} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest italic">View All Projects</span>
                    </button>
                </motion.div>
            </motion.div>

            {/* ── Fixed Cat Companion ── */}
            <motion.div
                className="fixed bottom-42 right-52 z-50 flex flex-col items-end gap-1"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.7 }}
            >

                <div className="w-4 h-4">
                    <CopilotCat mode={isBestProject ? 'happy' : 'login'} />
                </div>
            </motion.div>
        </div>
    );
};
