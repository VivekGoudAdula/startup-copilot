import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Users, 
  BarChart3, 
  Rocket, 
  CheckCircle2,
  Github,
  Cat
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles className="text-white" size={20} />
            </div>
            <span className="font-black text-xl tracking-tight">Startup Copilot</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">Login</Link>
            <Link to="/signup" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100"
              >
                <Sparkles size={14} />
                The #1 AI Co-Founder for Hackathons
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-7xl font-black tracking-tight leading-[1.1]"
              >
                Idea to Execution <br />
                <span className="text-indigo-600">in Minutes.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-500 leading-relaxed max-w-lg"
              >
                Validate market potential, generate MVP roadmaps, and craft high-converting copy with your AI co-founder.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group">
                  Get Your AI Co-Founder
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#features" className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                  See Features
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="relative"
            >
              <div className="relative z-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-indigo-50">
                <div className="aspect-square bg-indigo-50 rounded-[2rem] flex items-center justify-center overflow-hidden relative group">
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Cat size={180} className="text-indigo-600" />
                  </motion.div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-xl border border-indigo-100 flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm font-bold text-slate-700">AI Co-Founder Online</span>
                  </div>
                </div>
              </div>
              {/* Decorative blobs */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-200/30 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-200/30 blur-3xl rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">Founding is Hard.</h2>
            <p className="text-slate-500 text-lg">Most startups fail before they even start because of these 3 common struggles.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ProblemCard 
              icon={<Users className="text-rose-500" />}
              title="Market Blindness"
              description="Not knowing if anyone actually wants what you're building until it's too late."
            />
            <ProblemCard 
              icon={<BarChart3 className="text-amber-500" />}
              title="Roadmap Paralysis"
              description="Getting stuck in the 'what to build first' loop instead of shipping value."
            />
            <ProblemCard 
              icon={<Zap className="text-indigo-500" />}
              title="Weak Messaging"
              description="Having a great product but failing to explain why it matters to your users."
            />
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-black tracking-tight">The Ultimate Founder Toolkit.</h2>
                <p className="text-slate-500 text-lg">Startup Copilot gives you the data and clarity you need to move fast and win.</p>
              </div>
              
              <div className="space-y-8">
                <FeatureItem 
                  title="Idea Validation" 
                  desc="Get a critical VC-mindset score and SWOT analysis for your vision."
                />
                <FeatureItem 
                  title="MVP Roadmaps" 
                  desc="Actionable 3-month plans that tell you exactly what to ship and when."
                />
                <FeatureItem 
                  title="Copy Generation" 
                  desc="High-converting landing page copy that speaks directly to your audience."
                />
              </div>
            </div>

            <div className="relative">
              <div className="bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border-8 border-slate-800 aspect-video overflow-hidden">
                <div className="bg-white h-full w-full rounded-[1.5rem] p-6 space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                      <div className="w-3 h-3 rounded-full bg-slate-200" />
                    </div>
                    <div className="w-32 h-4 bg-slate-100 rounded-full" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="w-full h-24 bg-indigo-50 rounded-2xl" />
                      <div className="w-full h-4 bg-slate-100 rounded-full" />
                      <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-24 bg-purple-50 rounded-2xl" />
                      <div className="w-full h-4 bg-slate-100 rounded-full" />
                      <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-indigo-50 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Validation Score</p>
                  <p className="text-lg font-black text-slate-900">92/100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tight">How It Works</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <Step number="01" title="Enter Your Idea" desc="Describe your vision and who you're building for in plain English." />
            <Step number="02" title="AI Validates" desc="Our AI cats crunch market data and competitor insights in seconds." />
            <Step number="03" title="Ship Confidently" desc="Get your roadmap and copy, and start building your future." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-5xl font-black tracking-tight">Ready to build your dream?</h2>
          <p className="text-slate-500 text-xl">Join founders who are moving faster with Startup Copilot.</p>
          <Link to="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-xl shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition-all active:scale-95">
            Get Your AI Co-Founder
            <ArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="text-white" size={16} />
            </div>
            <span className="font-black text-lg">Startup Copilot</span>
          </div>
          
          <div className="flex items-center gap-8 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">
              <Github size={18} />
              GitHub
            </a>
            <span>Hackathon 2026</span>
            <span>Built with ❤️ for Founders</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const ProblemCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4"
  >
    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </motion.div>
);

const FeatureItem = ({ title, desc }: { title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <CheckCircle2 className="text-indigo-600" size={24} />
    </div>
    <div>
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-slate-500">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="space-y-4 relative">
    <span className="text-6xl font-black text-white/10 absolute -top-8 -left-4">{number}</span>
    <h3 className="text-2xl font-bold relative z-10">{title}</h3>
    <p className="text-indigo-100 leading-relaxed relative z-10">{desc}</p>
  </div>
);
