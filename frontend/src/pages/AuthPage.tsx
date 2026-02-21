import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AlertCircle, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';

// Icons 
const ShieldIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const AtSignIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle>
    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
  </svg>
);

const LockIconUser: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <circle cx="12" cy="16" r="1"></circle>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const GoogleIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!auth) {
      setError('Firebase is not configured. Please add your Firebase API keys to the environment variables.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (fullName) {
          await updateProfile(userCredential.user, { displayName: fullName });
        }
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'An error occurred during authentication');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    setError('');
    if (!auth) {
      setError('Firebase is not configured. Please add your Firebase API keys to the environment variables.');
      return;
    }

    setLoading(true);
    try {
      const authProvider = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      await signInWithPopup(auth, authProvider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || `An error occurred during ${provider} login`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-accent/5 via-slate-100 to-white relative overflow-hidden items-center justify-center p-12 border-r border-slate-100">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full -z-0" />

        <div className="relative z-10 flex flex-col justify-center items-center text-black">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center mb-8 border border-slate-100 shadow-xl"
          >
            <ShieldIcon />
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-display font-black mb-6 text-center italic tracking-tight text-black"
          >
            {mode === 'login' ? 'Secure Access' : 'Launch Journey'}
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-center text-black max-w-md leading-relaxed font-bold"
          >
            {mode === 'login'
              ? 'Your trusted platform for secure authentication and seamless user experience.'
              : 'Join thousands of founders building the future with AI-powered insights.'}
          </motion.p>
          <div className="mt-16 grid grid-cols-3 gap-6 opacity-20">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-accent rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-slate-50">
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 lg:hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-purple-100/10 blur-[100px] rounded-full" />
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-[3.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-10 space-y-8 border border-slate-100">
            {/* Header */}
            <div className="text-center group">
              <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20 text-accent group-hover:scale-110 transition-transform duration-500">
                <ShieldIcon />
              </div>
              <h2 className="text-4xl font-display font-black italic tracking-tight mb-2">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-slate-800 to-black">
                  {mode === 'login' ? 'Sign in' : 'Create Account'}
                </span>
              </h2>
              <p className="mt-2 text-black font-black flex items-center justify-center gap-2">
                <Sparkles size={14} className="text-accent" />
                {mode === 'login' ? 'Access your secure account' : 'Start your founder journey today.'}
              </p>
            </div>

            {/* Error Alert */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 text-sm font-medium shadow-sm"
                >
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSocialLogin('google')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all font-black text-sm text-black shadow-sm disabled:opacity-50 hover:scale-[1.02] active:scale-95"
              >
                <GoogleIcon />
                Google
              </button>
              <button
                onClick={() => handleSocialLogin('github')}
                disabled={loading}
                className="flex items-center justify-center gap-2 py-4 rounded-[1.5rem] bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all font-black text-sm text-black shadow-sm disabled:opacity-50 hover:scale-[1.02] active:scale-95"
              >
                <GitHubIcon />
                GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-black font-black uppercase tracking-widest text-[10px]">Or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Input (Signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-[10px] font-black text-black uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
                      <UserIcon />
                    </div>
                    <input
                      id="fullName"
                      type="text"
                      required={mode === 'signup'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-black placeholder-slate-500 transition-all font-black text-sm outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-black text-black uppercase tracking-widest ml-1">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
                    <AtSignIcon />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="block w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-black placeholder-slate-500 transition-all font-black text-sm outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-[10px] font-black text-black uppercase tracking-widest ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black">
                    <LockIconUser />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="block w-full pl-12 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:border-accent/40 focus:ring-4 focus:ring-accent/5 text-black placeholder-slate-500 transition-all font-black text-sm outline-none"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-black hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot / Terms checkbox */}
              {mode === 'login' ? (
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 border-slate-300 rounded text-black focus:ring-black"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-xs font-black text-black uppercase tracking-widest cursor-pointer">
                      Keep me signed in
                    </label>
                  </div>
                  <a href="#" className="text-xs font-black text-black hover:underline transition-colors uppercase tracking-widest">
                    Reset
                  </a>
                </div>
              ) : (
                <div className="flex items-start space-x-3 px-1">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 border-slate-300 rounded text-black focus:ring-black"
                  />
                  <label htmlFor="terms" className="text-xs text-black leading-tight font-black">
                    I agree to the <span className="text-black font-black hover:underline cursor-pointer">Terms of Service</span> and <span className="text-black font-black hover:underline cursor-pointer">Privacy Policy</span>
                  </label>
                </div>
              )}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-white font-black py-5 px-4 rounded-[2rem] hover:bg-accent/90 transition-all active:scale-95 shadow-xl shadow-accent/20 flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {mode === 'login' ? 'Proceed to Deck' : 'Launch Account'}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Footer / Alternate Mode Navigator */}
            <div className="text-center pt-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-block p-1 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm"
              >
                <Link
                  to={mode === 'login' ? '/signup' : '/login'}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 transition-all group"
                >
                  <span className="text-xs font-black text-black uppercase tracking-widest">
                    {mode === 'login' ? "New to the board?" : "Already a founder?"}
                  </span>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent text-white">
                    <span className="text-xs font-black uppercase tracking-tight">
                      {mode === 'login' ? 'Create an account' : 'Sign in'}
                    </span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>

              {/* Visual Hint */}
              <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">
                Join the Elite Board Today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
