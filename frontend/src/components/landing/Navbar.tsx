import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Navbar: React.FC = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 w-full z-50 px-6 py-4"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between glass-card rounded-2xl px-6 py-2 border-border-subtle">
                <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <img
                        src="/src/public/images/Catlogo.png"
                        alt="Startup Copilot Logo"
                        className="h-16 w-auto object-contain"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
                    <Link to="/demo" className="hover:text-white transition-colors">Demo</Link>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Github size={18} />
                        GitHub
                    </a>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/login" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Login</Link>
                    <Link to="/signup" className="px-5 py-2.5 bg-accent text-white rounded-xl text-sm font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-all active:scale-95">
                        Get Started
                    </Link>
                </div>
            </div>
        </motion.nav>
    );
};
