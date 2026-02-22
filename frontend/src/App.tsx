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
  Volume2,
  VolumeX,
  Plus,
  Search,
  ArrowUpRight,
  TrendingUp,
  Target,
  ArrowLeft,
  LogOut,
  User as UserIcon,
  History,
  Trash2,
  AlertCircle
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
import { auth, db } from './lib/firebase';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

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

import { OnboardingFlow } from './components/OnboardingFlow';
import { ResultsView } from './components/ResultsView';

import { doc, updateDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ContinueDraftScreen } from './components/ContinueDraftScreen';
import { ProjectData } from './context/AuthContext';
import NeonGradient from './components/NeonGradient';
import { InteractiveGrid } from './components/InteractiveGrid';

function Dashboard() {
  const { user, profile, projects, refreshProfile, servicesReady } = useAuth();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [view, setView] = useState<'routing' | 'welcome' | 'continue_draft' | 'onboarding' | 'results' | 'history' | 'error'>('routing');
  const [onboardingFocus, setOnboardingFocus] = useState<{ step?: any; flow?: any }>({});

  useEffect(() => {
    if (!servicesReady) {
      setView('error');
      return;
    }
    if (!profile) return;

    if (projects.length > 0) {
      setView('welcome');
    } else if (profile.onboardingComplete) {
      setView('welcome');
    } else {
      const hasStarted = localStorage.getItem(`onboarding_draft_status`);
      if (hasStarted) {
        setView('continue_draft');
      } else {
        setView('onboarding');
      }
    }
  }, [profile, projects.length, user?.uid, servicesReady]);

  const handleOnboardingComplete = async (data: any) => {
    if (!user || !db) return;

    // Save to Firestore
    const projectRef = await addDoc(collection(db, 'users', user.uid, 'projects'), {
      name: data.idea.split(':')[0] || 'My Stealth Startup',
      idea: data.idea,
      audience: data.audience,
      competitors: data.competitors || '',
      validationScore: Math.floor(Math.random() * 20) + 70,
      executionConfidence: Math.floor(Math.random() * 15) + 75,
      lastUpdated: Date.now()
    });

    // Update profile
    await updateDoc(doc(db, 'users', user.uid), {
      onboardingComplete: true,
      lastActiveProjectId: projectRef.id
    });

    localStorage.removeItem(`onboarding_draft_status`);
    await refreshProfile();

    setSelectedProject({
      id: projectRef.id,
      name: data.idea.split(':')[0] || 'My Stealth Startup',
      idea: data.idea,
      audience: data.audience,
      competitors: data.competitors || '',
      validationScore: 80,
      executionConfidence: 82,
      lastUpdated: Date.now()
    });
    setView('results');
  };

  const handleStartNew = () => {
    setOnboardingFocus({ step: 'welcome', flow: null });
    setView('onboarding');
  };

  const handleContinueDashboard = (project: ProjectData) => {
    setSelectedProject(project);
    setView('results');
  };

  const handleViewAll = () => setView('history');

  if (view === 'routing') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">
        <CatMascot isGenerating={true} soundEnabled={true} />
      </div>
    );
  }

  if (view === 'error') {
    return <FallbackUI />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] overflow-x-hidden relative">
      {/* Persistent Logout Button for Full-Screen Cards */}
      {(view === 'welcome' || view === 'continue_draft') && (
        <div className="fixed top-8 right-8 z-[100]">
          <button
            onClick={() => signOut(auth)}
            className="group flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 text-slate-400 hover:text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-slate-100"
          >
            <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> Sign Out
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {view === 'welcome' && projects.length > 0 && (() => {
          const bestProject = [...projects].sort((a, b) => (b.validationScore + b.executionConfidence) - (a.validationScore + a.executionConfidence))[0];
          return (
            <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <WelcomeScreen
                userName={user?.displayName || user?.email?.split('@')[0] || 'Founder'}
                project={bestProject}
                onContinue={handleContinueDashboard}
                onNewIdea={handleStartNew}
                onViewAll={handleViewAll}
                isBestProject={projects.length > 1}
              />
            </motion.div>
          );
        })()}

        {view === 'welcome' && projects.length === 0 && (
          <motion.div key="no-projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContinueDraftScreen
              onContinue={() => setView('onboarding')}
              onNewIdea={handleStartNew}
              onExplore={() => {
                setOnboardingFocus({ step: 'create_step1', flow: 'help_create' });
                setView('onboarding');
              }}
            />
          </motion.div>
        )}

        {view === 'continue_draft' && (
          <motion.div key="draft" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ContinueDraftScreen
              onContinue={() => setView('onboarding')}
              onNewIdea={handleStartNew}
              onExplore={() => {
                setOnboardingFocus({ step: 'create_step1', flow: 'help_create' });
                setView('onboarding');
              }}
            />
          </motion.div>
        )}

        {view === 'onboarding' && (
          <motion.div key="onboarding" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <OnboardingFlow
              onComplete={handleOnboardingComplete}
              onBackToDashboard={() => setView(projects.length > 0 ? 'welcome' : 'routing')}
              initialStep={onboardingFocus.step}
              initialFlow={onboardingFocus.flow}
            />
          </motion.div>
        )}

        {view === 'results' && selectedProject && (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ResultsView
              idea={selectedProject.idea}
              audience={selectedProject.audience}
              competitors={selectedProject.competitors}
              onReset={() => setView('welcome')}
            />
          </motion.div>
        )}

        {view === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-[#F8FAFC] relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0 pointer-events-none">
              <InteractiveGrid />
            </div>
            {/* Editorial Header */}
            <div className="bg-white border-b border-slate-100 sticky top-0 z-[60] backdrop-blur-xl bg-white/80">
              <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setView('welcome')}
                    className="p-3 hover:bg-slate-50 rounded-2xl transition-all text-slate-400 hover:text-indigo-600"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <div className="h-8 w-px bg-slate-100" />
                  <div>
                    <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                      Project Journal <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[10px] rounded-lg border border-indigo-100">{projects.length}</span>
                    </h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Your startup archives</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={handleStartNew}
                    className="hidden md:flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                  >
                    <Plus size={16} /> New Vision
                  </button>
                  <button
                    onClick={() => signOut(auth)}
                    className="p-3 bg-white border border-slate-100 hover:border-rose-100 text-slate-400 hover:text-rose-500 rounded-2xl transition-all shadow-sm"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
              {projects.length === 0 ? (
                <div className="py-32 flex flex-col items-center text-center space-y-6">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-300">
                    <History size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Journal is Empty</h3>
                    <p className="text-slate-500 font-medium max-w-sm mt-2">You haven't archived any startup visions yet. Start a new analysis to see them here.</p>
                  </div>
                  <button
                    onClick={handleStartNew}
                    className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100"
                  >
                    Launch First Idea
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((p, idx) => {
                    const themes = [
                      { colors: "from-indigo-500 via-purple-500 to-pink-500", accent: "indigo" },
                      { colors: "from-emerald-500 via-teal-500 to-cyan-500", accent: "emerald" },
                      { colors: "from-orange-500 via-amber-500 to-red-500", accent: "orange" },
                      { colors: "from-blue-500 via-indigo-500 to-violet-500", accent: "blue" },
                      { colors: "from-fuchsia-500 via-pink-500 to-rose-500", accent: "fuchsia" }
                    ];
                    const theme = themes[idx % themes.length];
                    const accent = theme.accent;

                    const colorMap: Record<string, string> = {
                      indigo: "text-indigo-600 group-hover:text-indigo-600 text-indigo-400 bg-indigo-50/40 group-hover:bg-indigo-100/60 bg-indigo-400 bg-indigo-600",
                      emerald: "text-emerald-600 group-hover:text-emerald-600 text-emerald-400 bg-emerald-50/40 group-hover:bg-emerald-100/60 bg-emerald-400 bg-emerald-600",
                      orange: "text-orange-600 group-hover:text-orange-600 text-orange-400 bg-orange-50/40 group-hover:bg-orange-100/60 bg-orange-400 bg-orange-600",
                      blue: "text-blue-600 group-hover:text-blue-600 text-blue-400 bg-blue-50/40 group-hover:bg-blue-100/60 bg-blue-400 bg-blue-600",
                      fuchsia: "text-fuchsia-600 group-hover:text-fuchsia-600 text-fuchsia-400 bg-fuchsia-50/40 group-hover:bg-fuchsia-100/60 bg-fuchsia-400 bg-fuchsia-600",
                    };
                    // Dummy variables to force tailwind to include these classes in build
                    // text-indigo-600 text-indigo-400 bg-indigo-400 bg-indigo-600 bg-indigo-50/40 bg-indigo-100/60
                    // text-emerald-600 text-emerald-400 bg-emerald-400 bg-emerald-600 bg-emerald-50/40 bg-emerald-100/60
                    // text-orange-600 text-orange-400 bg-orange-400 bg-orange-600 bg-orange-50/40 bg-orange-100/60
                    // text-blue-600 text-blue-400 bg-blue-400 bg-blue-600 bg-blue-50/40 bg-blue-100/60
                    // text-fuchsia-600 text-fuchsia-400 bg-fuchsia-400 bg-fuchsia-600 bg-fuchsia-50/40 bg-fuchsia-100/60

                    const accentBase = accent === 'indigo' ? 'text-indigo-600' : accent === 'emerald' ? 'text-emerald-600' : accent === 'orange' ? 'text-orange-600' : accent === 'blue' ? 'text-blue-600' : 'text-fuchsia-600';
                    const accentHover = accent === 'indigo' ? 'group-hover:text-indigo-700' : accent === 'emerald' ? 'group-hover:text-emerald-700' : accent === 'orange' ? 'group-hover:text-orange-700' : accent === 'blue' ? 'group-hover:text-blue-700' : 'group-hover:text-fuchsia-700';
                    const accentBg = accent === 'indigo' ? 'bg-indigo-400' : accent === 'emerald' ? 'bg-emerald-400' : accent === 'orange' ? 'bg-orange-400' : accent === 'blue' ? 'bg-blue-400' : 'bg-fuchsia-400';
                    const accentIconBg = accent === 'indigo' ? 'group-hover:bg-indigo-600' : accent === 'emerald' ? 'group-hover:bg-emerald-600' : accent === 'orange' ? 'group-hover:bg-orange-600' : accent === 'blue' ? 'group-hover:bg-blue-600' : 'group-hover:bg-fuchsia-600';

                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <NeonGradient
                          colors={theme.colors}
                          padding="p-[1px]"
                          blurSize="blur-xl"
                          className="h-full"
                        >
                          <button
                            onClick={() => handleContinueDashboard(p)}
                            className="group w-full p-8 bg-white rounded-[2.5rem] text-left transition-all relative overflow-hidden flex flex-col h-full"
                          >
                            <div className="flex justify-between items-start mb-6 w-full relative z-10">
                              <div className="flex gap-1.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${accentBg} shadow-sm`} />
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                              </div>
                              <div className="px-3 py-1 bg-slate-50 rounded-full border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                                  {new Date(p.lastUpdated).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="space-y-3 flex-grow relative z-10">
                              <h3 className={`text-2xl font-black italic uppercase ${accentBase} ${accentHover} transition-colors tracking-tight line-clamp-1`}>
                                {p.name}
                              </h3>
                              <p className="text-slate-600 text-sm line-clamp-4 normal-case leading-relaxed font-medium">
                                {p.idea.includes(':') ? p.idea.split(':')[1].trim() : p.idea}
                              </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between w-full relative z-10">
                              <div className="flex items-center gap-6">
                                <div className="space-y-1">
                                  <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                    <Target size={10} className="text-slate-300" /> Score
                                  </span>
                                  <div className="flex items-baseline gap-0.5">
                                    <span className={`text-2xl font-black ${accentBase}`}>{p.validationScore || 0}</span>
                                    <span className="text-[10px] font-bold text-slate-300">/100</span>
                                  </div>
                                </div>
                                <div className="w-px h-8 bg-slate-100" />
                                <div className="space-y-1">
                                  <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-300 uppercase tracking-widest">
                                    <TrendingUp size={10} className="text-slate-300" /> Conf.
                                  </span>
                                  <span className="text-2xl font-black text-emerald-500 block">{p.executionConfidence || 0}%</span>
                                </div>
                              </div>

                              <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 ${accentIconBg} group-hover:text-white transition-all transform group-hover:rotate-12 group-hover:scale-110 shadow-sm`}>
                                <ArrowUpRight size={20} />
                              </div>
                            </div>
                          </button>
                        </NeonGradient>
                      </motion.div>
                    );
                  })}

                  {/* New Vision Card */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: projects.length * 0.05 }}
                    onClick={handleStartNew}
                    className="group p-8 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-slate-50/50 rounded-[3rem] transition-all flex flex-col items-center justify-center text-center space-y-4 min-h-[320px]"
                  >
                    <div className="w-16 h-16 rounded-[2rem] bg-slate-100 text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all flex items-center justify-center">
                      <Plus size={32} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 uppercase">New Vision</h4>
                      <p className="text-xs text-slate-400 font-medium mt-1">Ready for the next unicorn?</p>
                    </div>
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FallbackUI() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF] p-8">
      <div className="max-w-md w-full bg-white p-12 rounded-[3.5rem] shadow-xl border border-rose-100 text-center space-y-6">
        <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-500 mx-auto">
          <AlertCircle size={40} />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Connection Interrupted</h2>
        <p className="text-slate-500 font-medium">
          We couldn't initialize our database connection. This usually happens when an ad-blocker or firewall blocks Firebase, or there's a configuration error.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}

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
                <DashboardContainer />
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
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

function DashboardContainer() {
  const { user, profile, servicesReady } = useAuth();

  if (user && !profile && !servicesReady) {
    return <FallbackUI />;
  }

  return <Dashboard />;
}