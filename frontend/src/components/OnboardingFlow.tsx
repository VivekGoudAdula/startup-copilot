import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    Lightbulb,
    Sparkles,
    ArrowRight,
    Search,
    Users,
    Building2,
    Cpu,
    Globe,
    Rocket,
    ChevronLeft,
    Wallet,
    BookOpen,
    HeartPulse,
    ShoppingBag,
    Layers
} from 'lucide-react';
import { cn } from '../lib/utils';
import { CatMascot } from './CatMascot';
import { AnimatedCat } from './AnimatedCat';
import { suggestIdeas, type SuggestedIdea } from '../services/ai';

interface OnboardingFlowProps {
    onComplete: (data: {
        idea: string;
        audience: string;
        competitors?: string;
        flow: 'have_idea' | 'help_create';
    }) => void;
    onBackToDashboard?: () => void;
    initialStep?: Step;
    initialFlow?: 'have_idea' | 'help_create' | null;
}

type Step = 'welcome' | 'idea_step1' | 'idea_step2' | 'idea_step3' | 'create_step1' | 'create_step2' | 'create_step3' | 'pick_idea';

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onBackToDashboard, initialStep = 'welcome', initialFlow = null }) => {
    const [step, setStep] = useState<Step>(initialStep);
    const [flow, setFlow] = useState<'have_idea' | 'help_create' | null>(initialFlow);

    // Form Data
    const [idea, setIdea] = useState('');
    const [audience, setAudience] = useState('');
    const [competitors, setCompetitors] = useState('');

    const [problem, setProblem] = useState('');
    const [industry, setIndustry] = useState('');
    const [productType, setProductType] = useState('');

    const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
    const [suggestedIdeas, setSuggestedIdeas] = useState<SuggestedIdea[]>([]);

    // Draft persistence
    React.useEffect(() => {
        if (idea || audience || problem || industry) {
            localStorage.setItem(`onboarding_draft_status`, 'true');
        }
    }, [idea, audience, problem, industry]);

    const handleNext = () => {
        if (step === 'welcome') {
            // logic handled by buttons
        } else if (step === 'idea_step1') setStep('idea_step2');
        else if (step === 'idea_step2') setStep('idea_step3');
        else if (step === 'idea_step3') {
            onComplete({ idea, audience, competitors, flow: 'have_idea' });
        }
        else if (step === 'create_step1') setStep('create_step2');
        else if (step === 'create_step2') setStep('create_step3');
        else if (step === 'create_step3') handleGenerateIdeas();
    };

    const handleBack = () => {
        if ((step === 'idea_step1' || step === 'create_step1') && onBackToDashboard) {
            onBackToDashboard();
            return;
        }
        if (step === 'idea_step1' || step === 'create_step1') setStep('welcome');
        else if (step === 'idea_step2') setStep('idea_step1');
        else if (step === 'idea_step3') setStep('idea_step2');
        else if (step === 'create_step2') setStep('create_step1');
        else if (step === 'create_step3') setStep('create_step2');
        else if (step === 'pick_idea') setStep('create_step3');
    };

    const handleGenerateIdeas = async () => {
        setIsGeneratingIdeas(true);
        try {
            const res = await suggestIdeas(problem, industry, productType);
            setSuggestedIdeas(res.ideas);
            setStep('pick_idea');
        } catch (err) {
            console.error(err);
        } finally {
            setIsGeneratingIdeas(false);
        }
    };

    const selectIdea = (item: SuggestedIdea) => {
        onComplete({
            idea: item.title + ": " + item.description,
            audience: item.audience,
            flow: 'help_create'
        });
    };

    const industries = [
        { id: 'fintech', label: 'Fintech', icon: <Wallet size={18} /> },
        { id: 'edtech', label: 'Edtech', icon: <BookOpen size={18} /> },
        { id: 'health', label: 'Health', icon: <HeartPulse size={18} /> },
        { id: 'ai', label: 'AI/ML', icon: <Cpu size={18} /> },
        { id: 'ecommerce', label: 'E-commerce', icon: <ShoppingBag size={18} /> },
        { id: 'saas', label: 'B2B SaaS', icon: <Building2 size={18} /> },
    ];

    const productTypes = [
        { id: 'saas', label: 'SaaS Platform', icon: <Layers size={18} /> },
        { id: 'marketplace', label: 'Marketplace', icon: <Globe size={18} /> },
        { id: 'mobile', label: 'Mobile App', icon: <Sparkles size={18} /> },
        { id: 'agent', label: 'AI Agent', icon: <Cpu size={18} /> },
    ];

    return (
        <div className="fixed inset-0 z-[100] bg-[#FDFDFF] flex items-center justify-center p-6 overflow-hidden uppercase italic">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-200/20 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-violet-200/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            <div className="absolute top-8 right-8 z-[110]">
                <button
                    onClick={() => {
                        import('firebase/auth').then(({ signOut }) => {
                            import('../lib/firebase').then(({ auth }) => {
                                if (auth) signOut(auth);
                            });
                        });
                    }}
                    className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 text-slate-400 hover:text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-100"
                >
                    Sign Out
                </button>
            </div>

            {!isGeneratingIdeas && (
                <div className="relative z-10 w-full max-w-5xl">
                    <AnimatePresence mode="wait">
                        {step === 'welcome' && (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.1, y: -40 }}
                                className="bg-white/80 backdrop-blur-3xl p-16 rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-white text-center space-y-12 max-w-2xl mx-auto relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />


                                <div className="space-y-6">
                                    <h1 className="text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                                        Hey Founder 👋<br />
                                        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Ready to build?</span>
                                    </h1>
                                    <p className="text-slate-500 text-xl font-medium max-w-sm mx-auto leading-relaxed not-italic normal-case">
                                        Your AI Co-Founder is locked in and ready to turn your vision into a venture.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                                    <button
                                        onClick={() => { setFlow('have_idea'); setStep('idea_step1'); }}
                                        className="group relative p-10 bg-white border border-slate-100 hover:border-indigo-600 rounded-[3rem] transition-all text-left space-y-4 hover:shadow-[0_30px_60px_rgba(79,70,229,0.15)] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6">
                                            <Lightbulb size={28} />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase italic group-hover:text-indigo-600 transition-colors">I Have an Idea</h3>
                                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1 not-italic normal-case">Refine Vision</p>
                                        </div>
                                    </button>

                                    <button
                                        onClick={() => { setFlow('help_create'); setStep('create_step1'); }}
                                        className="group relative p-10 bg-white border border-slate-100 hover:border-violet-600 rounded-[3rem] transition-all text-left space-y-4 hover:shadow-[0_30px_60px_rgba(139,92,246,0.15)] overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative z-10 w-14 h-14 bg-violet-50 rounded-2xl flex items-center justify-center text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all transform group-hover:scale-110 group-hover:rotate-6">
                                            <Sparkles size={28} />
                                        </div>
                                        <div className="relative z-10">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase italic group-hover:text-violet-600 transition-colors">Help Me Create</h3>
                                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1 not-italic normal-case">AI Ideation</p>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {/* FLOW A: I HAVE AN IDEA */}
                        {step === 'idea_step1' && (
                            <StepContainer
                                title="What’s your startup idea?"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={idea.length > 5}
                                progress={33}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.6rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                                    <textarea
                                        autoFocus
                                        value={idea}
                                        onChange={(e) => setIdea(e.target.value)}
                                        placeholder="e.g. A marketplace for local artisanal coffee beans..."
                                        className="relative w-full h-48 p-10 rounded-[2.5rem] bg-white border-2 border-slate-50 focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all resize-none text-2xl font-bold leading-relaxed text-slate-900 placeholder:text-slate-200 not-italic normal-case"
                                    />
                                </div>
                            </StepContainer>
                        )}

                        {step === 'idea_step2' && (
                            <StepContainer
                                title="Who is this for?"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={audience.length > 3}
                                progress={66}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.1rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                                    <div className="relative">
                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-500 transition-colors">
                                            <Users size={32} />
                                        </div>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={audience}
                                            onChange={(e) => setAudience(e.target.value)}
                                            placeholder="e.g. Coffee enthusiasts..."
                                            className="w-full p-10 pl-20 rounded-[2rem] bg-white border-2 border-slate-50 focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all text-2xl font-bold text-slate-900 placeholder:text-slate-200 not-italic normal-case"
                                        />
                                    </div>
                                </div>
                            </StepContainer>
                        )}

                        {step === 'idea_step3' && (
                            <StepContainer
                                title="Do you know competitors?"
                                subtitle="(Optional but helpful)"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={true}
                                nextLabel="Analyze Now"
                                progress={100}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-[2.1rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                                    <div className="relative">
                                        <div className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-indigo-500 transition-colors">
                                            <Search size={32} />
                                        </div>
                                        <input
                                            autoFocus
                                            type="text"
                                            value={competitors}
                                            onChange={(e) => setCompetitors(e.target.value)}
                                            placeholder="e.g. Starbucks, Airbnb"
                                            className="w-full p-10 pl-20 rounded-[2rem] bg-white border-2 border-slate-50 focus:border-indigo-100 focus:bg-white focus:ring-4 focus:ring-indigo-50 transition-all text-2xl font-bold text-slate-900 placeholder:text-slate-200 not-italic normal-case"
                                        />
                                    </div>
                                </div>
                            </StepContainer>
                        )}

                        {/* FLOW B: HELP ME CREATE ONE */}
                        {step === 'create_step1' && (
                            <StepContainer
                                title="What problem do you care about solving?"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={problem.length > 5}
                                progress={25}
                            >
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-[2.6rem] blur opacity-20 group-focus-within:opacity-40 transition duration-500" />
                                    <textarea
                                        autoFocus
                                        value={problem}
                                        onChange={(e) => setProblem(e.target.value)}
                                        placeholder="e.g. Reducing food waste in households..."
                                        className="relative w-full h-48 p-10 rounded-[2.5rem] bg-white border-2 border-slate-50 focus:border-violet-100 focus:bg-white focus:ring-4 focus:ring-violet-50 transition-all resize-none text-2xl font-bold leading-relaxed text-slate-900 placeholder:text-slate-200 not-italic normal-case"
                                    />
                                </div>
                            </StepContainer>
                        )}

                        {step === 'create_step2' && (
                            <StepContainer
                                title="What industry?"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={industry !== ''}
                                progress={50}
                            >
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                                    {industries.map((ind) => (
                                        <button
                                            key={ind.id}
                                            onClick={() => setIndustry(ind.id)}
                                            className={cn(
                                                "p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 relative overflow-hidden group/btn",
                                                industry === ind.id
                                                    ? "bg-violet-600 border-violet-600 text-white shadow-[0_20px_40px_rgba(139,92,246,0.3)]"
                                                    : "bg-white border-slate-50 text-slate-500 hover:border-violet-100 hover:bg-violet-50/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center transition-all group-hover/btn:scale-110",
                                                industry === ind.id ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400 group-hover/btn:bg-white group-hover/btn:text-violet-600"
                                            )}>
                                                {ind.icon}
                                            </div>
                                            <span className="text-xs font-black uppercase tracking-[0.2em]">{ind.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </StepContainer>
                        )}

                        {step === 'create_step3' && (
                            <StepContainer
                                title="What type of product?"
                                onBack={handleBack}
                                onNext={handleNext}
                                canNext={productType !== ''}
                                nextLabel="Generate Ideas"
                                progress={75}
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    {productTypes.map((pt) => (
                                        <button
                                            key={pt.id}
                                            onClick={() => setProductType(pt.id)}
                                            className={cn(
                                                "p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 group/pt relative overflow-hidden",
                                                productType === pt.id
                                                    ? "bg-violet-600 border-violet-600 text-white shadow-[0_20px_40px_rgba(139,92,246,0.3)]"
                                                    : "bg-white border-slate-50 text-slate-500 hover:border-violet-100 hover:bg-violet-50/30"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-16 h-16 rounded-2xl flex items-center justify-center transition-all group-hover/pt:scale-110",
                                                productType === pt.id ? "bg-white/20 text-white" : "bg-slate-50 text-slate-400 group-hover/pt:bg-white group-hover/pt:text-violet-600"
                                            )}>
                                                {pt.icon}
                                            </div>
                                            <span className="text-sm font-black uppercase tracking-[0.2em]">{pt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </StepContainer>
                        )}

                        {step === 'pick_idea' && (
                            <motion.div
                                key="pick_idea"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12 w-full max-w-6xl mx-auto"
                            >
                                <div className="text-center space-y-4">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        className="inline-block px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-2"
                                    >
                                        AI Suggested Concepts
                                    </motion.div>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tight not-italic">Pick an idea to refine</h2>
                                    <p className="text-slate-400 font-medium text-lg not-italic normal-case">Hover to see unique advantages.</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {suggestedIdeas.map((item, idx) => (
                                        <motion.button
                                            key={idx}
                                            whileHover={{ y: -12, scale: 1.02 }}
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            onClick={() => selectIdea(item)}
                                            className="group p-10 bg-white border border-slate-100 hover:border-indigo-600 rounded-[4rem] transition-all text-left flex flex-col h-full hover:shadow-[0_40px_80px_rgba(79,70,229,0.12)] relative overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                                <Sparkles size={120} />
                                            </div>

                                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:rotate-12">
                                                {idx === 0 ? <Rocket size={28} /> : idx === 1 ? <Globe size={28} /> : <Cpu size={28} />}
                                            </div>

                                            <h3 className="text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-indigo-600 transition-colors uppercase italic tracking-tighter">{item.title}</h3>
                                            <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 flex-grow not-italic normal-case">{item.description}</p>

                                            <div className="pt-8 border-t border-slate-50 mt-auto relative">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <div className="w-2 h-2 rounded-full bg-emerald-400 group-hover:animate-ping" />
                                                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] block">Unique Advantage</span>
                                                </div>
                                                <p className="text-sm font-bold text-slate-700 leading-relaxed italic">"{item.unique_value_proposition}"</p>
                                            </div>

                                            <div className="mt-8 flex items-center justify-between">
                                                <div className="px-4 py-2 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-xl text-[10px] font-black transition-colors uppercase tracking-widest not-italic">
                                                    Refine Now
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="flex justify-center pt-8">
                                    <button
                                        onClick={handleBack}
                                        className="group px-8 py-4 text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-[0.2em] flex items-center gap-3 transition-all not-italic"
                                    >
                                        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Regenerate Options
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {/* Cinematic Loading for Idea Suggestion */}
            <CatMascot isGenerating={isGeneratingIdeas} soundEnabled={true} />
        </div>
    );
};

interface StepContainerProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    onBack: () => void;
    onNext: () => void;
    canNext: boolean;
    nextLabel?: string;
    progress: number;
}

const StepContainer: React.FC<StepContainerProps> = ({
    title,
    subtitle,
    children,
    onBack,
    onNext,
    canNext,
    nextLabel = "Next",
    progress
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white p-12 rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.07)] border border-slate-100 space-y-10 relative overflow-hidden"
        >
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-slate-50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-indigo-600"
                />
            </div>

            <div className="flex items-center justify-between">
                <button onClick={onBack} className="p-4 hover:bg-slate-50 rounded-2xl transition-colors text-slate-400">
                    <ChevronLeft size={24} />
                </button>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                    Co-Founder Step {progress === 100 ? 'Final' : Math.ceil(progress / 25)}
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">{title}</h2>
                {subtitle && <p className="text-slate-400 font-medium">{subtitle}</p>}
            </div>

            <div className="py-2">
                {children}
            </div>

            <div className="flex justify-end pt-4">
                <motion.button
                    disabled={!canNext}
                    onClick={onNext}
                    whileHover={{ scale: canNext ? 1.02 : 1 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                        "px-10 py-6 rounded-[2rem] font-black text-lg flex items-center gap-3 transition-all",
                        canNext
                            ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 hover:shadow-indigo-300"
                            : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    )}
                >
                    {nextLabel}
                    <ArrowRight size={20} />
                </motion.button>
            </div>
        </motion.div>
    );
};
