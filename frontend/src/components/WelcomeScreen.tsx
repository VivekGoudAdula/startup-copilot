import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Plus, ChevronRight, Layout, TrendingUp, Shield } from 'lucide-react';
import { AnimatedCat } from './AnimatedCat';
import { ProjectData } from '../context/AuthContext';
import { cn } from '../lib/utils';

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
        <div className="min-h-screen bg-[#FDFDFF] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-200/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-2xl relative z-10"
            >
                {/* Welcome Card */}
                <div className="bg-white/80 backdrop-blur-3xl p-12 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.06)] border border-white space-y-10 group">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight leading-tight">
                            Welcome back, <br />
                            <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">{userName} 👋</span>
                        </h1>
                    </div>

                    {/* Featured Project Card */}
                    <div className="relative overflow-hidden p-10 bg-gradient-to-br from-slate-900 to-slate-800 rounded-[3rem] text-white shadow-2xl shadow-slate-200 group/card">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover/card:scale-110 transition-transform duration-700">
                            <Rocket size={120} />
                        </div>

                        <div className="space-y-6 relative z-10">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Continue building</span>
                                    <h2 className="text-3xl font-black italic uppercase leading-none">{project.name}</h2>
                                </div>
                                {isBestProject && (
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        className="bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-xl backdrop-blur-md"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Shield size={12} className="text-emerald-400" />
                                            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">AI Pick: Top Potential</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-8 py-4">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validation Score</span>
                                        <span className="text-xs font-black text-indigo-400">{project.validationScore}</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.validationScore}%` }}
                                            transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Execution Confidence</span>
                                        <span className="text-xs font-black text-emerald-400">{project.executionConfidence}%</span>
                                    </div>
                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${project.executionConfidence}%` }}
                                            transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-emerald-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        Last edited: {new Date(project.lastUpdated).toLocaleDateString()}
                                    </span>
                                </div>
                                <button
                                    onClick={() => onContinue(project)}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all hover:gap-3"
                                >
                                    Continue Building <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {isBestProject && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100/50 flex items-center gap-6"
                        >
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
                                <TrendingUp size={24} />
                            </div>
                            <p className="text-sm font-medium text-slate-600 normal-case leading-relaxed">
                                <span className="font-black text-slate-900 uppercase italic mr-2 text-[10px] tracking-widest">AI Intelligence:</span>
                                We've analyzed all your ventures. This project currently holds the <span className="text-emerald-600 font-bold">highest execution potential</span> based on market gaps and validation scores.
                            </p>
                        </motion.div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <button
                            onClick={onNewIdea}
                            className="flex items-center justify-center gap-3 p-8 bg-slate-50 hover:bg-slate-100 rounded-[2.5rem] text-slate-900 transition-all group/new"
                        >
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm group-hover/new:scale-110 transition-transform">
                                <Plus size={20} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest">Start New Idea</span>
                        </button>

                        <button
                            onClick={onViewAll}
                            className="flex items-center justify-center gap-3 p-8 bg-white border border-slate-100 hover:border-indigo-600 rounded-[2.5rem] text-slate-500 hover:text-indigo-600 transition-all group/all"
                        >
                            <div className="w-10 h-10 bg-slate-50 group-hover/all:bg-indigo-50 rounded-xl flex items-center justify-center transition-colors">
                                <Layout size={20} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest italic">View All Projects</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
