import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Github, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Roadmap', href: '#roadmap' },
        { name: 'Demo', href: '/demo', isLink: true },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 ${isScrolled ? 'py-3' : 'py-6'
                }`}
        >
            <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-2xl px-6 py-2 border border-white/[0.05] relative overflow-hidden ${isScrolled
                ? 'bg-[#0B0F19]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-white/[0.08]'
                : 'bg-transparent'
                }`}>
                {/* Background Glow when scrolled */}
                {isScrolled && (
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none" />
                )}

                <Link to="/" className="flex items-center gap-2 group relative z-10 transition-transform active:scale-95">
                    <div className="relative">
                        <img
                            src="/logo.png"
                            alt="Startup Copilot Logo"
                            className="h-16 w-auto object-contain brightness-110 group-hover:drop-shadow-[0_0_8px_rgba(79,156,249,0.5)] transition-all"
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1 relative z-10">
                    {navLinks.map((link) => (
                        link.isLink ? (
                            <Link
                                key={link.name}
                                to={link.href}
                                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-all rounded-lg hover:bg-white/5"
                            >
                                {link.name}
                            </Link>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white transition-all rounded-lg hover:bg-white/5"
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-white transition-all hover:bg-white/5 rounded-lg"
                        aria-label="GitHub"
                    >
                        <Github size={20} />
                    </a>
                </div>

                <div className="flex items-center gap-3 relative z-10">
                    <Link
                        to="/login"
                        className="text-sm font-black text-slate-400 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-lg uppercase tracking-wider"
                    >
                        Login
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden mt-2 glass-card rounded-2xl border-white/10 overflow-hidden bg-[#0B0F19]/95 backdrop-blur-2xl"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                link.isLink ? (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-300 hover:text-accent transition-colors py-2 border-b border-white/5"
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-lg font-bold text-slate-300 hover:text-accent transition-colors py-2 border-b border-white/5"
                                    >
                                        {link.name}
                                    </a>
                                )
                            ))}
                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    to="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-bold text-slate-300 hover:text-accent transition-colors"
                                >
                                    Login
                                </Link>
                                <a
                                    href="https://github.com"
                                    className="p-2 bg-white/5 rounded-xl text-slate-300"
                                    aria-label="GitHub"
                                >
                                    <Github size={24} />
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
