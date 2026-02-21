import React from 'react';
import { Sparkles, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="py-20 bg-background border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                                <Sparkles className="text-white" size={20} />
                            </div>
                            <span className="font-display font-black text-xl text-white">Startup Copilot</span>
                        </div>
                        <p className="text-slate-500 max-w-sm leading-relaxed">
                            AI-powered startup execution. We help you move from idea to market-ready MVP in weeks, not months.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={<Github size={20} />} />
                            <SocialLink icon={<Twitter size={20} />} />
                            <SocialLink icon={<Linkedin size={20} />} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Product</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><a href="#features" className="hover:text-accent transition-colors">Features</a></li>
                            <li><a href="#roadmap" className="hover:text-accent transition-colors">Roadmap</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Integrations</a></li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs">Company</h4>
                        <ul className="space-y-4 text-slate-500 text-sm font-medium">
                            <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">GitHub</a></li>
                            <li><a href="#" className="hover:text-accent transition-colors">Privacy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-slate-600 text-sm font-medium">
                        © 2026 Startup Copilot. Built with ❤️ for Builders.
                    </p>
                    <div className="flex gap-8 text-slate-600 text-sm font-medium">
                        <span>Hackathon Edition</span>
                        <span>Version 1.0.4</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink = ({ icon }: { icon: React.ReactNode }) => (
    <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-accent/20 hover:text-accent transition-all">
        {icon}
    </a>
);
