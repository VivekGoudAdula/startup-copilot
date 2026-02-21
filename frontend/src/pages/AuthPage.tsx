'use client'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const ShieldIcon: React.FC<{ variant?: 'sidebar' | 'card' }> = ({ variant = 'card' }) => {
    if (variant === 'sidebar') {
        return (
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center text-white mb-8 shadow-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
            </div>
        );
    }
    return (
        <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
        </div>
    );
};

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const MailIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
    </svg>
);

const LockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <circle cx="12" cy="16" r="1"></circle>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
    </svg>
);

const GitHubIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
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

interface AuthPageProps {
    mode: 'login' | 'signup';
}

// Main Component
export const AuthPage: React.FC<AuthPageProps> = ({ mode }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');

    const isLogin = mode === 'login';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Auth logic would go here
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#F0F0F0] font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Left side - Branding Sidebar */}
            <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#1e40af] via-[#312e81] to-[#4c1d95] relative overflow-hidden items-center justify-center p-16">
                <div className="absolute inset-0 bg-black/10"></div>

                {/* Decorative dots grid */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 grid grid-cols-3 gap-6 opacity-20">
                    {[...Array(9)].map((_, i) => (
                        <div key={i} className="w-2.5 h-2.5 bg-white rounded-full"></div>
                    ))}
                </div>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <ShieldIcon variant="sidebar" />
                    <h1 className="text-6xl font-black italic tracking-tight text-white mb-6 animate-in slide-in-from-bottom-4 duration-700">
                        Secure Access
                    </h1>
                    <p className="text-xl text-indigo-100/80 max-w-sm leading-relaxed font-medium">
                        Your trusted platform for secure authentication and seamless user experience.
                    </p>
                </div>
            </div>

            {/* Right side - Authentication Form Area */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                {/* Background Glows (Right Area Only) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-400/15 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

                {/* Main Card */}
                <div className="relative z-10 w-full max-w-[480px] bg-[#E9E9E9] p-10 lg:p-14 rounded-[3.5rem] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.1)]">
                    {/* Shield Icon Container (Card) */}
                    <div className="flex justify-center mb-6">
                        <ShieldIcon variant="card" />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-10 overflow-hidden px-2">
                        <h2 className="text-[2.8rem] lg:text-[3.8rem] font-black leading-[1] tracking-tighter text-[#312e81] mb-3 whitespace-nowrap drop-shadow-sm animate-in fade-in zoom-in-95 duration-500">
                            {isLogin ? 'Login' : 'Sign up'}
                        </h2>
                        <p className="text-slate-600 font-bold text-lg lg:text-xl">
                            {isLogin ? 'Access your secure account' : 'Start your founder journey today.'}
                        </p>
                    </div>

                    {/* Social Authentication */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] hover:bg-slate-50 transition-all font-black text-slate-900 shadow-sm active:scale-95">
                            <GoogleIcon />
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-[1.5rem] hover:bg-slate-50 transition-all font-black text-slate-900 shadow-sm active:scale-95">
                            <GitHubIcon />
                            <span>GitHub</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="relative mb-8 text-center flex items-center justify-center">
                        <div className="absolute left-0 right-0 top-1/2 h-px bg-slate-200"></div>
                        <div className="bg-[#E9E9E9] px-4 relative z-10 text-[10px] uppercase tracking-[0.2em] font-black text-slate-800">
                            Or continue with email
                        </div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 ml-1">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-800">
                                        <UserIcon />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="block w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all duration-200 shadow-sm"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-800">
                                    <MailIcon />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="block w-full pl-14 pr-5 py-5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all duration-200 shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 ml-1">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-800">
                                    <LockIcon />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="block w-full pl-14 pr-14 py-5 bg-white border border-slate-100 rounded-[1.5rem] text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all duration-200 shadow-sm"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-900 transition-colors"
                                >
                                    <EyeIcon />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between px-1">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded-lg cursor-pointer"
                                />
                                <label htmlFor="remember" className="ml-3 block text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] cursor-pointer">
                                    {isLogin ? 'Keep me signed in' : 'I agree to the terms'}
                                </label>
                            </div>
                            {isLogin && (
                                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-slate-900 hover:text-blue-600 transition-colors">
                                    Reset
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-6 bg-[#3b82f6] text-white rounded-[1.8rem] font-black lg:text-xl text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 hover:bg-blue-600 transition-all duration-300 transform hover:translate-y-[-2px] active:scale-[0.98] mt-4"
                        >
                            <span>{isLogin ? 'Proceed to Deck' : 'Launch Account'}</span>
                            <ChevronRight size={24} strokeWidth={3} />
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-12 text-center">
                        <p className="text-[#1a1a1a] font-black text-sm lg:text-base tracking-tight">
                            {isLogin ? 'New to the board?' : 'Already a founder?'}{' '}
                            <button
                                onClick={() => navigate(isLogin ? '/signup' : '/login')}
                                className="text-[#1a1a1a] hover:text-blue-600 transition-colors underline underline-offset-4 decoration-2 decoration-slate-300 hover:decoration-blue-600"
                            >
                                {isLogin ? 'Create an account' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
