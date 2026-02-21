import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedCat } from '../AnimatedCat';

const messages = [
    "Analyzing market potential...",
    "Studying competitors...",
    "Designing MVP strategy...",
    "Crafting perfect copy...",
    "Assembling your roadmap..."
];

interface LoadingOverlayProps {
    isVisible: boolean;
    onComplete?: () => void;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible, onComplete }) => {
    const [index, setIndex] = useState(0);
    const [catState, setCatState] = useState<'thinking' | 'generating' | 'success'>('thinking');

    useEffect(() => {
        if (!isVisible) return;

        const messageInterval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length);
        }, 1200);

        const stateTimeout1 = setTimeout(() => setCatState('generating'), 4000);
        const stateTimeout2 = setTimeout(() => setCatState('success'), 7000);
        const completeTimeout = setTimeout(() => {
            if (onComplete) onComplete();
        }, 8500);

        return () => {
            clearInterval(messageInterval);
            clearTimeout(stateTimeout1);
            clearTimeout(stateTimeout2);
            clearTimeout(completeTimeout);
        };
    }, [isVisible, onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-2xl"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 1.1, opacity: 0, y: -20 }}
                        className="w-full max-w-lg p-12 glass-card rounded-[3rem] border-white/10 text-center space-y-12 relative overflow-hidden"
                    >
                        {/* Shimmer Progress Line */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="w-full h-full bg-accent drop-shadow-[0_0_8px_#4F9CF9]"
                            />
                        </div>

                        <div className="relative h-40 flex items-center justify-center">
                            <AnimatedCat state={catState} className="scale-150" />
                        </div>

                        <div className="space-y-4">
                            <AnimatePresence mode="wait">
                                <motion.p
                                    key={messages[index]}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="text-2xl font-display font-black text-white italic tracking-tight"
                                >
                                    {messages[index]}
                                </motion.p>
                            </AnimatePresence>
                            <div className="flex justify-center gap-1">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                                        className="w-1.5 h-1.5 rounded-full bg-accent"
                                    />
                                ))}
                            </div>
                        </div>

                        <p className="text-slate-500 text-sm font-medium">This will take just a few seconds.</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
