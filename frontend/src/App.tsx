/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Lightbulb, 
  Rocket, 
  Layout, 
  ChevronRight, 
  Sparkles, 
  ArrowRight,
  Info,
  Volume2,
  VolumeX,
  History,
  Trash2
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useNavigate
} from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { 
  LogOut,
  User as UserIcon
} from 'lucide-react';

import { 
  validateIdea, 
  generateRoadmap, 
  generateCopy,
  type ValidationResponse,
  type RoadmapResponse,
  type CopyResponse,
  type FocusType,
  type ToneType
} from './services/ai';
import { CatMascot } from './components/CatMascot';
import { IdeaValidation } from './components/IdeaValidation';
import { RoadmapGenerator } from './components/RoadmapGenerator';
import { CopyGenerator } from './components/CopyGenerator';
import { cn } from './lib/utils';

type Tab = 'validate' | 'roadmap' | 'copy';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('validate');
  const [idea, setIdea] = useState('');
  const [audience, setAudience] = useState('');
  const [competitors, setCompetitors] = useState('');
  const [focus, setFocus] = useState<FocusType>('saas');
  const [tone, setTone] = useState<ToneType>('bold');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [reaction, setReaction] = useState<'happy' | 'thinking' | 'surprised' | undefined>();
  const [soundEnabled, setSoundEnabled] = useState(false);

  const [validationResult, setValidationResult] = useState<ValidationResponse | null>(null);
  const [roadmapResult, setRoadmapResult] = useState<RoadmapResponse | null>(null);
  const [copyResult, setCopyResult] = useState<CopyResponse | null>(null);

  const [history, setHistory] = useState<{ id: string; idea: string; type: Tab; timestamp: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('startup_copilot_history');
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (type: Tab) => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      idea,
      type,
      timestamp: Date.now()
    };
    const updated = [newItem, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem('startup_copilot_history', JSON.stringify(updated));
  };

  const handleGenerate = async () => {
    if (!idea) return;
    
    if (soundEnabled) {
      const meow = new Audio('https://assets.mixkit.co/active_storage/sfx/951/951-preview.mp3');
      meow.play().catch(() => {});
    }

    setIsGenerating(true);
    setReaction('thinking');
    
    try {
      if (activeTab === 'validate') {
        const result = await validateIdea(idea, audience, competitors);
        setValidationResult(result);
        if (result.investability_score > 85) {
          setReaction('happy');
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#6366f1', '#10b981', '#f59e0b']
          });
        }
      } else if (activeTab === 'roadmap') {
        const result = await generateRoadmap(idea, focus);
        setRoadmapResult(result);
        setReaction('happy');
      } else if (activeTab === 'copy') {
        const result = await generateCopy(idea, audience, tone);
        setCopyResult(result);
        setReaction('happy');
      }
      saveToHistory(activeTab);
    } catch (error) {
      console.error(error);
      setReaction('surprised');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setReaction(undefined), 3000);
    }
  };

  const loadDemo = () => {
    setIdea("AI-powered student study planner that optimizes focus blocks");
    setAudience("College students struggling with procrastination");
    setTone("bold");
    setFocus("mobile");
  };

  const handleLogout = async () => {
    if (auth) {
      await signOut(auth);
    }
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/4 w-[50%] h-[50%] bg-indigo-100/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[40%] h-[40%] bg-purple-100/30 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="relative z-10 border-b border-slate-100 bg-white/70 backdrop-blur-2xl sticky top-0">
        <div className="max-w-7xl mx-auto px-8 h-24 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-200 group cursor-pointer" onClick={() => navigate('/')}>
              <Sparkles className="text-white group-hover:rotate-12 transition-transform" size={24} />
            </div>
            <div>
              <h1 className="font-black text-2xl tracking-tight text-slate-900">Startup Copilot</h1>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">AI Co-Founder</span>
                <div className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">v1.0</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-4 px-5 py-2.5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">
                <UserIcon size={16} className="text-indigo-600" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-slate-900 truncate max-w-[150px]">{user?.email?.split('@')[0]}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Pro Founder</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={cn(
                  "p-3 rounded-2xl transition-all shadow-sm border",
                  soundEnabled ? "bg-indigo-50 border-indigo-100 text-indigo-600" : "bg-white border-slate-100 text-slate-400 hover:text-slate-600"
                )}
                aria-label="Toggle sound"
              >
                {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button 
                onClick={handleLogout}
                className="p-3 bg-white border border-slate-100 rounded-2xl transition-all shadow-sm text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar Controls */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 space-y-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500" />
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
                    <Lightbulb size={12} className="text-indigo-500" />
                    The Vision
                  </label>
                  <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="What are we building today?"
                    className="w-full h-40 p-6 rounded-[2rem] bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 transition-all resize-none text-sm font-medium leading-relaxed"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Target Audience</label>
                  <input
                    type="text"
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="Who is this for?"
                    className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 transition-all text-sm font-medium"
                  />
                </div>

                {activeTab === 'validate' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Competitors</label>
                    <input
                      type="text"
                      value={competitors}
                      onChange={(e) => setCompetitors(e.target.value)}
                      placeholder="e.g. Uber, Airbnb"
                      className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white focus:ring-0 transition-all text-sm font-medium"
                    />
                  </div>
                )}

                {activeTab === 'roadmap' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Focus Type</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['web', 'mobile', 'saas'] as FocusType[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setFocus(t)}
                          className={cn(
                            "py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                            focus === t ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200" : "bg-white border-slate-100 text-slate-400 hover:border-indigo-100"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'copy' && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Tone of Voice</label>
                    <div className="grid grid-cols-3 gap-3">
                      {(['professional', 'bold', 'playful'] as ToneType[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => setTone(t)}
                          className={cn(
                            "py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border-2 transition-all",
                            tone === t ? "bg-indigo-600 border-indigo-600 text-white shadow-xl shadow-indigo-200" : "bg-white border-slate-100 text-slate-400 hover:border-indigo-100"
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !idea}
                className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-indigo-200 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 group"
              >
                {isGenerating ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Generate Insights
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* History Card */}
            <div className="bg-white p-10 rounded-[3.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                  <History size={14} className="text-indigo-500" />
                  Recent Ideas
                </h3>
                <button 
                  onClick={() => { setHistory([]); localStorage.removeItem('startup_copilot_history'); }}
                  className="p-2 hover:bg-rose-50 rounded-xl transition-colors text-slate-300 hover:text-rose-500"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-4">
                {history.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-xs text-slate-400 font-bold italic">No history yet...</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setIdea(item.idea); setActiveTab(item.type); }}
                      className="w-full text-left p-5 rounded-[1.5rem] bg-slate-50/50 border border-transparent hover:border-indigo-100 hover:bg-white transition-all group"
                    >
                      <p className="text-xs font-black text-slate-700 line-clamp-1 group-hover:text-indigo-600 transition-colors">{item.idea}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{item.type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-[9px] font-bold text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Tabs */}
            <nav className="flex p-2 bg-white rounded-[2rem] shadow-xl shadow-indigo-500/5 border border-slate-100 w-fit">
              <TabButton active={activeTab === 'validate'} onClick={() => setActiveTab('validate')} icon={<Lightbulb size={18} />} label="Validation" />
              <TabButton active={activeTab === 'roadmap'} onClick={() => setActiveTab('roadmap')} icon={<Rocket size={18} />} label="Roadmap" />
              <TabButton active={activeTab === 'copy'} onClick={() => setActiveTab('copy')} icon={<Layout size={18} />} label="Copywriting" />
            </nav>

            {/* Results Display */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + (isGenerating ? '-loading' : '-ready')}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="min-h-[600px]"
              >
                {!isGenerating && activeTab === 'validate' && validationResult && <IdeaValidation data={validationResult} />}
                {!isGenerating && activeTab === 'roadmap' && roadmapResult && <RoadmapGenerator data={roadmapResult} />}
                {!isGenerating && activeTab === 'copy' && copyResult && <CopyGenerator data={copyResult} />}

                {!isGenerating && !validationResult && !roadmapResult && !copyResult && (
                  <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-10 bg-white/40 rounded-[4rem] border-4 border-dashed border-indigo-100/50">
                    <motion.div 
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-32 h-32 bg-indigo-50 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-indigo-100"
                    >
                      <Sparkles className="text-indigo-600" size={56} />
                    </motion.div>
                    <div className="max-w-md px-8">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Ready to build?</h3>
                      <p className="text-slate-500 text-lg mt-4 font-medium leading-relaxed">
                        Enter your startup idea on the left and let your AI Co-Founder help you navigate the journey from zero to one.
                      </p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-10">
                    {/* The cat will be dancing in the middle via CatMascot overlay */}
                    <div className="space-y-4">
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">Consulting the Board...</h3>
                      <p className="text-slate-500 text-lg font-medium">Our AI cats are crunching market data and competitor insights.</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Info Footer */}
            <footer className="bg-slate-900 rounded-[3.5rem] p-10 text-white overflow-hidden relative shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                <div className="flex items-center gap-6">
                  <div className="p-4 bg-white/10 rounded-[1.5rem] backdrop-blur-md border border-white/10">
                    <Info size={32} className="text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="font-black text-xl">Hackathon Mode Active</h4>
                    <p className="text-slate-400 text-sm font-medium mt-1">Powered by Gemini 3.1 Pro & React 19</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
                    Vibe Log: 100% Optimized
                  </div>
                  <div className="px-6 py-3 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md border border-white/5">
                    Purr-formance: High
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <CatMascot isGenerating={isGenerating} reaction={reaction} soundEnabled={soundEnabled} />
    </div>
  );
}

const TabButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.1em] transition-all",
        active ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200" : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
      )}
    >
      {icon}
      {label}
    </button>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/signup" element={<AuthPage mode="signup" />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};
