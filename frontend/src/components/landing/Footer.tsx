'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Compass } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const footerLinks = [
    {
        title: 'Product',
        links: [
            { name: 'Features', href: '#' },
            { name: 'Roadmap', href: '#' },
            { name: 'Integrations', href: '#' },
        ],
    },
    {
        title: 'Company',
        links: [
            { name: 'About', href: '#' },
            { name: 'GitHub', href: 'https://github.com' },
            { name: 'Privacy', href: '#' },
        ],
    },
];

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0B0F19] pt-24 pb-12 px-6 border-t border-white/[0.05]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20 text-center md:text-left">
                    {/* Column 1 - Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 flex flex-col items-center md:items-start"
                    >
                        <div className="flex items-center gap-4 mb-8 group cursor-default">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#4F9CF9]/20 to-[#4F9CF9]/5 rounded-2xl flex items-center justify-center text-[#4F9CF9] shadow-[0_0_15px_rgba(79,156,249,0.15)] group-hover:shadow-[0_0_30px_rgba(79,156,249,0.4)] transition-all duration-300 border border-white/5">
                                <Compass size={32} />
                            </div>
                            <span className="text-3xl font-display font-black text-white tracking-tight italic text-glow">Startup Copilot</span>
                        </div>

                        <p className="text-gray-400 font-medium mb-10 max-w-sm leading-relaxed text-lg opacity-80">
                            AI-powered startup execution. Build your vision with intelligence and speed.
                        </p>

                        <div className="flex items-center gap-5">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <motion.a
                                        key={social.label}
                                        href={social.href}
                                        whileHover={{ scale: 1.15, y: -4 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-12 h-12 bg-[#111827] border border-white/[0.08] rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:border-[#4F9CF9]/40 hover:shadow-[0_0_20px_rgba(79,156,249,0.25)] transition-all duration-300"
                                        aria-label={social.label}
                                    >
                                        <Icon size={24} />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Column 2 & 3 - Links */}
                    {footerLinks.map((section, sectionIdx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 * (sectionIdx + 1) }}
                        >
                            <h3 className="text-white font-black uppercase tracking-widest text-xs mb-8">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors font-medium text-sm inline-block group relative"
                                        >
                                            <span>{link.name}</span>
                                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4F9CF9] transition-all group-hover:w-full"></span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-center">
                    <p className="text-gray-500 text-sm font-medium tracking-tight">
                        © {new Date().getFullYear()} Startup Copilot. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
