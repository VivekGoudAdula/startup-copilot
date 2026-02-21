import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    User,
    ChevronRight,
    AlertCircle,
    Github,
    Chrome,
    ArrowLeft
} from 'lucide-react';
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { CopilotCat } from './CopilotCat';

interface AuthLayoutProps {
    initialMode?: 'login' | 'signup';
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ initialMode = 'login' }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const isLogin = mode === 'login';

    // Social Auth Handlers
    const handleSocialLogin = async (providerName: 'google' | 'github') => {
        if (!auth) {
            setError('Authentication is not configured.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const provider = providerName === 'google'
                ? new GoogleAuthProvider()
                : new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || `Failed to sign in with ${providerName}`);
        } finally {
            setLoading(false);
        }
    };

    // Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) {
            setError('Authentication is not configured.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                if (fullName) {
                    await updateProfile(userCredential.user, { displayName: fullName });
                }
            }
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 lg:p-8 font-sans">
            {/* Background patterns/bubbles from reference */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-50/60 blur-[130px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[130px] rounded-full" />
            </div>

            <motion.div
                layout
                className={`w-full max-w-5xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row min-h-[600px] ${isLogin ? '' : 'lg:flex-row-reverse'
                    }`}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                {/* Cat Section */}
                <div className="w-full lg:w-1/2 bg-[#F8FAFC] flex flex-col items-center justify-center p-12 relative overflow-hidden">
                    {/* Decorative elements behind cat */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full" />
                        <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full" />
                        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-indigo-400 rounded-full" />
                        <div className="absolute top-1/2 right-10 w-1.5 h-1.5 bg-blue-300 rounded-full" />
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={mode}
                            initial={{ x: isLogin ? -100 : 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: isLogin ? 100 : -100, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            className="z-10"
                        >
                            <CopilotCat mode={loading ? 'thinking' : (error ? 'concerned' : mode)} />
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-8 text-center z-10">
                        <motion.h2
                            layout
                            className="text-2xl font-bold text-slate-800"
                        >
                            {isLogin ? 'Welcome back, Founder' : 'Launch your vision'}
                        </motion.h2>
                        <p className="text-slate-500 mt-2 max-w-[280px]">
                            {isLogin
                                ? 'Your startup copilot is ready to assist with your next big move.'
                                : 'Join the next generation of founders building the future.'}
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full">
                        <div className="mb-8">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                                {isLogin ? 'Log in' : 'Sign up'}
                            </h1>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3"
                            >
                                <AlertCircle className="text-rose-500 shrink-0" size={20} />
                                <p className="text-sm font-medium text-rose-600">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <AnimatePresence mode="popLayout">
                                {!isLogin && (
                                    <motion.div
                                        key="name-field"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-2"
                                    >
                                        <label className="text-xs font-bold text-slate-700 ml-1">Username</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                placeholder="Username"
                                                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-slate-800"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 ml-1">
                                    {isLogin ? 'Email or username' : 'Email'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={isLogin ? "Email or username" : "Email"}
                                        className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-800"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-xs font-bold text-slate-700">Password</label>
                                    {isLogin && (
                                        <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full pl-11 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-slate-800"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    >
                                        {showPassword ? <Lock size={16} /> : <Lock size={16} />}
                                        {/* Just using Lock for now, can change to Eye if preferred */}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && (
                                <p className="text-[11px] text-slate-500 leading-relaxed px-1">
                                    Make sure it's at least more than 15 characters OR at least 8 characters including a number and a lowercase letter
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-[#4F46E5] text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#4338CA] transition-all shadow-lg shadow-indigo-200 disabled:opacity-70 mt-6"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Log in' : 'Sign up'}</span>
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-xs font-bold uppercase tracking-widest text-slate-400">
                                <span className="bg-white px-4">OR</span>
                            </div>
                        </div>

                        {/* Social login — side-by-side icon buttons */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('github')}
                                aria-label="Continue with GitHub"
                                className="flex-1 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.97] group"
                            >
                                <Github size={22} className="text-slate-700 group-hover:text-slate-900 transition-colors" />
                                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800">GitHub</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                aria-label="Continue with Google"
                                className="flex-1 py-3 bg-white border border-slate-200 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-[0.97] group"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-800">Google</span>
                            </button>
                        </div>

                        <div className="mt-8 text-center">
                            <p className="text-sm font-medium text-slate-600">
                                {isLogin ? "New to Startup Copilot?" : "Already have an account?"}{' '}
                                <button
                                    onClick={() => {
                                        setMode(isLogin ? 'signup' : 'login');
                                        setError(null);
                                    }}
                                    className="text-blue-600 font-bold hover:underline"
                                >
                                    {isLogin ? 'Sign up' : 'Log in'}
                                </button>
                            </p>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-all mx-auto"
                        >
                            <ArrowLeft size={14} />
                            <span>Back to home</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
