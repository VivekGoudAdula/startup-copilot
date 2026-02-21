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

import { OnboardingFlow } from './components/OnboardingFlow';
import { ResultsView } from './components/ResultsView';

import { doc, updateDoc, collection, addDoc, setDoc } from 'firebase/firestore';
import { db } from './lib/firebase';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ContinueDraftScreen } from './components/ContinueDraftScreen';
import { ProjectData } from './context/AuthContext';

function Dashboard() {
  const { user, profile, projects, refreshProfile } = useAuth();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [view, setView] = useState<'routing' | 'welcome' | 'continue_draft' | 'onboarding' | 'results' | 'history'>('routing');
  const [onboardingFocus, setOnboardingFocus] = useState<{ step?: any; flow?: any }>({});

  useEffect(() => {
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
  }, [profile, projects.length, user?.uid]);

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
          <motion.div key="history" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-6xl mx-auto px-6 py-20 space-y-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={() => setView('welcome')} className="p-4 hover:bg-slate-50 rounded-2xl transition-all">
                  <History size={24} className="rotate-180" />
                </button>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase leading-none">Journal</h1>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={() => setView('welcome')} className="text-xs font-black uppercase text-indigo-600 tracking-widest bg-slate-50 px-6 py-3 rounded-xl hover:bg-slate-100 transition-all">Back to Launchpad</button>
                <button
                  onClick={() => signOut(auth)}
                  className="px-6 py-3 bg-white border border-slate-100 hover:border-rose-100 hover:bg-rose-50/30 text-slate-400 hover:text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map(p => (
                <button key={p.id} onClick={() => handleContinueDashboard(p)} className="group p-10 bg-white border border-slate-100 hover:border-indigo-600 rounded-[3rem] text-left space-y-4 transition-all hover:shadow-2xl">
                  <h3 className="text-xl font-black italic uppercase group-hover:text-indigo-600 transition-colors">{p.name}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 normal-case leading-relaxed">{p.idea}</p>
                  <div className="flex items-center gap-4 pt-6 mt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Score</span>
                      <span className="text-xs font-black text-indigo-600">{p.validationScore}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-50" />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em]">Confidence</span>
                      <span className="text-xs font-black text-emerald-500">{p.executionConfidence}%</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFDFF]">
      <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
    </div>
  );
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};
