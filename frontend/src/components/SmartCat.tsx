import React, { useEffect, useRef } from 'react';
import { motion, useSpring } from 'motion/react';
import { CopilotCat } from './auth/CopilotCat';
import { AnimatePresence } from 'framer-motion';

interface SmartCatProps {
    mode: 'login' | 'signup' | 'thinking' | 'happy' | 'concerned';
    className?: string; // Container className (usually fixed position)
    size?: number; // Base size
    tip?: string;
    tipKey?: string | number;
}

export const SmartCat: React.FC<SmartCatProps> = ({ mode, className, size = 112, tip, tipKey }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Spring values for smooth motion
    const springX = useSpring(0, { stiffness: 150, damping: 25 });
    const springY = useSpring(0, { stiffness: 150, damping: 25 });
    const springScale = useSpring(1, { stiffness: 150, damping: 25 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;

            const buttons = document.querySelectorAll('button, [role="button"], .interactive-cat-target');
            let targetRect: DOMRect | null = null;
            let minDist = 180; // Only react when cursor is within 180px of a button

            buttons.forEach(btn => {
                const rect = btn.getBoundingClientRect();
                const bx = rect.left + rect.width / 2;
                const by = rect.top + rect.height / 2;
                const d = Math.sqrt((e.clientX - bx) ** 2 + (e.clientY - by) ** 2);

                if (d < minDist) {
                    minDist = d;
                    targetRect = rect;
                }
            });

            if (targetRect) {
                const baseRect = containerRef.current.getBoundingClientRect();
                const baseCenterX = baseRect.left + baseRect.width / 2;
                const baseCenterY = baseRect.top + baseRect.height / 2;

                // Move near button
                const targetX = (targetRect.right + 5) - baseCenterX;
                const targetY = (targetRect.top - 5) - baseCenterY;

                springX.set(targetX);
                springY.set(targetY);
                springScale.set(0.35); // Even smaller size near buttons
            } else {
                springX.set(0);
                springY.set(0);
                springScale.set(1.0); // Full size at rest
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [springX, springY, springScale]);

    return (
        <div ref={containerRef} className={className}>
            <motion.div
                className="flex flex-col items-end gap-2"
                style={{
                    x: springX,
                    y: springY,
                    scale: springScale,
                }}
            >
                {tip && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={tipKey}
                            initial={{ opacity: 0, y: 8, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="max-w-[200px] bg-white border border-slate-100 shadow-xl rounded-2xl rounded-br-none px-5 py-3 text-xs font-bold text-slate-700 normal-case not-italic leading-snug relative"
                        >
                            {tip}
                            <span className="absolute -bottom-2 right-4 w-3 h-3 bg-white border-r border-b border-slate-100 rotate-45" />
                        </motion.div>
                    </AnimatePresence>
                )}
                <div style={{ width: size, height: size }}>
                    <CopilotCat mode={mode} />
                </div>
            </motion.div>
        </div>
    );
};
