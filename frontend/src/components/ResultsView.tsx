import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    validateIdea,
    generateRoadmap,
    generateCopy,
    type ValidationResponse,
    type RoadmapResponse,
    type CopyResponse
} from '../services/ai';
import { IdeaValidation } from './IdeaValidation';
import { RoadmapGenerator } from './RoadmapGenerator';
import { CopyGenerator } from './CopyGenerator';
import { CatMascot } from './CatMascot';
import { Sparkles, ArrowDown, Rocket, Layout, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResultsViewProps {
    idea: string;
    audience: string;
    competitors?: string;
    onReset: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ idea, audience, competitors, onReset }) => {
    const [isGenerating, setIsGenerating] = useState(true);
    const [currentStep, setCurrentStep] = useState<'validating' | 'roadmap' | 'copy' | 'complete'>('validating');

    const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null);
    const [roadmapResult, setRoadmapResult] = useState<RoadmapResponse | null>(null);
    const [copyResult, setCopyResult] = useState<CopyResponse | null>(null);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const runFlow = async () => {
            try {
                // Step 1: Validate
                setCurrentStep('validating');
                const vResult = await validateIdea(idea, audience, competitors);
                setValidationResult(vResult);

                // Wait a bit for dramatic effect
                await new Promise(r => setTimeout(r, 2000));

                // Step 2: Roadmap
                setCurrentStep('roadmap');
                const rResult = await generateRoadmap(idea, 'saas'); // Default to saas for now
                setRoadmapResult(rResult);

                await new Promise(r => setTimeout(r, 2000));

                // Step 3: Copy
                setCurrentStep('copy');
                const cResult = await generateCopy(idea, audience, 'bold');
                setCopyResult(cResult);

                await new Promise(r => setTimeout(r, 1000));
                setCurrentStep('complete');
                setIsGenerating(false);
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Something went wrong during generation');
                setIsGenerating(false);
            }
        };

        runFlow();
    }, [idea, audience, competitors]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 bg-[#FDFDFF]">
                <div className="bg-white p-12 rounded-[3.5rem] shadow-xl border border-rose-100 text-center space-y-6 max-w-md">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto">
                        <CheckCircle2 size={40} className="rotate-45" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Analysis Interrupted</h2>
                    <p className="text-slate-500 font-medium">{error}</p>
                    <button
                        onClick={onReset}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFF] pb-32">
            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-indigo-50/50 to-transparent" />
            </div>

            <header className="sticky top-0 z-[50] bg-white/80 backdrop-blur-xl border-b border-slate-100 px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img
                            src="/src/public/images/logo.png"
                            alt="Logo"
                            className="h-16 w-auto object-contain"
                        />
                        <div>
                            <h1 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] leading-none">STARTUP COPILOT</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Project Analysis</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onReset}
                            className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                        >
                            New Project
                        </button>
                        <button
                            onClick={() => {
                                import('firebase/auth').then(({ signOut }) => {
                                    import('../lib/firebase').then(({ auth }) => {
                                        if (auth) signOut(auth);
                                    });
                                });
                            }}
                            className="px-6 py-3 bg-white border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 text-slate-400 hover:text-rose-500 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-12 space-y-24">
                {/* Validation Section */}
                <AnimatePresence>
                    {validationResult && (
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-indigo-100">
                                    Step 1: Validation
                                </div>
                                <div className="h-px flex-grow bg-slate-100" />
                            </div>
                            <IdeaValidation data={validationResult} />
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Roadmap Section */}
                <AnimatePresence>
                    {roadmapResult && (
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="px-4 py-2 bg-violet-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-violet-100">
                                    Step 2: Strategic Roadmap
                                </div>
                                <div className="h-px flex-grow bg-slate-100" />
                            </div>
                            <RoadmapGenerator data={roadmapResult} />
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Copy Section */}
                <AnimatePresence>
                    {copyResult && (
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="space-y-8"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <div className="px-4 py-2 bg-emerald-600 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-100">
                                    Step 3: Launch Copy
                                </div>
                                <div className="h-px flex-grow bg-slate-100" />
                            </div>
                            <CopyGenerator data={copyResult} ideaName={idea.split(':')[0]} />
                        </motion.section>
                    )}
                </AnimatePresence>

                {isGenerating && (
                    <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                        <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em]">
                            {currentStep === 'validating' && "Analyzing Market Dynamics..."}
                            {currentStep === 'roadmap' && "Architecting Execution Strategy..."}
                            {currentStep === 'copy' && "Crafting Conversion Narrative..."}
                        </p>
                    </div>
                )}

                {!isGenerating && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                    >
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 size={40} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Full Strategy Complete! 🚀</h3>
                            <p className="text-slate-500 font-medium">Your AI Co-Founder has finished the initial marathon.</p>
                        </div>
                        <button
                            onClick={onReset}
                            className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                        >
                            Start New Project
                        </button>
                    </motion.div>
                )}
            </main>

            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="bg-white px-8 py-4 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 flex items-center gap-6"
                        >
                            <div className="flex items-center gap-3">
                                <div className={cn("w-3 h-3 rounded-full", currentStep === 'validating' ? "bg-indigo-600 animate-pulse" : "bg-emerald-500")} />
                                <span className={cn("text-[10px] font-black uppercase tracking-widest", currentStep === 'validating' ? "text-indigo-600" : "text-slate-400")}>Validate</span>
                            </div>
                            <div className="w-4 h-px bg-slate-100" />
                            <div className="flex items-center gap-3">
                                <div className={cn("w-3 h-3 rounded-full", currentStep === 'roadmap' ? "bg-violet-600 animate-pulse" : (roadmapResult ? "bg-emerald-500" : "bg-slate-200"))} />
                                <span className={cn("text-[10px] font-black uppercase tracking-widest", currentStep === 'roadmap' ? "text-violet-600" : "text-slate-400")}>Roadmap</span>
                            </div>
                            <div className="w-4 h-px bg-slate-100" />
                            <div className="flex items-center gap-3">
                                <div className={cn("w-3 h-3 rounded-full", currentStep === 'copy' ? "bg-emerald-600 animate-pulse" : (copyResult ? "bg-emerald-500" : "bg-slate-200"))} />
                                <span className={cn("text-[10px] font-black uppercase tracking-widest", currentStep === 'copy' ? "text-emerald-600" : "text-slate-400")}>Copy</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <CatMascot isGenerating={isGenerating} soundEnabled={true} />
        </div>
    );
};
